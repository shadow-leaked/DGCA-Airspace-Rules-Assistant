from src.settings import settings


DOMAIN_TERMS = {
    "drone", "drones", "uas", "uav", "rpa", "rpas", "airspace",
    "dgca", "digital sky", "npnt", "permission", "takeoff",
    "operator", "pilot", "remote pilot", "rpto", "registration",
    "type certificate", "certificate", "class", "category",
    "rules", "regulation", "regulations", "circular", "advisory",
    "manufacturing", "manufacturer", "import", "flying", "flight",
    "zone", "green zone", "yellow zone", "red zone", "altitude",
    "payload", "medical", "training", "license", "licence",
}

INVALID_QUERY_MESSAGE = (
    "Please ask a complete question about DGCA drone, UAS, RPAS, Digital Sky, "
    "NPNT, airspace, or related Indian drone rules."
)

OUT_OF_DOMAIN_MESSAGE = (
    "I can only answer questions about DGCA drone regulations, Indian UAS/RPAS "
    "rules, NPNT, Digital Sky workflows, airspace permissions, RPTO/training, "
    "registration, certification, and related source documents."
)

LOW_CONFIDENCE_MESSAGE = (
    "I could not find enough relevant source material in the indexed documents "
    "to answer this confidently. Try rephrasing the question with DGCA, NPNT, "
    "Digital Sky, RPTO, registration, certification, or airspace-specific terms."
)


def normalize_query(query: str) -> str:
    return " ".join(query.strip().lower().split())


def validate_query(query: str) -> tuple[bool, str]:
    normalized = normalize_query(query)

    if len(normalized) < settings.min_query_length:
        return False, INVALID_QUERY_MESSAGE

    if len(normalized) > settings.max_query_length:
        return False, "Your question is too long. Please shorten it and ask one regulatory question at a time."

    if not any(char.isalpha() for char in normalized):
        return False, INVALID_QUERY_MESSAGE

    return True, normalized


def is_domain_query(query: str) -> bool:
    normalized = normalize_query(query)
    return any(term in normalized for term in DOMAIN_TERMS)


def filter_confident_chunks(chunks: list[dict]) -> list[dict]:
    return [
        chunk
        for chunk in chunks
        if chunk.get("score", 0.0) >= settings.min_retrieval_score
    ]


def best_score(chunks: list[dict]) -> float | None:
    if not chunks:
        return None

    return max(chunk.get("score", 0.0) for chunk in chunks)
