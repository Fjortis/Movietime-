export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    wait: number
): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
