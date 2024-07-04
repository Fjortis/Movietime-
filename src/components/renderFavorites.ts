import { Movie } from '../api';
import { createMovieCard } from './createMovieCard';

export const renderFavorites = (toggleFavorite: (movie: Movie) => void): void => {
    const favoritesContainer = document.getElementById('favorite-movies') as HTMLElement;

    if (!favoritesContainer) {
        console.error('Favorites container element not found');
        return;
    }

    const favorites: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]') as Movie[];

    favoritesContainer.innerHTML = '';

    favorites.forEach((movie: Movie) => {
        const movieCard = createMovieCard(movie, toggleFavorite);
        favoritesContainer.appendChild(movieCard);
    });
};
