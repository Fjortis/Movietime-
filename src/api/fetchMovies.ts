import { Movie, ApiMovie, MovieCategory } from './types';

const API_KEY = '8e8970cfd3384467aba3f4347d9d7872';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (url: string): Promise<Movie[]> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results.map((movie: ApiMovie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
        }));
    } catch (error) {
        console.error('Fetching movies failed:', error);
        return [];
    }
};

const fetchMovieById = async (movieId: number): Promise<Movie | null> => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {
            id: data.id,
            title: data.title,
            overview: data.overview,
            release_date: data.release_date,
            poster_path: data.poster_path,
        };
    } catch (error) {
        console.error('Fetching movie by ID failed:', error);
        return null;
    }
};

const getMovies = (category: MovieCategory, page: number = 1): Promise<Movie[]> => {
    const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`;
    return fetchMovies(url);
};

const getPopularMovies = (page: number = 1): Promise<Movie[]> =>
    fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
const getTopRatedMovies = (page: number = 1): Promise<Movie[]> =>
    fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
const getUpcomingMovies = (page: number = 1): Promise<Movie[]> =>
    fetchMovies(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`);
const searchMovies = (query: string, page: number = 1): Promise<Movie[]> =>
    fetchMovies(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&page=${page}`);

export { getMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, searchMovies, fetchMovieById };
