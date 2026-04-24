import chromadb

from app.config import settings
from rag.embedder import embed_text


def get_collection():
    client = chromadb.PersistentClient(path=settings.chroma_persist_dir)
    return client.get_or_create_collection(name=settings.collection_name)


def retrieve(query: str, top_k: int | None = None) -> list[dict]:
    collection = get_collection()
    query_embedding = embed_text(query)
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k or settings.top_k,
        include=["documents", "metadatas", "distances"],
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    return [
        {
            "text": document,
            "metadata": metadata or {},
            "distance": distance,
        }
        for document, metadata, distance in zip(documents, metadatas, distances)
    ]
