export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    adult: boolean;
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
}

export interface MovieApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    budget: number;
    revenue: number;
    production_companies: { id: number; name: string; logo_path: string | null }[];
    production_countries: { iso_3166_1: string; name: string }[];
    spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
    status: string;
    tagline: string;
}