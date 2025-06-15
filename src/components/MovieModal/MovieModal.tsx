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
import "./movie-modal.scss";

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
                <div className="movie-modal__header">
                  <h2 className="movie-modal__title">{movieDetails.title}</h2>
                  {movieDetails.original_title !== movieDetails.title && (
                    <p className="movie-modal__original-title">
                      Original: {movieDetails.original_title}
                    </p>
                  )}
                  {movieDetails.tagline && (
                    <p className="movie-modal__tagline">
                      "{movieDetails.tagline}"
                    </p>
                  )}
                </div>

                <div className="movie-modal__meta">
                  <div className="movie-modal__meta-row">
                    <span className="movie-modal__rating">
                      ⭐ {formatVoteAverage(movieDetails.vote_average)}
                      <span className="movie-modal__vote-count">
                        ({movieDetails.vote_count} votes)
                      </span>
                    </span>
                    <span className="movie-modal__status">
                      {movieDetails.status}
                    </span>
                  </div>

                  <div className="movie-modal__meta-row">
                    <span className="movie-modal__year">
                      📅 {formatDate(movieDetails.release_date)}
                    </span>
                    {movieDetails.runtime && (
                      <span className="movie-modal__runtime">
                        ⏱️ {formatRuntime(movieDetails.runtime)}
                      </span>
                    )}
                  </div>

                  {movieDetails.spoken_languages &&
                    movieDetails.spoken_languages.length > 0 && (
                      <div className="movie-modal__meta-row">
                        <span className="movie-modal__languages">
                          🗣️{" "}
                          {movieDetails.spoken_languages
                            .map((lang) => lang.english_name)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                </div>

                {movieDetails.genres && movieDetails.genres.length > 0 && (
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

                {/* Additional Details */}
                <div className="movie-modal__additional">
                  <h3>Additional Information</h3>
                  <div className="movie-modal__additional-grid">
                    {movieDetails.popularity && (
                      <div className="movie-modal__additional-item">
                        <span className="movie-modal__additional-label">
                          Popularity:
                        </span>
                        <span className="movie-modal__additional-value">
                          {Math.round(movieDetails.popularity)}
                        </span>
                      </div>
                    )}
                    {movieDetails.production_countries &&
                      movieDetails.production_countries.length > 0 && (
                        <div className="movie-modal__additional-item">
                          <span className="movie-modal__additional-label">
                            Countries:
                          </span>
                          <span className="movie-modal__additional-value">
                            {movieDetails.production_countries.length > 1
                              ? `${movieDetails.production_countries
                                  .slice(0, 1)
                                  .map((country) => country.name)
                                  .join(", ")}...`
                              : movieDetails.production_countries
                                  .map((country) => country.name)
                                  .join(", ")}
                          </span>
                        </div>
                      )}
                    {movieDetails.imdb_id && (
                      <div className="movie-modal__additional-item">
                        <span className="movie-modal__additional-label">
                          IMDB:
                        </span>
                        <a
                          href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="movie-modal__additional-link"
                        >
                          Link to IMDB
                        </a>
                      </div>
                    )}

                    {movieDetails.homepage && (
                      <div className="movie-modal__additional-item">
                        <span className="movie-modal__additional-label">
                          Homepage:
                        </span>
                        <a
                          href={movieDetails.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="movie-modal__additional-link"
                        >
                          Official Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Collection Information */}
                {movieDetails.belongs_to_collection && (
                  <div className="movie-modal__collection">
                    <h3>Part of Collection</h3>
                    <div className="movie-modal__collection-info">
                      {movieDetails.belongs_to_collection.backdrop_path && (
                        <img
                          src={movieApi.getImageUrl(
                            movieDetails.belongs_to_collection.backdrop_path,
                            "w300"
                          )}
                          alt={`${movieDetails.belongs_to_collection.name} collection`}
                          className="movie-modal__collection-image"
                        />
                      )}
                      <span className="movie-modal__collection-name">
                        {movieDetails.belongs_to_collection.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
