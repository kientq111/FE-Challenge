import React, { useEffect, useRef, useCallback } from "react";
import { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./MovieList.scss";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  viewMode: "list" | "grid";
  onMovieClick: (movie: Movie) => void;
  onLoadMore: () => void;
  className?: string;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  loading,
  hasMore,
  viewMode,
  onMovieClick,
  onLoadMore,
  className = "",
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (movies.length === 0 && !loading) {
    return (
      <div className="movie-list__empty">
        <div className="movie-list__empty-icon">🎬</div>
        <p className="movie-list__empty-text">No movies found</p>
      </div>
    );
  }

  return (
    <div className={`movie-list ${className}`}>
      <div className={`movie-list__grid movie-list__grid--${viewMode}`}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
            viewMode={viewMode}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="movie-list__load-more">
          {loading && <LoadingSpinner />}
        </div>
      )}
    </div>
  );
};

export default MovieList;
