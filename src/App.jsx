import { useState } from "react";
import { getLLMRecommendations, formatPriceRange, getBudgetText } from "./utils/llmRecommendationEngine";
import "./App.css";

// Environment variables for default API keys (set by site owner)
const DEFAULT_OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";
const DEFAULT_TAVILY_KEY = import.meta.env.VITE_TAVILY_API_KEY || "";
const HAS_DEFAULT_KEYS = Boolean(DEFAULT_OPENAI_KEY);

function App() {
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(2000);
  const [gender, setGender] = useState("unisex");
  const [recommendations, setRecommendations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  // API key states
  const [useOwnKeys, setUseOwnKeys] = useState(!HAS_DEFAULT_KEYS);
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");
  const [tavilyApiKey, setTavilyApiKey] = useState(localStorage.getItem("tavily_api_key") || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showTavilyKey, setShowTavilyKey] = useState(false);

  // Get the active API keys based on mode
  const getActiveOpenAIKey = () => useOwnKeys ? apiKey : DEFAULT_OPENAI_KEY;
  const getActiveTavilyKey = () => useOwnKeys ? tavilyApiKey : DEFAULT_TAVILY_KEY;

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem("openai_api_key", key);
  };

  const handleTavilyKeyChange = (e) => {
    const key = e.target.value;
    setTavilyApiKey(key);
    localStorage.setItem("tavily_api_key", key);
  };

  const handleSearch = async () => {
    if (!description.trim()) return;

    const activeOpenAIKey = getActiveOpenAIKey();
    const activeTavilyKey = getActiveTavilyKey();

    if (!activeOpenAIKey) {
      setError(useOwnKeys
        ? "Please enter your OpenAI API key first."
        : "Default API keys are not configured. Please use your own API keys.");
      setHasSearched(true);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setError(null);
    setRecommendations([]);

    try {
      const results = await getLLMRecommendations(description, budget, gender, activeOpenAIKey, activeTavilyKey || null);
      setRecommendations(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const clearSearch = () => {
    setDescription("");
    setRecommendations([]);
    setHasSearched(false);
    setError(null);
  };

  const formatBudgetDisplay = (val) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  const getGenderClass = (val) => {
    return gender === val ? "gender-btn active" : "gender-btn";
  };

  const getCardStyle = (idx) => {
    return { animationDelay: (idx * 0.1) + "s" };
  };

  const getBrandInitial = (brand) => {
    return brand.charAt(0).toUpperCase();
  };

  return (
    <div className="app">
      <div className="background-gradient"></div>

      <header className="header">
        <div className="logo">
          <svg viewBox="0 0 24 24" className="watch-icon">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 1h6M9 23h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h1>Timepiece AI</h1>
        </div>
        <p className="tagline">Discover your perfect timepiece</p>
      </header>

      <main className="main-content">
        <section className="search-section">
          <div className="search-card">
            <div className="input-group description-group">
              <label htmlFor="description">
                <span className="label-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
                Tell us about your ideal watch
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe what you are looking for... Examples: I need a watch for swimming, elegant for business meetings, rugged for hiking, or a gift for someone special."
                rows={5}
              />
            </div>

            <div className="filters-row">
              <div className="input-group budget-group">
                <label htmlFor="budget">
                  <span className="label-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                  Budget
                </label>
                <div className="budget-input-wrapper">
                  <input
                    type="range"
                    id="budget"
                    min="100"
                    max="50000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <div className="budget-display">
                    <span className="budget-value">{formatBudgetDisplay(budget)}</span>
                    <span className="budget-label">{getBudgetText(budget)}</span>
                  </div>
                </div>
              </div>

              <div className="input-group gender-group">
                <label>
                  <span className="label-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                  Gender
                </label>
                <div className="gender-buttons">
                  <button className={getGenderClass("M")} onClick={() => setGender("M")}>Men</button>
                  <button className={getGenderClass("F")} onClick={() => setGender("F")}>Women</button>
                  <button className={getGenderClass("unisex")} onClick={() => setGender("unisex")}>Unisex</button>
                </div>
              </div>
            </div>

            {/* API Key Mode Toggle */}
            <div className="api-mode-section">
              <div className="api-mode-toggle">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={useOwnKeys}
                    onChange={(e) => setUseOwnKeys(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">
                  {useOwnKeys ? "Using my own API keys" : "Using default API keys"}
                </span>
                {!HAS_DEFAULT_KEYS && !useOwnKeys && (
                  <span className="no-default-warning">No default keys configured</span>
                )}
              </div>
              {!useOwnKeys && HAS_DEFAULT_KEYS && (
                <p className="api-mode-hint">You're using the site's default API keys. Toggle on to use your own keys for more control.</p>
              )}
            </div>

            {/* API Key Inputs - Only show when using own keys */}
            {useOwnKeys && (
              <>
                <div className="input-group api-key-group">
                  <label htmlFor="apiKey">
                    <span className="label-icon">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    OpenAI API Key
                  </label>
              <div className="api-key-input-wrapper">
                <input
                  type={showApiKey ? "text" : "password"}
                  id="apiKey"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="sk-..."
                  className="api-key-input"
                />
                <button
                  type="button"
                  className="toggle-visibility-btn"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  )}
                </button>
              </div>
              <span className="api-key-hint">Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com</a></span>
            </div>

            <div className="input-group api-key-group tavily-group">
              <label htmlFor="tavilyKey">
                <span className="label-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                Tavily API Key <span className="optional-badge">(Optional - enables web search)</span>
              </label>
              <div className="api-key-input-wrapper">
                <input
                  type={showTavilyKey ? "text" : "password"}
                  id="tavilyKey"
                  value={tavilyApiKey}
                  onChange={handleTavilyKeyChange}
                  placeholder="tvly-..."
                  className="api-key-input"
                />
                <button
                  type="button"
                  className="toggle-visibility-btn"
                  onClick={() => setShowTavilyKey(!showTavilyKey)}
                >
                  {showTavilyKey ? (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  )}
                </button>
              </div>
              <span className="api-key-hint">Free key from <a href="https://tavily.com" target="_blank" rel="noopener noreferrer">tavily.com</a> - enables real-time web search for accurate prices</span>
                </div>
              </>
            )}

            <div className="action-buttons">
              <button
                className="search-btn"
                onClick={handleSearch}
                disabled={!description.trim() || isSearching}
              >
                {isSearching ? (
                  <><span className="spinner"></span>AI is thinking...</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                    Find My Watch
                  </>
                )}
              </button>
              {hasSearched && (
                <button className="clear-btn" onClick={clearSearch}>Clear</button>
              )}
            </div>
          </div>
        </section>

        {hasSearched && (
          <section className="results-section">
            {error ? (
              <div className="error-message">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3>Error</h3>
                <p>{error}</p>
                {error.includes("API key") && (
                  <div className="error-help">
                    <p>Get your API key from:</p>
                    <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com/api-keys</a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h2 className="results-title">
                  {recommendations.length > 0 ? (
                    <><span className="ai-badge">AI</span> {recommendations.length} recommendations for you</>
                  ) : (
                    "No recommendations yet"
                  )}
                </h2>

                {recommendations.length > 0 ? (
                  <div className="results-grid">
                    {recommendations.map((watch, index) => (
                      <article key={watch.id} className="watch-card" style={getCardStyle(index)}>
                        <div className="watch-image-container">
                          <div className="brand-logo-placeholder">
                            <span className="brand-initial">{getBrandInitial(watch.brand)}</span>
                            <span className="brand-name-small">{watch.brand}</span>
                          </div>
                          <div className="watch-type-badge">{watch.type}</div>
                          <div className="ai-pick-badge">
                            <svg viewBox="0 0 24 24" width="14" height="14">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                            </svg>
                            <span>AI Pick</span>
                          </div>
                        </div>

                        <div className="watch-info">
                          <div className="watch-brand">{watch.brand}</div>
                          <h3 className="watch-collection">{watch.collection}</h3>
                          <p className="watch-description">{watch.description}</p>

                          {watch.reasoning && (
                            <div className="ai-reasoning">
                              <span className="reasoning-label">Why this watch:</span>
                              <p>{watch.reasoning}</p>
                            </div>
                          )}

                          <div className="watch-meta">
                            <div className="price-range">{formatPriceRange(watch.priceRange.min, watch.priceRange.max)}</div>
                          </div>

                          <a href={watch.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                            Search Online
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : !isSearching && (
                  <div className="no-results">
                    <svg viewBox="0 0 24 24" width="64" height="64">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
                      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p>The AI couldn't generate recommendations. Try a different description.</p>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Built with passion for watch enthusiasts</p>
      </footer>
    </div>
  );
}

export default App;
