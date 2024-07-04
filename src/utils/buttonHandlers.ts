export const highlightActiveButton = (button: HTMLElement): void => {
    const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-group .btn-outline-dark');
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
};
