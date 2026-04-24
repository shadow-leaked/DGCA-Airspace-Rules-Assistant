from fastapi import FastAPI

from app.config import settings
from app.routes import router


app = FastAPI(title=settings.app_name)
app.include_router(router)


@app.get("/")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}
