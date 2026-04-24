import uuid
from pathlib import Path

from rag.embedder import embed_text
from rag.retriever import get_collection


def index_processed_text(processed_dir: str = "data/processed") -> int:
    collection = get_collection()
    files = list(Path(processed_dir).glob("*.txt"))
    indexed = 0

    for file_path in files:
        text = file_path.read_text(encoding="utf-8")
        if not text.strip():
            continue

        collection.add(
            ids=[str(uuid.uuid4())],
            documents=[text],
            embeddings=[embed_text(text)],
            metadatas=[{"source": file_path.name}],
        )
        indexed += 1

    return indexed
