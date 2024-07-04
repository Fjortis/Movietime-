export const getFavoriteMovies = (): number[] => {
    const favorites = localStorage.getItem('favoriteMovies');
    return favorites ? JSON.parse(favorites) : [];
};

export const saveFavoriteMovies = (favorites: number[]): void => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
};
