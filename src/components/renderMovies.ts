import { Movie } from '../api';
import { createMovieCard } from './createMovieCard';

export const renderMovies = (
    movies: Movie[],
    container: HTMLElement,
    append: boolean,
    toggleFavorite: (movie: Movie) => void
): void => {
    console.log('Rendering movies:', movies);
    const newContent = document.createDocumentFragment();

    if (!append) {
        const newContainer = document.createElement('div');
        movies.forEach((movie: Movie) => {
            const movieCard = createMovieCard(movie, toggleFavorite);
            newContainer.appendChild(movieCard);
        });
        container.replaceChildren(...newContainer.childNodes);
    } else {
        movies.forEach((movie: Movie) => {
            const movieCard = createMovieCard(movie, toggleFavorite);
            newContent.appendChild(movieCard);
        });
        container.appendChild(newContent);
    }
};
