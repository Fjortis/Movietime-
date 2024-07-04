import { renderFavorites } from './components/renderFavorites';
import { Movie , getFavoriteMovies, saveFavoriteMovies } from './api';

export const toggleFavorite = (movie: Movie): void => {
    let favorites = getFavoriteMovies();

    if (favorites.includes(movie.id)) {
        favorites = favorites.filter((favId) => favId !== movie.id);
    } else {
        favorites.push(movie.id);
    }

    saveFavoriteMovies(favorites);
    renderFavorites(toggleFavorite);
};
