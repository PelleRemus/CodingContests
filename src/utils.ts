export function findIslands(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const visited = Array(rows).fill(0).map(() => Array(cols).fill(false));
    const islands = [];

    function isSafe(row, col) {
        return row >= 0 && row < rows && col >= 0 && col < cols && matrix[row][col] === 1 && !visited[row][col];
    }

    function dfs(row, col, island) {
        const rowMoves = [-1, 0, 1, 0];
        const colMoves = [0, 1, 0, -1];

        visited[row][col] = true;
        island.push({ x: col, y: row });

        for (let i = 0; i < 4; i++) {
            const newRow = row + rowMoves[i];
            const newCol = col + colMoves[i];

            if (isSafe(newRow, newCol)) {
                dfs(newRow, newCol, island);
            }
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (matrix[row][col] === 1 && !visited[row][col]) {
                const island = [];
                dfs(row, col, island);
                islands.push(island);
            }
        }
    }

    return islands;
}

export const dfs = (matrix, m, coordinate, visited, path) => {
    if(coordinate.x < 0 || coordinate.x >= m || coordinate.y < 0 || coordinate.y >= m
        || matrix[coordinate.y][coordinate.x] == 0) {
            path.push(coordinate);
            return;
    }
    if(visited[coordinate.y][coordinate.x]) {
        return;
    }
    visited[coordinate.y][coordinate.x] = true;

    dfs(matrix, m, { x: coordinate.x - 1, y: coordinate.y }, visited, path); // Up
    dfs(matrix, m, { x: coordinate.x + 1, y: coordinate.y }, visited, path); // Down
    dfs(matrix, m, { x: coordinate.x, y: coordinate.y - 1 }, visited, path); // Left
    dfs(matrix, m, { x: coordinate.x, y: coordinate.y + 1 }, visited, path); // Right
}