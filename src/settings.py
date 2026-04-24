from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[1]


class Settings(BaseSettings):
    ollama_base_url: str = "http://localhost:11434"
    llm_model: str = "phi3:mini"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    vector_dir: str = "db"
    top_k: int = 5
    min_query_length: int = 3
    max_query_length: int = 500
    min_retrieval_score: float = 0.25

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def vector_store_dir(self) -> Path:
        return BASE_DIR / self.vector_dir

    @property
    def faiss_index_path(self) -> Path:
        return self.vector_store_dir / "index.faiss"

    @property
    def metadata_path(self) -> Path:
        return self.vector_store_dir / "metadata.pkl"


settings = Settings()
