// Vercel Serverless Function for Watch Recommendations
// Proxies requests to OpenAI and Tavily APIs to avoid CORS issues

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const TAVILY_API_URL = "https://api.tavily.com/search";

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description, budget, gender } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  // Check both VITE_ prefixed and non-prefixed env vars
  const openaiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const tavilyKey = process.env.VITE_TAVILY_API_KEY || process.env.TAVILY_API_KEY;
  const model = process.env.VITE_OPENAI_MODEL || process.env.OPENAI_MODEL || 'gpt-4o';

  console.log('API called with:', { description, budget, gender });
  console.log('OpenAI key exists:', !!openaiKey);
  console.log('Tavily key exists:', !!tavilyKey);

  if (!openaiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    // Step 1: Web search with Tavily (if key available)
    let webSearchContext = "";
    if (tavilyKey) {
      try {
        const searchQuery = buildSearchQuery(description, budget, gender);
        const tavilyResponse = await fetch(TAVILY_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: tavilyKey,
            query: searchQuery,
            search_depth: "advanced",
            include_answer: true,
            include_raw_content: false,
            max_results: 8,
            include_domains: [
              "hodinkee.com", "ablogtowatch.com", "watchuseek.com", "chrono24.com",
              "fratellowatches.com", "monochrome-watches.com", "wornandwound.com",
              "watchtime.com", "watchesbysjx.com"
            ]
          })
        });

        if (tavilyResponse.ok) {
          const searchData = await tavilyResponse.json();
          webSearchContext = formatSearchResults(searchData);
        }
      } catch (e) {
        console.error('Tavily search error:', e);
        // Continue without search results
      }
    }

    // Step 2: Generate recommendations with OpenAI
    const prompt = buildPrompt(description, budget, gender, webSearchContext);

    const openaiResponse = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are a world-class watch expert and consultant with encyclopedic knowledge of timepieces from all brands, price ranges, and styles."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json().catch(() => ({}));
      throw new Error(error.error?.message || `OpenAI error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const content = openaiData.choices[0].message.content;

    // Parse the response
    const watches = parseResponse(content, budget);

    return res.status(200).json({ watches });

  } catch (error) {
    console.error('Recommendation error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate recommendations' });
  }
}

function buildSearchQuery(description, budget, gender) {
  const genderText = gender === "M" ? "men's" : gender === "F" ? "women's" : "";
  const budgetText = budget < 1000 ? "under $1000" :
                     budget < 5000 ? "under $5000" :
                     budget < 10000 ? "under $10000" : "luxury";
  return `best ${genderText} watches ${description} ${budgetText} 2024 2025 price review`.trim();
}

function formatSearchResults(searchData) {
  if (!searchData) return "";
  let context = "";
  if (searchData.answer) {
    context += `## Web Search Summary:\n${searchData.answer}\n\n`;
  }
  if (searchData.results && searchData.results.length > 0) {
    context += "## Recent Web Results:\n";
    searchData.results.forEach((result, i) => {
      context += `${i + 1}. **${result.title}**\n`;
      context += `   ${result.content?.slice(0, 300) || ""}...\n\n`;
    });
  }
  return context;
}

function buildPrompt(description, budget, gender, webSearchContext = "") {
  const genderText = gender === "M" ? "men's watches only" : gender === "F" ? "women's watches only" : "unisex or any gender watches";
  const budgetFormatted = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0
  }).format(budget);

  const webSearchSection = webSearchContext
    ? `\n## REAL-TIME WEB SEARCH RESULTS:\n${webSearchContext}\n`
    : '';

  return `You are a world-class watch expert with knowledge of independent watchmakers, micro brands, and haute horlogerie.

## CUSTOMER'S REQUEST:
"${description}"
${webSearchSection}
## CONSTRAINTS:
1. **BUDGET: Maximum ${budgetFormatted}** - Every watch MUST be under this price
2. **GENDER: ${genderText}**
3. If customer mentions a specific watch, include it as #1 recommendation

## TASK:
Recommend 10 watches with variety:
- Positions 1-2: Watches mentioned by customer (if any)
- Positions 3-4: Well-known brand alternatives
- Positions 5-7: Independent/boutique brands (Nomos, Sinn, Baltic, Farer, Kurono)
- Positions 8-10: Hidden gems, micro brands

For each watch provide:
- brand, collection, type, priceRange (min/max in USD), description, reasoning

## OUTPUT:
Respond with ONLY a valid JSON array, no other text:
[{"brand":"...","collection":"...","type":"...","priceRange":{"min":0,"max":0},"description":"...","reasoning":"..."}]`;
}

function parseResponse(response, budget) {
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON found");

    const watches = JSON.parse(jsonMatch[0]);
    return watches
      .map((watch, index) => ({
        id: `ai-${index}-${Date.now()}`,
        brand: watch.brand || "Unknown",
        collection: watch.collection || "Unknown",
        type: watch.type || "watch",
        priceRange: {
          min: watch.priceRange?.min || 0,
          max: watch.priceRange?.max || 0
        },
        description: watch.description || "",
        reasoning: watch.reasoning || "",
        link: `https://www.google.com/search?q=${encodeURIComponent(watch.brand + " " + watch.collection + " watch")}`
      }))
      .filter(w => w.priceRange.min <= budget);
  } catch (error) {
    console.error('Parse error:', error);
    throw new Error('Failed to parse recommendations');
  }
}
