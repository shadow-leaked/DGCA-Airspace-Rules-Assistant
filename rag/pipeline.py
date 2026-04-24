from rag.prompt import build_grounded_prompt
from rag.retriever import retrieve
from models.llm import generate_answer


def answer_query(query: str) -> dict:
    chunks = retrieve(query)
    prompt = build_grounded_prompt(query=query, chunks=chunks)
    answer = generate_answer(prompt)

    return {
        "answer": answer,
        "sources": [chunk.get("metadata", {}) for chunk in chunks],
    }
