def chunk_text(text: str, chunk_size: int = 700, overlap: int = 100) -> list[str]:
    words = text.split()
    chunks: list[str] = []
    start = 0

    while start < len(words):
        end = start + chunk_size
        chunks.append(" ".join(words[start:end]))
        if end >= len(words):
            break
        start = max(end - overlap, start + 1)

    return chunks
