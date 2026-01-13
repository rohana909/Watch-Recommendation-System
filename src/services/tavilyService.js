const TAVILY_API_URL = "https://api.tavily.com/search";

export async function searchWatches(query, apiKey) {
  if (!apiKey) {
    return null; // Skip search if no API key
  }

  try {
    const response = await fetch(TAVILY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "advanced",
        include_answer: true,
        include_raw_content: false,
        max_results: 8,
        include_domains: [
          "hodinkee.com",
          "ablogtowatch.com",
          "watchuseek.com",
          "chrono24.com",
          "fratellowatches.com",
          "monochrome-watches.com",
          "wornandwound.com",
          "watchtime.com",
          "watchesbysjx.com",
          "thewatchbox.com",
          "timezone.com",
          "rescapement.com",
          "wornandwound.com"
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Tavily search failed:", error);
      return null;
    }

    const data = await response.json();
    return {
      answer: data.answer || "",
      results: data.results || []
    };
  } catch (error) {
    console.error("Tavily search error:", error);
    return null;
  }
}

export function buildSearchQuery(description, budget, gender) {
  const genderText = gender === "M" ? "men's" : gender === "F" ? "women's" : "";
  const budgetText = budget < 1000 ? "under $1000" :
                     budget < 5000 ? "under $5000" :
                     budget < 10000 ? "under $10000" :
                     budget < 20000 ? "under $20000" : "luxury";

  return `best ${genderText} watches ${description} ${budgetText} 2024 2025 price review`.trim();
}

export function formatSearchResults(searchData) {
  if (!searchData) return "";

  let context = "";

  if (searchData.answer) {
    context += `## Web Search Summary:\n${searchData.answer}\n\n`;
  }

  if (searchData.results && searchData.results.length > 0) {
    context += "## Recent Web Results:\n";
    searchData.results.forEach((result, i) => {
      context += `${i + 1}. **${result.title}**\n`;
      context += `   ${result.content?.slice(0, 300) || ""}...\n`;
      context += `   Source: ${result.url}\n\n`;
    });
  }

  return context;
}
