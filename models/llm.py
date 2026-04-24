from openai import OpenAI

from app.config import settings


client = OpenAI()


def generate_answer(prompt: str) -> str:
    response = client.chat.completions.create(
        model=settings.llm_model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )
    return response.choices[0].message.content or ""
