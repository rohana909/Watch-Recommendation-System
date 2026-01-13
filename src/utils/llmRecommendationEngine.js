// LLM Recommendation Engine - Uses serverless API route

export async function getLLMRecommendations(description, budget, gender) {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description, budget: Number(budget), gender }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to get recommendations');
  }

  const data = await response.json();
  return data.watches;
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
