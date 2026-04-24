from pathlib import Path

from pypdf import PdfReader


def load_pdf(path: str | Path) -> str:
    reader = PdfReader(str(path))
    pages = [page.extract_text() or "" for page in reader.pages]
    return "\n\n".join(pages)


def load_text(path: str | Path) -> str:
    return Path(path).read_text(encoding="utf-8")
