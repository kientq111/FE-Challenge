import { useState, useEffect } from 'react';
import { Movie, MovieApiResponse } from '../types/movie';
import { movieApi } from '../services/api';

export type MovieCategory = 'now_playing' | 'top_rated' | 'search';

export const useMovies = (category: MovieCategory, searchQuery?: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMovies = async (pageNum: number = 1, reset: boolean = false) => {
        setLoading(true);
        setError(null);

        try {
            let response: MovieApiResponse;

            switch (category) {
                case 'now_playing':
                    response = await movieApi.getNowPlaying(pageNum);
                    break;
                case 'top_rated':
                    response = await movieApi.getTopRated(pageNum);
                    break;
                case 'search':
                    if (!searchQuery) return;
                    response = await movieApi.searchMovies(searchQuery, pageNum);
                    break;
                default:
                    throw new Error('Invalid category');
            }

            setMovies(prev => reset ? response.results : [...prev, ...response.results]);
            setHasMore(pageNum < response.total_pages);
            setPage(pageNum);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(1, true);
    }, [category, searchQuery]);

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchMovies(page + 1);
        }
    };

    const refresh = () => {
        fetchMovies(1, true);
    };

    return {
        movies,
        loading,
        error,
        hasMore,
        loadMore,
        refresh
    };
};
