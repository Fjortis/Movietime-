import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import { getMovies, MovieCategory, searchMovies } from './api';
import { renderFavorites } from './components';
import { debounce, highlightActiveButton } from './utils';
import { loadMovies, setFetchFunction, incrementPage, getFetchFunction } from './movieLoader';
import { toggleFavorite } from './favorites';

const initializeApp = (): void => {
    document.addEventListener('DOMContentLoaded', () => {
        const filmContainer = document.getElementById('film-container') as HTMLElement | null;
        const loadMoreButton = document.getElementById('load-more') as HTMLButtonElement | null;
        const searchInput = document.getElementById('search') as HTMLInputElement | null;
        const popularButton = document.getElementById('popular') as HTMLInputElement | null;
        const upcomingButton = document.getElementById('upcoming') as HTMLInputElement | null;
        const topRatedButton = document.getElementById('top_rated') as HTMLInputElement | null;
        const favoritesContainer = document.getElementById('favorite-movies') as HTMLElement | null;

        if (filmContainer && loadMoreButton && searchInput && popularButton && upcomingButton && topRatedButton) {
            filmContainer.innerHTML = '';
            highlightActiveButton(popularButton.nextElementSibling as HTMLElement);
            setFetchFunction((page: number) => getMovies(MovieCategory.Popular, page));
            loadMovies(getFetchFunction(), filmContainer);

            popularButton.addEventListener('click', () => {
                highlightActiveButton(popularButton.nextElementSibling as HTMLElement);
                setFetchFunction((page: number) => getMovies(MovieCategory.Popular, page));
                loadMovies(getFetchFunction(), filmContainer);
            });

            upcomingButton.addEventListener('click', () => {
                highlightActiveButton(upcomingButton.nextElementSibling as HTMLElement);
                setFetchFunction((page: number) => getMovies(MovieCategory.Upcoming, page));
                loadMovies(getFetchFunction(), filmContainer);
            });

            topRatedButton.addEventListener('click', () => {
                highlightActiveButton(topRatedButton.nextElementSibling as HTMLElement);
                setFetchFunction((page: number) => getMovies(MovieCategory.TopRated, page));
                loadMovies(getFetchFunction(), filmContainer);
            });

            loadMoreButton.addEventListener('click', () => {
                incrementPage();
                loadMovies(getFetchFunction(), filmContainer, true);
            });

            const debouncedSearch = debounce((event: Event) => {
                const query = (event.target as HTMLInputElement).value;
                if (query) {
                    document
                        .querySelectorAll('.btn-group .btn-outline-dark')
                        .forEach((btn) => btn.classList.remove('active'));
                    setFetchFunction((page: number) => searchMovies(query, page));
                    loadMovies(getFetchFunction(), filmContainer);
                } else {
                    highlightActiveButton(popularButton.nextElementSibling as HTMLElement);
                    setFetchFunction((page: number) => getMovies(MovieCategory.Popular, page));
                    loadMovies(getFetchFunction(), filmContainer);
                }
            }, 300);

            searchInput.addEventListener('input', debouncedSearch);

            if (favoritesContainer) {
                renderFavorites(toggleFavorite);
            } else {
                console.error('Favorites container element not found');
            }
        } else {
            console.error('One or more elements not found in the DOM', { filmContainer, loadMoreButton, searchInput });
        }
    });
};

initializeApp();
