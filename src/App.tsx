import React, { useState } from "react";
import { Movie } from "./types/movie";
import { useMovies, MovieCategory } from "./hooks/useMovies";
import TabBar, { Tab } from "./components/TabBar/TabBar";
import SearchBar from "./components/SearchBar/SearchBar";
import ViewToggle from "./components/ViewToggle/ViewToggle";
import MovieList from "./components/MovieList/MovieList";
import MovieModal from "./components/MovieModal/MovieModal";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.scss";

const tabs: Tab[] = [
  { id: "now_playing", label: "Now Playing", icon: "🎬" },
  { id: "top_rated", label: "Top Rated", icon: "⭐" },
];

function App() {
  const [activeTab, setActiveTab] = useState<string>("now_playing");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const category: MovieCategory = searchQuery
    ? "search"
    : (activeTab as MovieCategory);

  const { movies, loading, error, hasMore, loadMore, refresh } = useMovies(
    category,
    searchQuery
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchQuery(""); // Clear search when switching tabs
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const isInitialLoading = loading && movies.length === 0;

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-content">
          <h1 className="app__title">Movies</h1>

          <div className="app__controls">
            <SearchBar onSearch={handleSearch} className="app__search" />
            <ViewToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              className="app__view-toggle"
            />
          </div>
        </div>

        {!searchQuery && (
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            className="app__tabs"
          />
        )}
      </header>

      <main className="app__main">
        {isInitialLoading && (
          <div className="app__loading">
            <LoadingSpinner size="large" />
            <p>Loading movies...</p>
          </div>
        )}

        {error && !isInitialLoading && (
          <ErrorMessage
            message={error}
            onRetry={refresh}
            className="app__error"
          />
        )}

        {!isInitialLoading && !error && (
          <>
            {searchQuery && (
              <div className="app__search-info">
                <p>
                  Search results for "{searchQuery}" ({movies.length} movies)
                </p>
              </div>
            )}

            <MovieList
              movies={movies}
              loading={loading}
              hasMore={hasMore}
              viewMode={viewMode}
              onMovieClick={handleMovieClick}
              onLoadMore={loadMore}
              className="app__movie-list"
            />
          </>
        )}
      </main>

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
