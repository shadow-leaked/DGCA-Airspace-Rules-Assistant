from openai import OpenAI

from app.config import settings


client = OpenAI()


def embed_text(text: str) -> list[float]:
    response = client.embeddings.create(
        model=settings.embedding_model,
        input=text,
    )
    return response.data[0].embedding
