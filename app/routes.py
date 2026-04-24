from fastapi import APIRouter
from pydantic import BaseModel

from rag.pipeline import answer_query


router = APIRouter(prefix="/api")


class ChatRequest(BaseModel):
    query: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[dict]


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    result = answer_query(request.query)
    return ChatResponse(**result)
