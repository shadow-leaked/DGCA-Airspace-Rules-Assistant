from pathlib import Path
from pypdf import PdfReader


def load_pdf(path: str | Path) -> list[dict]:
    reader = PdfReader(str(path))
    docs = []

    for i, page in enumerate(reader.pages):
        text = page.extract_text()

        if not text or len(text.strip()) < 50:
            continue  # skip garbage pages

        docs.append({
            "text": text,
            "metadata": {
                "source": Path(path).name,
                "page": i + 1,
                "path": str(path),
            }
        })

    return docs


def load_raw_pdfs(raw_dir: str | Path = "data/raw") -> list[dict]:
    documents = []

    for pdf_path in sorted(Path(raw_dir).glob("*.pdf")):
        documents.extend(load_pdf(pdf_path))

    return documents