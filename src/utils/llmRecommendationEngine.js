import { generateCompletion } from "../services/openaiService";
import { searchWatches, buildSearchQuery, formatSearchResults } from "../services/tavilyService";

function extractMentionedWatches(description) {
  // Comprehensive watch brands including independents, micro brands, and boutique makers
  const brands = [
    // Major luxury brands
    "rolex", "omega", "tudor", "patek philippe", "audemars piguet", "vacheron constantin",
    "cartier", "jaeger-lecoultre", "iwc", "panerai", "breitling", "tag heuer",

    // Swatch Group luxury
    "breguet", "blancpain", "glashütte original", "glashutte", "harry winston", "omega",
    "longines", "tissot", "hamilton", "mido", "certina", "rado",

    // Richemont brands
    "a. lange", "lange & söhne", "piaget", "baume & mercier", "roger dubuis", "parmigiani",

    // LVMH brands
    "zenith", "hublot", "bulgari", "chaumet",

    // Independent haute horlogerie
    "f.p. journe", "fp journe", "mb&f", "h. moser", "moser & cie", "de bethune",
    "laurent ferrier", "urwerk", "richard mille", "greubel forsey", "romain gauthier",
    "voutilainen", "akrivia", "grönefeld", "gronefeld", "moritz grossmann",
    "andreas strehler", "ferdinand berthoud", "christophe claret", "kari voutilainen",
    "philippe dufour", "roger smith", "marcus bohnenberger", "hajime asaoka",
    "masahiro kikuno", "independent watchmakers",

    // German independents & brands
    "nomos", "sinn", "junghans", "stowa", "laco", "damasko", "archimede", "dornblüth",
    "dornbluth", "lehmann", "mühle glashütte", "muhle glashutte", "tutima", "junkers",
    "zeppelin", "meistersinger", "hanhart",

    // Japanese brands
    "seiko", "grand seiko", "citizen", "orient", "orient star", "minase", "hajime asaoka",
    "credor", "kurono", "kurono tokyo", "knot", "sealane", "kentex",

    // Swiss micro brands & independents
    "oris", "frederique constant", "maurice lacroix", "raymond weil", "bell & ross",
    "ulysse nardin", "girard perregaux", "corum", "perrelet", "arnold & son",
    "speake-marin", "singer reimagined", "czapek", "schwarz etienne", "armin strom",
    "favre-leuba", "doxa", "zodiac", "rado", "eterna", "fortis", "glycine",
    "alpina", "zeno", "revue thommen", "claude bernard", "louis erard", "anonimo",

    // Micro brands & WatchTime/Windup favorites
    "anordain", "farer", "baltic", "yema", "monta", "halios", "christopher ward",
    "traska", "lorier", "brew", "autodromo", "vero", "nodus", "oak & oscar",
    "rze", "boldr", "undone", "Dan henry", "dan henry", "san martin", "sugess", "cadisen",
    "merkur", "seagull", "beijing", "agelocer", "lobinni", "parnis", "corgeut",
    "steeldive", "heimdallr", "proxima", "addiesdive", "escapement time",
    "tandorio", "cronos", "watchdives", "san martin", "phylida", "pagani design",
    "didun", "guanqin", "carnival", "starking", "benyar", "megir", "naviforce",
    "reef tiger", "oblvlo", "agelocer", "aesop", "orkina", "forsining",
    "tsar bomba", "ciga design", "wishdoit", "ochstin", "ruimas",

    // American brands
    "shinola", "weiss", "rgh", "kobold", "vortic", "detroit watch co", "martenero",
    "worn & wound", "visitor", "lum-tec", "deep blue", "nite", "luminox",
    "marathon", "mkii", "benrus", "waltham", "hamilton",

    // British brands
    "bremont", "pinion", "schofield", "vertex", "fears", "marloe", "geckota",
    "elliot brown", "smiths", "newmark", "meridian",

    // Affordable favorites
    "casio", "g-shock", "orient", "timex", "fossil", "bulova", "invicta", "stuhrling",
    "seiko 5", "vostok", "raketa", "poljot", "slava",

    // Smartwatches
    "garmin", "apple watch", "samsung", "withings", "suunto", "coros", "polar"
  ];

  const lowerDesc = description.toLowerCase();
  const mentioned = [];

  for (const brand of brands) {
    if (lowerDesc.includes(brand)) {
      mentioned.push(brand);
    }
  }

  return mentioned;
}

function buildPrompt(description, budget, gender, webSearchContext = "") {
  const genderText = gender === "M" ? "men's watches only" : gender === "F" ? "women's watches only" : "unisex or any gender watches";
  const budgetFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(budget);

  const mentionedBrands = extractMentionedWatches(description);
  const mentionedSection = mentionedBrands.length > 0
    ? `\n## WATCHES/BRANDS EXPLICITLY MENTIONED BY CUSTOMER:\n${mentionedBrands.map(b => `- ${b.toUpperCase()}`).join('\n')}\n\n**CRITICAL**: The customer has specifically mentioned these watches/brands. You MUST include the EXACT models they mentioned as your TOP recommendations (if within budget). This is their primary interest - do not ignore it!\n`
    : '';

  const webSearchSection = webSearchContext
    ? `\n## REAL-TIME WEB SEARCH RESULTS (Use this for accurate, current information):\n${webSearchContext}\n\nUse the above web search results to inform your recommendations with accurate current pricing and availability.\n`
    : '';

  return `You are a world-class watch expert and consultant with comprehensive, up-to-date knowledge of the ENTIRE watch market - from major luxury houses to independent watchmakers and micro brands. You stay current with watch events like WatchTime New York, Windup Watch Fair, and follow the independent watchmaking scene closely.

## CUSTOMER'S REQUEST (READ CAREFULLY):
"${description}"
${mentionedSection}${webSearchSection}
## YOUR EXPERTISE INCLUDES:
- **Independent Haute Horlogerie**: F.P. Journe, MB&F, H. Moser & Cie, De Bethune, Laurent Ferrier, Urwerk, Greubel Forsey, Voutilainen, Akrivia, Grönefeld, Moritz Grossmann, Romain Gauthier, Christophe Claret
- **Heritage Luxury**: Breguet, Blancpain, Vacheron Constantin, A. Lange & Söhne, Jaeger-LeCoultre, Girard-Perregaux, Ulysse Nardin
- **German Excellence**: Nomos, Sinn, Stowa, Damasko, Laco, Mühle Glashütte, Junghans, Meistersinger, Tutima
- **Japanese Mastery**: Grand Seiko, Minase, Kurono Tokyo, Credor, Hajime Asaoka
- **Micro Brands & WatchTime/Windup Favorites**: Anordain, Farer, Baltic, Halios, Lorier, Monta, Christopher Ward, Oak & Oscar, Traska, Autodromo, Brew, Dan Henry, Yema, Doxa, Fortis
- **Value Champions**: Tissot PRX, Hamilton, Orient Star, Seiko Presage, Certina, Glycine

## HARD CONSTRAINTS (MUST ALL BE MET):

### 1. BUDGET: Maximum ${budgetFormatted}
- EVERY watch MUST have a retail/market price UNDER ${budgetFormatted}
- Use accurate 2024-2025 market prices
- If unsure, estimate conservatively
- NEVER recommend a watch over budget

### 2. GENDER: ${genderText}
- Strictly follow this preference
- Men's: typically 38mm+ case sizes
- Women's: typically under 38mm or specifically women's models
- Unisex: any appropriate watch

### 3. RELEVANCE TO REQUEST
- MOST IMPORTANT: If the customer mentions a SPECIFIC watch model (e.g., "Rolex Explorer", "Omega Speedmaster", "Seiko Prospex"), that EXACT watch MUST be your #1 recommendation (if within budget)
- If they say "like the X" or "similar to X", include X first, then alternatives
- Match the USE CASE they describe (diving, hiking, business, etc.)
- Match the STYLE they want (sporty, elegant, rugged, minimalist, etc.)
- Match any specific FEATURES mentioned (chronograph, GMT, date, etc.)

## YOUR TASK:

Provide exactly 10 watch recommendations with VARIETY:
- Position 1-2: The EXACT watches mentioned by the customer (if any, and if within budget)
- Position 3-4: Similar alternatives from well-known brands
- Position 5-7: Independent watchmakers or boutique brands (e.g., Nomos, Sinn, Anordain, Baltic, Farer, Kurono)
- Position 8-10: Hidden gems - micro brands, lesser-known independents, or WatchTime/Windup discoveries

IMPORTANT: Do NOT just recommend mainstream brands. Include at least 3-4 independent watchmakers, micro brands, or boutique options. Watch enthusiasts appreciate discovering unique timepieces!

For each watch, provide:
- brand: Exact brand name
- collection: Exact model/collection name (be specific - e.g., "Explorer I 124270" not just "Explorer")
- type: Category (dive, dress, sport, pilot, chronograph, field, tool, everyday, luxury-sport, minimalist, GMT, diver, vintage-style)
- priceRange: {"min": X, "max": Y} - accurate USD retail/market price, MUST be under ${budgetFormatted}
- description: 2-3 sentences about key features, specifications, and what makes it special
- reasoning: Explain specifically why this matches what the customer asked for

## RESPONSE FORMAT:
Respond with ONLY a valid JSON array. No markdown, no explanation, no text before or after.

[
  {
    "brand": "Brand Name",
    "collection": "Specific Model Name",
    "type": "watch type",
    "priceRange": {"min": 1000, "max": 1500},
    "description": "Description with specs...",
    "reasoning": "Why this matches their specific request..."
  }
]`;
}

function parseResponse(response) {
  try {
    // Try to find JSON array in the response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON array found in response");
    }

    const watches = JSON.parse(jsonMatch[0]);

    // Validate and normalize the data
    return watches.map((watch, index) => ({
      id: `ai-${index}-${Date.now()}`,
      brand: watch.brand || "Unknown Brand",
      collection: watch.collection || watch.model || "Unknown Model",
      type: watch.type || "watch",
      priceRange: {
        min: watch.priceRange?.min || 0,
        max: watch.priceRange?.max || watch.priceRange?.min || 0,
      },
      description: watch.description || "",
      reasoning: watch.reasoning || watch.reason || "",
      gender: ["unisex"],
      link: `https://www.google.com/search?q=${encodeURIComponent(watch.brand + " " + watch.collection + " watch buy")}`,
    }));
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    console.error("Raw response:", response);
    throw new Error("Failed to parse watch recommendations. Please try again.");
  }
}

export async function getLLMRecommendations(description, budget, gender, openaiApiKey, tavilyApiKey = null) {
  if (!openaiApiKey) {
    throw new Error("Please enter your OpenAI API key to get recommendations.");
  }

  // Perform web search if Tavily API key is provided
  let webSearchContext = "";
  if (tavilyApiKey) {
    const searchQuery = buildSearchQuery(description, budget, gender);
    const searchResults = await searchWatches(searchQuery, tavilyApiKey);
    if (searchResults) {
      webSearchContext = formatSearchResults(searchResults);
    }
  }

  const prompt = buildPrompt(description, budget, gender, webSearchContext);

  try {
    const response = await generateCompletion(prompt, openaiApiKey);
    const watches = parseResponse(response);

    // Filter out any watches that somehow exceed budget (extra safety)
    const filteredWatches = watches.filter(w => w.priceRange.min <= budget);

    return filteredWatches;
  } catch (error) {
    if (error.message.includes("Failed to parse")) {
      throw error;
    }
    throw new Error(`AI recommendation failed: ${error.message}`);
  }
}

export function formatPriceRange(min, max) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  if (min === max || !max) {
    return `~${formatter.format(min)}`;
  }
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

export function getBudgetText(budget) {
  if (budget < 500) return "Entry-level";
  if (budget < 1000) return "Affordable";
  if (budget < 3000) return "Mid-range";
  if (budget < 10000) return "Premium";
  if (budget < 25000) return "Luxury";
  return "Ultra-luxury";
}
