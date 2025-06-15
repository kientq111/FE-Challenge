import React, { useState, useCallback } from "react";
import { debounce } from "../../utils/debounce";
import "./search-bar.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search movies...",
  className = "",
}) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={`search-bar ${className}`}>
      <div className="search-bar__input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-bar__input"
        />
        {query && (
          <button
            onClick={handleClear}
            className="search-bar__clear-btn"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
