import { Movie } from './api';
import { toggleFavorite } from './favorites';
import { renderMovies } from './components';
import { showLoadingSpinner, hideLoadingSpinner } from './utils/loadingSpinner'; // Corrected import path

let currentPage = 1;
let currentFetchFunction: (page: number) => Promise<Movie[]>;

const displayRandomMovie = (movies: Movie[]): void => {
    if (movies.length === 0) return;
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    const randomMovieName = document.getElementById('random-movie-name') as HTMLElement;
    const randomMovieDescription = document.getElementById('random-movie-description') as HTMLElement;
    randomMovieName.textContent = randomMovie.title;
    randomMovieDescription.textContent = randomMovie.overview;
};

export const loadMovies = async (
    fetchFunction: (page: number) => Promise<Movie[]>,
    container: HTMLElement,
    append: boolean = false
): Promise<void> => {
    showLoadingSpinner();
    try {
        const movies = await fetchFunction(currentPage);

        const newContent = document.createDocumentFragment();
        renderMovies(movies, newContent as unknown as HTMLElement, append, toggleFavorite);

        if (append) {
            container.appendChild(newContent);
        } else {
            const newContainer = document.createElement('div');
            newContainer.appendChild(newContent);
            container.replaceChildren(...newContainer.childNodes);
            displayRandomMovie(movies);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        if (!append) {
            const errorMessage = document.createElement('p');
            errorMessage.classList.add('text-danger');
            errorMessage.textContent = 'Failed to load movies. Please try again later.';
            container.replaceChildren(errorMessage);
        }
    } finally {
        hideLoadingSpinner();
    }
};

export const setFetchFunction = (fetchFunction: (page: number) => Promise<Movie[]>): void => {
    currentFetchFunction = fetchFunction;
    currentPage = 1;
};

export const getFetchFunction = (): ((page: number) => Promise<Movie[]>) => currentFetchFunction;

export const incrementPage = (): void => {
    currentPage += 1;
};
