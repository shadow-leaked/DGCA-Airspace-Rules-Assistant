import numpy as np

from src.embedder import embed_text
from src.settings import settings
from src.vectordb import load_faiss_index


def retrieve(query: str, top_k: int | None = None) -> list[dict]:
    index, records = load_faiss_index()
    if not records:
        return []

    query_vector = np.array([embed_text(query)], dtype="float32")
    limit = min(top_k or settings.top_k, len(records))
    scores, indices = index.search(query_vector, limit)

    results: list[dict] = []
    for score, record_index in zip(scores[0], indices[0]):
        if record_index < 0:
            continue

        record = records[int(record_index)]
        results.append(
            {
                "text": record["text"],
                "metadata": record["metadata"],
                "score": float(score),
                "distance": float(1 - score),
            }
        )

    return results
