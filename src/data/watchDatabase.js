// Comprehensive watch database with brands, collections, and metadata
export const watchDatabase = [
  // DIVE WATCHES
  {
    id: 1,
    brand: "Rolex",
    collection: "Submariner",
    type: "dive",
    gender: ["M", "unisex"],
    priceRange: { min: 8000, max: 15000 },
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    link: "https://www.rolex.com/watches/submariner",
    description: "Iconic dive watch with 300m water resistance",
    keywords: ["diving", "water", "swimming", "ocean", "sea", "sport", "adventure", "robust", "professional", "luxury", "classic", "timeless"]
  },
  {
    id: 2,
    brand: "Omega",
    collection: "Seamaster",
    type: "dive",
    gender: ["M", "unisex"],
    priceRange: { min: 5000, max: 10000 },
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400",
    link: "https://www.omegawatches.com/watches/seamaster",
    description: "Professional dive watch worn by James Bond",
    keywords: ["diving", "water", "swimming", "ocean", "elegant", "sophisticated", "professional", "adventure", "spy", "movies"]
  },
  {
    id: 3,
    brand: "Seiko",
    collection: "Prospex",
    type: "dive",
    gender: ["M", "unisex"],
    priceRange: { min: 300, max: 2000 },
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400",
    link: "https://www.seikowatches.com/global-en/products/prospex",
    description: "Reliable Japanese dive watches at great value",
    keywords: ["diving", "water", "swimming", "budget", "value", "reliable", "japanese", "sport", "adventure", "affordable"]
  },
  {
    id: 4,
    brand: "Tudor",
    collection: "Black Bay",
    type: "dive",
    gender: ["M", "unisex"],
    priceRange: { min: 3500, max: 5000 },
    image: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=400",
    link: "https://www.tudorwatch.com/watches/black-bay",
    description: "Heritage-inspired dive watch with vintage charm",
    keywords: ["diving", "water", "vintage", "heritage", "classic", "robust", "adventure", "retro", "stylish"]
  },

  // DRESS WATCHES
  {
    id: 5,
    brand: "Patek Philippe",
    collection: "Calatrava",
    type: "dress",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 20000, max: 50000 },
    image: "https://images.unsplash.com/photo-1594576722512-582bcd46fba3?w=400",
    link: "https://www.patek.com/en/collection/calatrava",
    description: "The quintessential dress watch, pure elegance",
    keywords: ["formal", "elegant", "business", "office", "meeting", "suit", "sophisticated", "luxury", "investment", "heirloom", "wedding", "special occasion"]
  },
  {
    id: 6,
    brand: "Jaeger-LeCoultre",
    collection: "Reverso",
    type: "dress",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 8000, max: 25000 },
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=400",
    link: "https://www.jaeger-lecoultre.com/reverso",
    description: "Art Deco masterpiece with reversible case",
    keywords: ["formal", "elegant", "art deco", "unique", "sophisticated", "luxury", "artistic", "business", "suit", "classic"]
  },
  {
    id: 7,
    brand: "Cartier",
    collection: "Tank",
    type: "dress",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 3000, max: 15000 },
    image: "https://images.unsplash.com/photo-1639037687665-1fe9839e9c1a?w=400",
    link: "https://www.cartier.com/en-us/watches/tank",
    description: "Timeless rectangular design, worn by icons",
    keywords: ["formal", "elegant", "classic", "iconic", "fashion", "sophisticated", "french", "slim", "dress", "celebrity"]
  },
  {
    id: 8,
    brand: "Longines",
    collection: "Dolce Vita",
    type: "dress",
    gender: ["F", "unisex"],
    priceRange: { min: 1000, max: 3000 },
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400",
    link: "https://www.longines.com/watches/dolcevita",
    description: "Elegant rectangular watch with Italian flair",
    keywords: ["formal", "elegant", "italian", "feminine", "sophisticated", "slim", "dress", "romantic", "graceful"]
  },

  // SPORT WATCHES
  {
    id: 9,
    brand: "Rolex",
    collection: "Daytona",
    type: "sport",
    gender: ["M", "unisex"],
    priceRange: { min: 15000, max: 35000 },
    image: "https://images.unsplash.com/photo-1627037558426-c2d07beda3af?w=400",
    link: "https://www.rolex.com/watches/cosmograph-daytona",
    description: "Legendary racing chronograph",
    keywords: ["racing", "speed", "sport", "chronograph", "motorsport", "active", "performance", "luxury", "iconic", "dynamic"]
  },
  {
    id: 10,
    brand: "TAG Heuer",
    collection: "Carrera",
    type: "sport",
    gender: ["M", "unisex"],
    priceRange: { min: 3000, max: 8000 },
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400",
    link: "https://www.tagheuer.com/carrera",
    description: "Motorsport-inspired chronograph",
    keywords: ["racing", "speed", "sport", "chronograph", "motorsport", "active", "dynamic", "modern", "bold"]
  },
  {
    id: 11,
    brand: "Omega",
    collection: "Speedmaster",
    type: "sport",
    gender: ["M", "unisex"],
    priceRange: { min: 5000, max: 12000 },
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400",
    link: "https://www.omegawatches.com/watches/speedmaster",
    description: "The Moonwatch - first watch worn on the moon",
    keywords: ["space", "racing", "chronograph", "historic", "iconic", "nasa", "adventure", "exploration", "sport", "legendary"]
  },
  {
    id: 12,
    brand: "Garmin",
    collection: "Fenix",
    type: "sport",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 500, max: 1500 },
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    link: "https://www.garmin.com/fenix",
    description: "Advanced GPS multisport smartwatch",
    keywords: ["fitness", "running", "hiking", "gps", "smart", "training", "outdoor", "health", "tracking", "marathon", "triathlon", "cycling"]
  },

  // PILOT/AVIATION WATCHES
  {
    id: 13,
    brand: "IWC",
    collection: "Big Pilot",
    type: "pilot",
    gender: ["M", "unisex"],
    priceRange: { min: 8000, max: 20000 },
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400",
    link: "https://www.iwc.com/pilots-watches",
    description: "Iconic oversized pilot's watch",
    keywords: ["flying", "aviation", "pilot", "travel", "adventure", "bold", "large", "military", "professional", "masculine"]
  },
  {
    id: 14,
    brand: "Breitling",
    collection: "Navitimer",
    type: "pilot",
    gender: ["M", "unisex"],
    priceRange: { min: 7000, max: 15000 },
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400",
    link: "https://www.breitling.com/navitimer",
    description: "Aviation chronograph with slide rule bezel",
    keywords: ["flying", "aviation", "pilot", "chronograph", "technical", "professional", "complex", "sophisticated", "travel"]
  },
  {
    id: 15,
    brand: "Hamilton",
    collection: "Khaki Aviation",
    type: "pilot",
    gender: ["M", "unisex"],
    priceRange: { min: 500, max: 2000 },
    image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400",
    link: "https://www.hamiltonwatch.com/khaki-aviation",
    description: "Affordable pilot watches with military heritage",
    keywords: ["flying", "aviation", "pilot", "military", "affordable", "value", "heritage", "reliable", "field"]
  },

  // LUXURY EVERYDAY
  {
    id: 16,
    brand: "Rolex",
    collection: "Datejust",
    type: "everyday",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 7000, max: 15000 },
    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400",
    link: "https://www.rolex.com/watches/datejust",
    description: "Versatile luxury watch for any occasion",
    keywords: ["versatile", "everyday", "classic", "elegant", "business", "casual", "reliable", "iconic", "timeless", "gift"]
  },
  {
    id: 17,
    brand: "Audemars Piguet",
    collection: "Royal Oak",
    type: "luxury-sport",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 20000, max: 60000 },
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    link: "https://www.audemarspiguet.com/royal-oak",
    description: "Iconic luxury sports watch with octagonal bezel",
    keywords: ["luxury", "sport", "iconic", "bold", "statement", "sophisticated", "modern", "investment", "prestige", "steel"]
  },
  {
    id: 18,
    brand: "Grand Seiko",
    collection: "Heritage",
    type: "everyday",
    gender: ["M", "unisex"],
    priceRange: { min: 3000, max: 8000 },
    image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790571?w=400",
    link: "https://www.grand-seiko.com/collections/heritage",
    description: "Japanese perfection with exceptional finishing",
    keywords: ["quality", "craftsmanship", "japanese", "precision", "elegant", "subtle", "sophisticated", "value", "understated"]
  },

  // WOMEN'S WATCHES
  {
    id: 19,
    brand: "Cartier",
    collection: "Ballon Bleu",
    type: "dress",
    gender: ["F", "unisex"],
    priceRange: { min: 4000, max: 12000 },
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400",
    link: "https://www.cartier.com/ballon-bleu",
    description: "Elegant round watch with distinctive crown",
    keywords: ["elegant", "feminine", "luxury", "romantic", "jewelry", "sophisticated", "fashion", "gift", "classic", "french"]
  },
  {
    id: 20,
    brand: "Rolex",
    collection: "Lady-Datejust",
    type: "dress",
    gender: ["F"],
    priceRange: { min: 7000, max: 15000 },
    image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=400",
    link: "https://www.rolex.com/watches/lady-datejust",
    description: "Feminine elegance meets Rolex quality",
    keywords: ["elegant", "feminine", "luxury", "classic", "sophisticated", "versatile", "timeless", "gift", "status"]
  },
  {
    id: 21,
    brand: "Omega",
    collection: "Constellation",
    type: "dress",
    gender: ["F", "unisex"],
    priceRange: { min: 3000, max: 8000 },
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400",
    link: "https://www.omegawatches.com/constellation",
    description: "Elegant watch with star emblem",
    keywords: ["elegant", "feminine", "sophisticated", "jewelry", "dress", "luxury", "romantic", "stars", "celestial"]
  },

  // FIELD/OUTDOOR WATCHES
  {
    id: 22,
    brand: "Casio",
    collection: "G-Shock",
    type: "outdoor",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 50, max: 500 },
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400",
    link: "https://www.casio.com/gshock",
    description: "Virtually indestructible sports watch",
    keywords: ["tough", "durable", "outdoor", "adventure", "budget", "affordable", "rugged", "military", "sport", "shock", "water"]
  },
  {
    id: 23,
    brand: "Luminox",
    collection: "Navy SEAL",
    type: "outdoor",
    gender: ["M", "unisex"],
    priceRange: { min: 300, max: 800 },
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400",
    link: "https://www.luminox.com/navy-seal",
    description: "Military-grade watch with self-powered illumination",
    keywords: ["military", "tactical", "night", "outdoor", "adventure", "rugged", "durable", "professional", "tough"]
  },

  // MINIMALIST/BAUHAUS
  {
    id: 24,
    brand: "Nomos",
    collection: "Tangente",
    type: "minimalist",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 1500, max: 4000 },
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400",
    link: "https://nomos-glashuette.com/tangente",
    description: "German Bauhaus design at its finest",
    keywords: ["minimalist", "clean", "simple", "bauhaus", "german", "elegant", "modern", "understated", "design", "artistic"]
  },
  {
    id: 25,
    brand: "Junghans",
    collection: "Max Bill",
    type: "minimalist",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 800, max: 2000 },
    image: "https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?w=400",
    link: "https://www.junghans.de/max-bill",
    description: "Iconic Bauhaus design by legendary architect",
    keywords: ["minimalist", "bauhaus", "clean", "simple", "german", "design", "architectural", "artistic", "elegant", "affordable"]
  },

  // SMARTWATCHES
  {
    id: 26,
    brand: "Apple",
    collection: "Apple Watch Ultra",
    type: "smart",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 700, max: 1200 },
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    link: "https://www.apple.com/apple-watch-ultra",
    description: "Premium smartwatch for athletes and adventurers",
    keywords: ["smart", "fitness", "health", "tracking", "notifications", "outdoor", "sport", "technology", "modern", "connected", "apple"]
  },
  {
    id: 27,
    brand: "Samsung",
    collection: "Galaxy Watch",
    type: "smart",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 300, max: 600 },
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    link: "https://www.samsung.com/galaxy-watch",
    description: "Feature-rich Android smartwatch",
    keywords: ["smart", "fitness", "health", "android", "notifications", "technology", "modern", "connected", "affordable"]
  },

  // VINTAGE/HERITAGE
  {
    id: 28,
    brand: "Oris",
    collection: "Big Crown",
    type: "vintage",
    gender: ["M", "unisex"],
    priceRange: { min: 1500, max: 3000 },
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400",
    link: "https://www.oris.ch/big-crown",
    description: "Vintage pilot styling with modern reliability",
    keywords: ["vintage", "heritage", "pilot", "retro", "classic", "swiss", "value", "history", "elegant"]
  },
  {
    id: 29,
    brand: "Tissot",
    collection: "PRX",
    type: "vintage",
    gender: ["M", "F", "unisex"],
    priceRange: { min: 300, max: 700 },
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=400",
    link: "https://www.tissotwatches.com/prx",
    description: "70s-inspired integrated bracelet watch",
    keywords: ["vintage", "retro", "70s", "affordable", "swiss", "value", "stylish", "trendy", "integrated"]
  },

  // TOOL WATCHES
  {
    id: 30,
    brand: "Sinn",
    collection: "556",
    type: "tool",
    gender: ["M", "unisex"],
    priceRange: { min: 1200, max: 2000 },
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400",
    link: "https://www.sinn.de/en/556",
    description: "German engineering for everyday professionals",
    keywords: ["tool", "professional", "german", "reliable", "robust", "everyday", "practical", "quality", "understated"]
  }
];

// Keywords mapping for natural language processing
export const keywordCategories = {
  dive: ["diving", "water", "swimming", "ocean", "sea", "beach", "snorkeling", "scuba", "waterproof", "swim", "pool", "underwater"],
  dress: ["formal", "elegant", "business", "office", "meeting", "suit", "wedding", "black tie", "gala", "sophisticated", "professional", "work"],
  sport: ["racing", "speed", "chronograph", "motorsport", "active", "athletic", "exercise", "performance", "dynamic", "sporty"],
  pilot: ["flying", "aviation", "pilot", "travel", "airplane", "flight", "jet", "cockpit", "air force"],
  outdoor: ["hiking", "camping", "adventure", "mountain", "trail", "wilderness", "nature", "tough", "durable", "rugged", "tactical", "military"],
  smart: ["fitness", "health", "tracking", "notifications", "apps", "connected", "technology", "digital", "workout", "steps", "heart rate"],
  minimalist: ["clean", "simple", "minimal", "understated", "sleek", "modern design", "bauhaus", "subtle", "quiet"],
  everyday: ["versatile", "daily", "casual", "all-purpose", "reliable", "any occasion", "general"],
  luxury: ["investment", "prestigious", "exclusive", "high-end", "premium", "collector", "heirloom", "statement", "wealthy", "rich"],
  vintage: ["retro", "classic", "heritage", "old school", "nostalgic", "timeless", "traditional", "history"]
};

// Gender keywords
export const genderKeywords = {
  M: ["men", "man", "male", "masculine", "him", "his", "boyfriend", "husband", "father", "dad", "brother", "son", "guy", "gentleman"],
  F: ["women", "woman", "female", "feminine", "her", "she", "girlfriend", "wife", "mother", "mom", "sister", "daughter", "lady", "girl"],
  unisex: ["unisex", "anyone", "neutral", "either", "both", "any gender", "gender neutral"]
};

// Budget keywords
export const budgetKeywords = {
  budget: ["cheap", "affordable", "budget", "inexpensive", "economical", "value", "under 500", "entry level", "starter", "first watch"],
  midRange: ["moderate", "mid-range", "reasonable", "500-2000", "good value", "quality"],
  premium: ["luxury", "expensive", "high-end", "investment", "premium", "exclusive", "prestigious", "over 5000", "no budget", "money no object"]
};
