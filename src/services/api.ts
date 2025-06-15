import { MovieApiResponse, MovieDetails } from "../types/movie";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const movieApi = {
    getNowPlaying: async (page: number = 1): Promise<MovieApiResponse> => {
        const response = await fetch(
            `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
        );
        if (!response.ok) throw new Error('Failed to fetch now playing movies');
        return response.json();
    },

    getTopRated: async (page: number = 1): Promise<MovieApiResponse> => {
        const response = await fetch(
            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
        );
        if (!response.ok) throw new Error('Failed to fetch top rated movies');
        return response.json();
    },

    searchMovies: async (query: string, page: number = 1): Promise<MovieApiResponse> => {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
        );
        if (!response.ok) throw new Error('Failed to search movies');
        return response.json();
    },

    getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch movie details');
        return response.json();
    },

    getImageUrl: (path: string | null, size: string = 'w500'): string => {
        return path ? `${IMAGE_BASE_URL}/${size}${path}` : '/placeholder-image.jpg';
    }
};