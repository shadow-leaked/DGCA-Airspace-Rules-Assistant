from rag.prompt import build_grounded_prompt


def test_prompt_contains_query_and_context():
    prompt = build_grounded_prompt(
        query="What is NPNT?",
        chunks=[{"text": "NPNT means No Permission No Takeoff.", "metadata": {}}],
    )

    assert "What is NPNT?" in prompt
    assert "No Permission No Takeoff" in prompt
