import { useState } from "react";
import { getLLMRecommendations, formatPriceRange, getBudgetText } from "./utils/llmRecommendationEngine";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(2000);
  const [gender, setGender] = useState("unisex");
  const [recommendations, setRecommendations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!description.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setError(null);
    setRecommendations([]);

    try {
      const results = await getLLMRecommendations(description, budget, gender);
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
                placeholder="Describe what you are looking for... Examples: I need a dive watch like the Rolex Submariner, an elegant dress watch for business meetings, a rugged field watch for hiking, or a gift for a watch enthusiast."
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
        <p>Powered by AI with real-time web search</p>
      </footer>
    </div>
  );
}

export default App;
