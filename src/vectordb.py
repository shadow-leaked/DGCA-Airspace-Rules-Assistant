import pickle
from pathlib import Path

import faiss
import numpy as np

from src.embedder import embed_text
from src.loader import load_raw_pdfs
from src.settings import settings
from src.splitter import split_text


def _as_vector(text: str) -> np.ndarray:
    return np.array(embed_text(text), dtype="float32")


def index_raw_documents(raw_dir: str | Path = "data/raw") -> int:
    records: list[dict] = []
    vectors: list[np.ndarray] = []

    for document in load_raw_pdfs(raw_dir):
        chunks = split_text(document["text"])
        metadata = document.get("metadata", {})

        for index, chunk in enumerate(chunks, start=1):
            vectors.append(_as_vector(chunk))
            records.append(
                {
                    "text": chunk,
                    "metadata": {
                        **metadata,
                        "chunk": index,
                    },
                }
            )

    settings.vector_store_dir.mkdir(parents=True, exist_ok=True)

    if not vectors:
        empty_index = faiss.IndexFlatIP(384)
        faiss.write_index(empty_index, str(settings.faiss_index_path))
        with settings.metadata_path.open("wb") as file:
            pickle.dump(records, file)
        return 0

    matrix = np.vstack(vectors).astype("float32")
    index = faiss.IndexFlatIP(matrix.shape[1])
    index.add(matrix)

    faiss.write_index(index, str(settings.faiss_index_path))
    with settings.metadata_path.open("wb") as file:
        pickle.dump(records, file)

    return len(records)


def load_faiss_index():
    if not settings.faiss_index_path.exists() or not settings.metadata_path.exists():
        raise FileNotFoundError(
            "FAISS index not found. Run: python -c "
            "\"from src.vectordb import index_raw_documents; "
            "print(index_raw_documents())\""
        )

    index = faiss.read_index(str(settings.faiss_index_path))
    with settings.metadata_path.open("rb") as file:
        records = pickle.load(file)

    return index, records
