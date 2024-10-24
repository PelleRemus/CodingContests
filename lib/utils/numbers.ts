export function semiPerimeter(width, height) {
    return width + height;
}
export function perimeter(width, height) {
    return 2 * semiPerimeter(width, height);
}

export function factorial(n) {
    let fact = 1;
    for(let i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}