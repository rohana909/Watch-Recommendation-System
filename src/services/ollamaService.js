const OLLAMA_BASE_URL = "http://localhost:11434";

export async function generateCompletion(prompt, model = "llama3.2") {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Model "${model}" not found. Run: ollama pull ${model}`);
    }
    throw new Error(`Ollama request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

export async function checkOllamaConnection() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: "GET",
    });
    if (!response.ok) {
      return { connected: false, error: "Ollama not responding" };
    }
    const data = await response.json();
    return {
      connected: true,
      models: data.models?.map(m => m.name) || []
    };
  } catch (error) {
    return {
      connected: false,
      error: "Cannot connect to Ollama. Make sure it's running on localhost:11434"
    };
  }
}
