import { watchDatabase, keywordCategories, genderKeywords, budgetKeywords } from '../data/watchDatabase';

// Calculate similarity score between user input and watch
function calculateMatchScore(watch, userInput, budget, gender) {
  let score = 0;
  const inputLower = userInput.toLowerCase();
  const words = inputLower.split(/\s+/);

  // Direct keyword matching from watch keywords
  watch.keywords.forEach(keyword => {
    if (inputLower.includes(keyword)) {
      score += 15;
    }
    // Partial word matching
    words.forEach(word => {
      if (word.length > 3 && keyword.includes(word)) {
        score += 5;
      }
    });
  });

  // Brand name matching
  if (inputLower.includes(watch.brand.toLowerCase())) {
    score += 30;
  }

  // Collection name matching
  if (inputLower.includes(watch.collection.toLowerCase())) {
    score += 25;
  }

  // Type matching through category keywords
  Object.entries(keywordCategories).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (inputLower.includes(keyword)) {
        if (watch.type === category || watch.type.includes(category)) {
          score += 20;
        }
      }
    });
  });

  // Gender matching
  if (gender && gender !== 'all') {
    if (watch.gender.includes(gender)) {
      score += 15;
    } else {
      score -= 30; // Penalize non-matching gender
    }
  }

  // Budget matching
  if (budget) {
    const budgetNum = parseInt(budget);
    if (budgetNum >= watch.priceRange.min && budgetNum >= watch.priceRange.max * 0.5) {
      score += 20; // Within budget
    } else if (budgetNum >= watch.priceRange.min) {
      score += 10; // Can afford entry level
    } else if (budgetNum < watch.priceRange.min * 0.5) {
      score -= 20; // Way out of budget
    }
  }

  // Context-based matching
  const contextMatches = [
    { patterns: ["first date", "impress", "special occasion", "anniversary"], boost: ["dress", "luxury-sport"] },
    { patterns: ["gym", "workout", "running", "exercise", "marathon", "triathlon"], boost: ["sport", "smart", "outdoor"] },
    { patterns: ["office", "work", "professional", "meetings", "corporate"], boost: ["dress", "everyday", "minimalist"] },
    { patterns: ["vacation", "travel", "trip", "holiday"], boost: ["everyday", "dive", "pilot"] },
    { patterns: ["gift", "present", "birthday", "christmas"], boost: ["dress", "everyday", "luxury-sport"] },
    { patterns: ["graduation", "achievement", "milestone", "promotion"], boost: ["dress", "luxury-sport", "everyday"] },
    { patterns: ["everyday", "daily", "all the time", "always wear"], boost: ["everyday", "tool", "sport"] },
    { patterns: ["collect", "collection", "watch enthusiast", "horology"], boost: ["dress", "luxury-sport", "vintage"] },
    { patterns: ["rugged", "outdoors", "camping", "hiking", "adventure"], boost: ["outdoor", "dive", "pilot"] },
    { patterns: ["classy", "sophisticated", "elegant", "refined"], boost: ["dress", "minimalist"] },
    { patterns: ["bold", "statement", "standout", "unique", "attention"], boost: ["luxury-sport", "pilot", "sport"] },
    { patterns: ["subtle", "understated", "quiet", "modest"], boost: ["minimalist", "dress", "everyday"] },
    { patterns: ["retro", "vintage", "classic", "old school", "heritage"], boost: ["vintage", "dress"] },
    { patterns: ["modern", "contemporary", "trendy", "fashion"], boost: ["smart", "minimalist", "luxury-sport"] },
  ];

  contextMatches.forEach(({ patterns, boost }) => {
    patterns.forEach(pattern => {
      if (inputLower.includes(pattern)) {
        if (boost.includes(watch.type)) {
          score += 15;
        }
      }
    });
  });

  return score;
}

// Main recommendation function
export function getRecommendations(userInput, budget, gender, limit = 8) {
  if (!userInput || userInput.trim().length === 0) {
    return [];
  }

  // Calculate scores for all watches
  const scoredWatches = watchDatabase.map(watch => ({
    ...watch,
    score: calculateMatchScore(watch, userInput, budget, gender)
  }));

  // Sort by score and filter out low scores
  const sortedWatches = scoredWatches
    .filter(watch => watch.score > 0)
    .sort((a, b) => b.score - a.score);

  // If we have very few results, return top matches regardless
  if (sortedWatches.length < 3) {
    return scoredWatches
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  return sortedWatches.slice(0, limit);
}

// Helper function to get budget range text
export function getBudgetText(budget) {
  const budgetNum = parseInt(budget);
  if (budgetNum < 500) return "Entry-level";
  if (budgetNum < 1000) return "Affordable";
  if (budgetNum < 3000) return "Mid-range";
  if (budgetNum < 10000) return "Premium";
  if (budgetNum < 25000) return "Luxury";
  return "Ultra-luxury";
}

// Helper function to format price range
export function formatPriceRange(min, max) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}
