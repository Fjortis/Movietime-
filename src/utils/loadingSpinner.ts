export const showLoadingSpinner = (): void => {
    const loadingSpinner = document.getElementById('loading-spinner') as HTMLElement;
    if (loadingSpinner) {
        loadingSpinner.classList.remove('d-none');
    }
};

export const hideLoadingSpinner = (): void => {
    const loadingSpinner = document.getElementById('loading-spinner') as HTMLElement;
    if (loadingSpinner) {
        loadingSpinner.classList.add('d-none');
    }
};
