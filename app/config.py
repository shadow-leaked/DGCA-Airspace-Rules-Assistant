from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[1]


class Settings(BaseSettings):
    app_name: str = "Drone Regulation RAG Chatbot"
    environment: str = "development"
    llm_model: str = "gpt-4o-mini"
    embedding_model: str = "text-embedding-3-small"
    top_k: int = 5
    chroma_persist_dir: str = str(BASE_DIR / "vectorstore" / "chroma_db")
    collection_name: str = "dgca_drone_rules"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
