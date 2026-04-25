from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from langchain_community.chat_models import ChatOllama
from pydantic import BaseModel

from src.guardrails import (
    LOW_CONFIDENCE_MESSAGE,
    OUT_OF_DOMAIN_MESSAGE,
    best_score,
    filter_confident_chunks,
    is_domain_query,
    validate_query,
)
from src.retriever import retrieve
from src.settings import settings


app = FastAPI(title="DGCA Airspace Rules Assistant")

# CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Determine static files directory (React build or legacy)
BASE_DIR = Path(__file__).resolve().parents[1]
DIST_DIR = BASE_DIR / "web" / "dist"
LEGACY_DIR = BASE_DIR / "web"

STATIC_DIR = DIST_DIR if DIST_DIR.exists() else LEGACY_DIR

if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


class ChatRequest(BaseModel):
    query: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[dict]
    confidence: float | None = None


@app.get("/", include_in_schema=False)
def home() -> FileResponse:
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return FileResponse(str(LEGACY_DIR / "index.html"))


# Catch-all route for React Router
@app.get("/{path:path}", include_in_schema=False)
def catch_all(path: str) -> FileResponse:
    # API routes should be handled first, this is for client-side routing
    if path.startswith("chat") or path.startswith("index"):
        index_file = STATIC_DIR / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return FileResponse(str(LEGACY_DIR / "index.html"))


def build_prompt(query: str, chunks: list[dict]) -> str:
    context = "\n\n".join(
        "Source: "
        f"{chunk['metadata'].get('source', 'unknown')}, "
        f"page {chunk['metadata'].get('page', 'unknown')}\n"
        f"{chunk['text']}"
        for chunk in chunks
    )
    return (
        "SYSTEM PROMPT — DGCA DRONE ASSISTANT (STRUCTURED ANSWER MODE)\n\n"
        "ROLE:\n"
        "You are a DGCA drone regulation assistant. Your job is to transform retrieved context into a clear, structured, user-focused answer.\n\n"
        "---\n\n"
        "CORE BEHAVIOR:\n\n"
        "* Always answer question directly.\n"
        "* Never ask follow-up questions.\n"
        "* Never dump raw context.\n"
        "* Always interpret, organize, and rewrite answer.\n\n"
        "---\n\n"
        "ANSWER METHOD:\n\n"
        "Step 1: Understand user's intent\n"
        "Step 2: Extract only relevant facts from context\n"
        "Step 3: Reconstruct answer in clean structure\n\n"
        "---\n\n"
        "OUTPUT FORMAT (MANDATORY):\n\n"
        "1. **Direct Answer (1–2 lines)**\n\n"
        "   * Clear, decisive, no fluff\n\n"
        "2. **Key Rules (bullet points)**\n\n"
        "   * Convert context into actionable rules\n"
        "   * No legal copy-paste\n\n"
        "3. **Conditions / Exceptions (if any)**\n\n"
        "   * Highlight restrictions or edge cases\n\n"
        "4. **If Context is Incomplete**\n\n"
        "   * Say: \"Specific conditions (weight/location/purpose) may change this rule.\"\n\n"
        "---\n\n"
        "STYLE RULES:\n\n"
        "* Rewrite everything in your own words\n"
        "* Keep sentences short and precise\n"
        "* Remove redundancy\n"
        "* No legal jargon unless necessary\n"
        "* No paragraph dumps\n\n"
        "---\n\n"
        "STRICT CONSTRAINTS:\n\n"
        "* Do NOT copy text from documents\n"
        "* Do NOT include irrelevant sections\n"
        "* Do NOT hallucinate missing rules\n"
        "* If answer not found → \"Not found in DGCA data\"\n\n"
        "---\n\n"
        "EXAMPLE:\n\n"
        "User: \"What are rules for flying UAV in India?\"\n\n"
        "Assistant:\n\n"
        "Direct Answer:\n"
        "Drone operations in India are regulated by DGCA and require registration, permission, and compliance with airspace rules.\n\n"
        "Key Rules:\n\n"
        "* All drones must be registered on the DGCA platform\n"
        "* Flying near airports or restricted zones requires approval\n"
        "* Remote Pilot Certificate required for most categories\n\n"
        "Conditions:\n\n"
        "* Rules vary based on drone weight and usage type\n\n"
        "---\n\n"
        "GOAL:\n"
        "Turn raw RAG output into clean, structured intelligence.\n"
        "Never behave like a PDF reader.\n"
        "Always behave like a professional decision assistant.\n\n"
        f"Context:\n{context}\n\nQuestion: {query}\nAnswer:"
    )


def generate_answer(prompt: str) -> str:
    llm = ChatOllama(
        model=settings.llm_model,
        base_url=settings.ollama_base_url,
        temperature=0.1,
    )
    response = llm.invoke(prompt)
    return response.content


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    is_valid, normalized_query = validate_query(request.query)
    if not is_valid:
        return ChatResponse(answer=normalized_query, sources=[])

    if not is_domain_query(normalized_query):
        return ChatResponse(answer=OUT_OF_DOMAIN_MESSAGE, sources=[])

    retrieved_chunks = retrieve(normalized_query)
    chunks = filter_confident_chunks(retrieved_chunks)
    confidence = best_score(chunks)

    if not chunks:
        return ChatResponse(
            answer=LOW_CONFIDENCE_MESSAGE,
            sources=[],
            confidence=best_score(retrieved_chunks),
        )

    prompt = build_prompt(normalized_query, chunks)
    return ChatResponse(
        answer=generate_answer(prompt),
        sources=[chunk["metadata"] for chunk in chunks],
        confidence=confidence,
    )


@app.post("/index")
def index_documents() -> dict:
    from src.vectordb import index_raw_documents

    indexed = index_raw_documents()
    return {"indexed": indexed}
