# DGCA Airspace Rules Assistant

> Enterprise-grade RAG architecture for grounded answers on Indian drone regulations, DGCA rules, NPNT workflows, and Digital Sky documentation.

<p align="center">
  <strong>Regulatory Intelligence</strong> |
  <strong>Grounded Retrieval</strong> |
  <strong>Source-Aware Answers</strong> |
  <strong>Scalable AI Architecture</strong>
</p>

---

## Project Stewardship

**Lead Developer and Maintainer:** **Aribam Aditya Sharma**

This repository is maintained with a professional research-and-engineering standard: clear system boundaries, auditable retrieval flow, grounded generation, modular ingestion, and a roadmap designed for production-grade regulatory intelligence systems.

---

## System Vision

The assistant is designed to answer drone-regulation questions using indexed official documents instead of model memory. It follows a retrieval-first architecture so responses can stay tied to DGCA, NPNT, and Digital Sky source material.

```text
                         +----------------------+
                         |      User Query      |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         |   Query Embedding    |
                         +----------+-----------+
                                    |
                                    v
        +----------------+----------------------+----------------+
        |                                                       |
        v                                                       v
+-------------------+                              +----------------------+
| Vector Database   |                              | Future Hybrid Search |
| Chroma / FAISS    |                              | Keyword + Semantic   |
+---------+---------+                              +----------+-----------+
          |                                                   |
          +------------------------+--------------------------+
                                   |
                                   v
                         +----------------------+
                         |  Top-K Context Chunks|
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Grounded LLM Answer  |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Answer + Source Data |
                         +----------------------+
```

---

## Architecture Matrix

| Layer | Responsibility | Implementation |
| --- | --- | --- |
| Interface | API entry point and request handling | `app/main.py`, `app/routes.py` |
| Configuration | Environment, model, and vector DB settings | `app/config.py`, `.env` |
| Embeddings | Convert user queries and chunks into vectors | `rag/embedder.py` |
| Retrieval | Search regulation chunks by semantic similarity | `rag/retriever.py` |
| Prompting | Enforce grounded, context-only responses | `rag/prompt.py` |
| Generation | Produce final answer from retrieved context | `models/llm.py` |
| Pipeline | Connect query, retrieval, prompt, and answer | `rag/pipeline.py` |
| Ingestion | Load PDFs/text, chunk documents, index vectors | `ingestion/` |
| Storage | Persist source text, metadata, and vector DB | `data/`, `vectorstore/` |
| Evaluation | Validate prompt and RAG behavior | `tests/` |

---

## Capability Dashboard

| Capability | Current State | Production Direction |
| --- | --- | --- |
| Context-based answering | Scaffolded | Add source-level citations |
| Hallucination reduction | Prompt guardrails | Add answer validation checks |
| Vector retrieval | Chroma-ready | Add FAISS option if needed |
| Metadata tracking | Initial schema | Add document versioning |
| PDF ingestion | Loader scaffold | Add batch ingestion CLI |
| Chunking | Token-style word chunks | Add semantic chunking |
| Re-ranking | Placeholder | Add cross-encoder or LLM reranker |
| Hybrid search | Planned | Combine BM25 + vector retrieval |
| Agentic retrieval | Optional | Add multi-step source discovery |

---

## Repository Structure

```text
.
+-- app/
|   +-- main.py
|   +-- config.py
|   +-- routes.py
|
+-- rag/
|   +-- pipeline.py
|   +-- retriever.py
|   +-- embedder.py
|   +-- prompt.py
|   +-- reranker.py
|
+-- ingestion/
|   +-- loader.py
|   +-- chunker.py
|   +-- indexer.py
|
+-- data/
|   +-- raw/
|   +-- processed/
|   +-- metadata.json
|
+-- vectorstore/
|   +-- chroma_db/
|
+-- models/
|   +-- llm.py
|
+-- utils/
|   +-- logger.py
|   +-- helpers.py
|
+-- tests/
|   +-- test_rag.py
|
+-- requirements.txt
+-- .env
+-- README.md
```

---

## Governance Principles

| Principle | Enforcement |
| --- | --- |
| Grounded answers only | The prompt instructs the model to answer from retrieved context |
| No invented legal claims | The assistant must say when indexed documents are insufficient |
| Source awareness | Retrieved chunks return metadata for citation workflows |
| Modular growth | Retrieval, embedding, prompting, and generation are separated |
| Document freshness | Future metadata can track version, source URL, and ingestion date |

---

## Run Locally

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure `.env`:

```bash
OPENAI_API_KEY=your_key_here
LLM_MODEL=gpt-4o-mini
EMBEDDING_MODEL=text-embedding-3-small
TOP_K=5
```

Start the API:

```bash
uvicorn app.main:app --reload
```

Send a chat request:

```text
POST /api/chat
{
  "query": "What is NPNT?"
}
```

---

## Data Pipeline

```text
Official Documents
        |
        v
data/raw/
        |
        v
Text Extraction
        |
        v
Chunking + Metadata
        |
        v
data/processed/
        |
        v
Embeddings
        |
        v
Chroma Vector Store
        |
        v
Grounded Query Responses
```

---

## Roadmap

| Phase | Focus | Outcome |
| --- | --- | --- |
| Phase 1 | Prototype RAG | Working API, retrieval, and answer generation |
| Phase 2 | Citation Quality | Source references, metadata display, freshness indicators |
| Phase 3 | Retrieval Quality | Hybrid search, re-ranking, query expansion |
| Phase 4 | Evaluation | Regression tests, answer quality checks, benchmark queries |
| Phase 5 | Product Layer | Web UI, admin uploads, chat history, observability |

---

## Mission Statement

To provide a reliable, source-grounded AI assistant for Indian drone regulation research, built with the discipline expected from serious regulatory technology systems.
