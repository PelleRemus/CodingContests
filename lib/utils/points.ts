export function euclideanDistance(x1: number, y1: number, x2: number, y2: number) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // The square root of the sum of the squares of the differences
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
}