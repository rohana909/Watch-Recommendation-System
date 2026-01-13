const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Default model - gpt-4o is recommended for best balance of speed, quality, and cost
// Alternatives: gpt-4o-mini (cheaper, faster), gpt-4-turbo (more expensive)
const DEFAULT_MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o";

export async function generateCompletion(prompt, apiKey, model = DEFAULT_MODEL) {
  if (!apiKey) {
    throw new Error("OpenAI API key is required. Please enter your API key.");
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "You are a world-class watch expert and consultant with encyclopedic knowledge of timepieces from all brands, price ranges, and styles. You provide accurate, helpful recommendations based on user preferences."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 401) {
      throw new Error("Invalid API key. Please check your OpenAI API key.");
    }
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please wait a moment and try again.");
    }
    throw new Error(error.error?.message || `OpenAI request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function searchAndRecommend(searchQuery, apiKey) {
  // Use GPT-4's knowledge combined with structured prompting
  // For real web search, you'd integrate with SerpAPI or similar
  return generateCompletion(searchQuery, apiKey);
}
