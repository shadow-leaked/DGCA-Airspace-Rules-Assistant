SYSTEM_INSTRUCTIONS = """You are a DGCA drone regulation assistant for India.
Answer only from the provided context.
If the context does not contain the answer, say that the indexed documents do not provide enough information.
Do not invent rules, penalties, dates, or procedures.
Mention relevant source metadata when useful.
"""


def build_grounded_prompt(query: str, chunks: list[dict]) -> str:
    context = "\n\n".join(
        f"Source {idx + 1}: {chunk.get('text', '')}"
        for idx, chunk in enumerate(chunks)
    )

    return f"""{SYSTEM_INSTRUCTIONS}

Context:
{context}

User question:
{query}

Grounded answer:
"""
