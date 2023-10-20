export const dfs = (matrix, m, coordinate, visited, destination) => {
    if(coordinate.x < 0 || coordinate.x >= m || coordinate.y < 0 || coordinate.y >= m
        || matrix[coordinate.y][coordinate.x] == 'W' || visited[coordinate.y][coordinate.x]) {
            return;
    }
    visited[coordinate.y][coordinate.x] = true;
    if(coordinate.x == destination.x && coordinate.y == destination.y) {
        return true;
    }

    dfs(matrix, m, { x: coordinate.x - 1, y: coordinate.y }, visited, destination); // Up
    dfs(matrix, m, { x: coordinate.x + 1, y: coordinate.y }, visited, destination); // Down
    dfs(matrix, m, { x: coordinate.x, y: coordinate.y - 1 }, visited, destination); // Left
    dfs(matrix, m, { x: coordinate.x, y: coordinate.y + 1 }, visited, destination); // Right

    return false;
}