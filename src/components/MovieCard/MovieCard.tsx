import React, { useState } from "react";
import { Movie } from "../../types/movie";
import { movieApi } from "../../services/api";
import { formatVoteAverage } from "../../utils/formatters";
import "./movie-card.scss";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  viewMode: "list" | "grid";
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  viewMode,
  className = "",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    onClick(movie);
  };

  const posterUrl = movieApi.getImageUrl(movie.poster_path, "w342");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <article
      className={`movie-card movie-card--${viewMode} ${className}`}
      onClick={handleCardClick}
    >
      <div className="movie-card__poster-container">
        {!imageLoaded && (
          <div className="movie-card__poster-skeleton">
            <div className="movie-card__poster-placeholder">📽️</div>
          </div>
        )}
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className={`movie-card__poster ${
            imageLoaded ? "movie-card__poster--loaded" : ""
          } ${imageError ? "movie-card__poster--error" : ""}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="movie-card__rating">
          <span className="movie-card__rating-icon">⭐</span>
          <span className="movie-card__rating-value">
            {formatVoteAverage(movie.vote_average)}
          </span>
        </div>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{year}</p>
        {viewMode === "list" && (
          <p className="movie-card__overview">{movie.overview}</p>
        )}
      </div>
    </article>
  );
};

export default MovieCard;
