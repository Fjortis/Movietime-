export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
}

export interface ApiMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
}

export enum MovieCategory {
    Popular = 'popular',
    TopRated = 'top_rated',
    Upcoming = 'upcoming',
}
