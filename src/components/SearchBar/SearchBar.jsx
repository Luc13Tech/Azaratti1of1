import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import "./SearchBar.css";

export default function SearchBar({ onClose }) {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      if (onClose) onClose();
    }
  }

  return (
    <form
      className={`searchbar ${focused ? "searchbar--focused" : ""}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="searchbar__inner">
        {/* Search icon */}
        <button type="submit" className="searchbar__icon" aria-label={t("nav.search")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </button>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t("nav.searchPlaceholder")}
          className="searchbar__input"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label={t("nav.searchPlaceholder")}
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            className="searchbar__clear"
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            aria-label="Effacer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
