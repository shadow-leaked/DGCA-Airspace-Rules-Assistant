const form = document.querySelector("#chat-form");
const queryInput = document.querySelector("#query");
const messages = document.querySelector("#messages");
const statusLabel = document.querySelector("#status");

function setStatus(text) {
  statusLabel.textContent = text;
}

function addMessage(role, text, options = {}) {
  const article = document.createElement("article");
  article.className = `message ${role}${options.error ? " error" : ""}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  if (role === "assistant" && options.confidence !== null && options.confidence !== undefined) {
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `Confidence: ${Number(options.confidence).toFixed(3)}`;
    bubble.appendChild(meta);
  }

  if (role === "assistant" && options.sources?.length) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Sources";
    const list = document.createElement("ul");
    list.className = "sources";

    options.sources.forEach((source) => {
      const item = document.createElement("li");
      const page = source.page ? `, page ${source.page}` : "";
      const chunk = source.chunk ? `, chunk ${source.chunk}` : "";
      item.textContent = `${source.source || "Unknown source"}${page}${chunk}`;
      list.appendChild(item);
    });

    details.appendChild(summary);
    details.appendChild(list);
    bubble.appendChild(details);
  }

  article.appendChild(bubble);
  messages.appendChild(article);
  messages.scrollTop = messages.scrollHeight;
}

async function askQuestion(query) {
  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (!query) return;

  addMessage("user", query);
  queryInput.value = "";
  queryInput.focus();
  form.querySelector("button").disabled = true;
  setStatus("Thinking");

  try {
    const result = await askQuestion(query);
    addMessage("assistant", result.answer, {
      confidence: result.confidence,
      sources: result.sources,
    });
    setStatus("Ready");
  } catch (error) {
    addMessage("assistant", "The assistant could not complete the request. Check that the API, FAISS index, and Ollama are running.", {
      error: true,
    });
    setStatus("Error");
  } finally {
    form.querySelector("button").disabled = false;
  }
});

queryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
