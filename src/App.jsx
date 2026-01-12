import { useState } from "react";
import { getRecommendations, formatPriceRange, getBudgetText } from "./utils/recommendationEngine";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(2000);
  const [gender, setGender] = useState("unisex");
  const [recommendations, setRecommendations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!description.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    setTimeout(() => {
      const results = getRecommendations(description, budget, gender);
      setRecommendations(results);
      setIsSearching(false);
    }, 500);
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

  const getMatchPercent = (score) => {
    return Math.min(Math.round(score / 10) * 10, 100) + "%";
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
          <h1>WatchFinder</h1>
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

            <div className="action-buttons">
              <button
                className="search-btn"
                onClick={handleSearch}
                disabled={!description.trim() || isSearching}
              >
                {isSearching ? (
                  <><span className="spinner"></span>Finding watches...</>
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
            <h2 className="results-title">
              {recommendations.length > 0 ? "Found " + recommendations.length + " matching watches" : "No matches found"}
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
                      <div className="match-score">
                        <span className="score-value">{getMatchPercent(watch.score)}</span>
                        <span className="score-label">match</span>
                      </div>
                    </div>

                    <div className="watch-info">
                      <div className="watch-brand">{watch.brand}</div>
                      <h3 className="watch-collection">{watch.collection}</h3>
                      <p className="watch-description">{watch.description}</p>

                      <div className="watch-meta">
                        <div className="price-range">{formatPriceRange(watch.priceRange.min, watch.priceRange.max)}</div>
                        <div className="gender-tag">{watch.gender.join(" / ")}</div>
                      </div>

                      <a href={watch.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                        View Collection
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <svg viewBox="0 0 24 24" width="64" height="64">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>Try adjusting your description or budget to find more options.</p>
              </div>
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
