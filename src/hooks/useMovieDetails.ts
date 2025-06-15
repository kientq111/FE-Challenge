import { useState, useEffect } from 'react';
import { MovieDetails } from '../types/movie';
import { movieApi } from '../services/api';

export const useMovieDetails = (movieId: number | null) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!movieId) return;

        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const movieDetails = await movieApi.getMovieDetails(movieId);
                setMovie(movieDetails);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    return { movie, loading, error };
};