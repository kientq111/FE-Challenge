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
    tagline: string;
    status: string;

    budget: number;
    revenue: number;

    production_companies: {
        id: number;
        name: string;
        logo_path: string | null;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];

    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    origin_country: string[];
    original_language: string;
    original_title: string;

    imdb_id: string | null;
    homepage: string | null;

    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    } | null;

    adult: boolean;
    video: boolean;
    popularity: number;
    vote_count: number;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieCollection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetailsClean extends Movie {
    genres: Genre[];
    runtime: number;
    tagline: string;
    status: string;

    budget: number;
    revenue: number;

    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];

    spoken_languages: SpokenLanguage[];
    origin_country: string[];
    original_language: string;
    original_title: string;

    imdb_id: string | null;
    homepage: string | null;

    belongs_to_collection: MovieCollection | null;

    adult: boolean;
    video: boolean;
    popularity: number;
    vote_count: number;
}