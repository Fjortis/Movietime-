import { Movie, getFavoriteMovies } from '../api';

const placeholderImage = './assets/placeholder.jpg';

export const createMovieCard = (movie: Movie, toggleFavorite: (movie: Movie) => void): HTMLElement => {
    const movieElement = document.createElement('div');
    movieElement.className = 'col-lg-3 col-md-4 col-12 p-2';
    const favorites = getFavoriteMovies();
    const isFavorited = favorites.includes(movie.id);
    const movieImageSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : placeholderImage;

    movieElement.innerHTML = `
        <div class="card shadow-sm">
            <img src="${movieImageSrc}" alt="${movie.title}" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="red"
                fill="${isFavorited ? 'red' : '#fff'}"
                width="50"
                height="50"
                class="bi bi-heart-fill position-absolute p-2 favorite-icon ${isFavorited ? 'favorited' : ''}"
                viewBox="0 -2 18 22"
                data-id="${movie.id}"
            >
                <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
            </svg>
            <div class="card-body">
                <p class="card-text truncate">${movie.overview}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">${movie.release_date}</small>
                </div>
            </div>
        </div>
    `;
    const heartIcon = movieElement.querySelector('.favorite-icon') as SVGElement;
    heartIcon.addEventListener('click', () => {
        toggleFavorite(movie);
        heartIcon.classList.toggle('favorited');
        heartIcon.setAttribute('fill', heartIcon.classList.contains('favorited') ? 'red' : '#fff');
    });
    return movieElement;
};
