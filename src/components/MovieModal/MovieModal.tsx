import React, { useEffect } from "react";
import { Movie } from "../../types/movie";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { movieApi } from "../../services/api";
import {
  formatDate,
  formatRuntime,
  formatVoteAverage,
} from "../../utils/formatters";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./MovieModal.scss";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const {
    movie: movieDetails,
    loading,
    error,
  } = useMovieDetails(movie?.id || null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (movie) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const backdropUrl = movieApi.getImageUrl(movie.backdrop_path, "w1280");
  const posterUrl = movieApi.getImageUrl(movie.poster_path, "w500");

  return (
    <div className="movie-modal" onClick={handleBackdropClick}>
      <div className="movie-modal__content">
        <button className="movie-modal__close" onClick={onClose}>
          ✕
        </button>

        {loading && (
          <div className="movie-modal__loading">
            <LoadingSpinner size="large" />
          </div>
        )}

        {error && (
          <ErrorMessage message={error} className="movie-modal__error" />
        )}

        {movieDetails && (
          <>
            <div className="movie-modal__backdrop">
              <img
                src={backdropUrl}
                alt={`${movieDetails.title} backdrop`}
                className="movie-modal__backdrop-image"
              />
              <div className="movie-modal__backdrop-overlay" />
            </div>

            <div className="movie-modal__info">
              <div className="movie-modal__poster">
                <img
                  src={posterUrl}
                  alt={`${movieDetails.title} poster`}
                  className="movie-modal__poster-image"
                />
              </div>

              <div className="movie-modal__details">
                <h2 className="movie-modal__title">{movieDetails.title}</h2>

                {movieDetails.tagline && (
                  <p className="movie-modal__tagline">
                    "{movieDetails.tagline}"
                  </p>
                )}

                <div className="movie-modal__meta">
                  <span className="movie-modal__rating">
                    ⭐ {formatVoteAverage(movieDetails.vote_average)}
                  </span>
                  <span className="movie-modal__year">
                    {formatDate(movieDetails.release_date)}
                  </span>
                  {movieDetails.runtime && (
                    <span className="movie-modal__runtime">
                      {formatRuntime(movieDetails.runtime)}
                    </span>
                  )}
                </div>

                {movieDetails.genres.length > 0 && (
                  <div className="movie-modal__genres">
                    {movieDetails.genres.map((genre) => (
                      <span key={genre.id} className="movie-modal__genre">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="movie-modal__overview">
                  <h3>Overview</h3>
                  <p>{movieDetails.overview}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
