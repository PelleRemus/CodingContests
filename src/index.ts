import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";
import { dfs, findIslands, getPath } from "./utils";
import PF from 'pathfinding'

caroshark.main = async (data: LevelData) => {

    // code here 
    let result = []

    let allIslands = findIslands(data.matrix)
    let islands = [];

    let paths = []
    for (let pair of data.coordonates) {
        const point = pair[0];
        let visited = new Array(data.m).fill(0).map(x => new Array(data.m).fill(false))

        let matrix2 = JSON.parse(JSON.stringify(data.matrix))
        let waterCoordinate = {};
        dfs(matrix2, data.m, point, visited, waterCoordinate);


        visited = new Array(data.m).fill(0).map(x => new Array(data.m).fill(false))

        /*for (let y = 0; y < matrix2.length; y++)
            for (let x = 0; x < matrix2.length; x++) {

                let sum =
                    (x == 0 ? 1 : matrix2[y][x - 1]) *
                    (x == data.m - 1 ? 1 : matrix2[y][x + 1]) *

                    (y == 0 ? 1 : matrix2[y - 1][x]) *
                    (y == data.m - 1 ? 1 : matrix2[y + 1][x]) *

                    ((x == 0 || y == 0) ? 1 : matrix2[y - 1][x - 1]) * // top left
                    ((x == data.m - 1 || y == 0) ? 1 : matrix2[y - 1][x + 1]) * // top right

                    ((x == 0 || y == data.m - 1) ? 1 : matrix2[y + 1][x - 1]) * // bottom left
                    ((x == data.m - 1 || y == data.m - 1) ? 1 : matrix2[y + 1][x + 1]); // bottom right


                if (matrix2[y][x] == 2 && sum != 0)
                    matrix2[y][x] = 0;
            }
*/

        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        matrix2 = matrix2.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if (cell === 2) {
                    // Check the surrounding cells for 0 values
                    let hasZero = false;
                    let isEdge = rowIndex == 0 || colIndex == 0 || rowIndex == data.m - 1 || colIndex == data.m - 1;
                    for (const [dx, dy] of directions) {
                        const newRow = rowIndex + dx;
                        const newCol = colIndex + dy;
                        if (newRow >= 0 && newRow < data.m && newCol >= 0 && newCol < data.m) {
                            if (matrix2[newRow][newCol] === 0) {
                                hasZero = true;
                                break;
                            }
                        }
                    }
                    if (!hasZero && !isEdge)
                        matrix2[rowIndex][colIndex] = 0
                    // waterCoordinate = { x: colIndex, y: rowIndex }
                }
                return cell;
            });
        });
        let path = [];
        getPath(matrix2, data.m, waterCoordinate, visited, path)


        if (path.length >= data.m * 2)
            console.log("path prea lung")



        function euclideanDistance(x1, y1, x2, y2) {
            const deltaX = x2 - x1;
            const deltaY = y2 - y1;

            // The square root of the sum of the squares of the differences
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            return distance;
        }
        const d = euclideanDistance(path[0].x, path[0].y, path[path.length - 1].x, path[path.length - 1].y)
        if (d >= 1.42) {
            console.log(d, path[0], path[path.length - 1])
            console.log(
                matrix2.map((line, y) => line.map((n, x) => n == 0 ? " " : n == 1 ? "_" : 2 )//path.findIndex(a => a.x == x && a.y == y))

                ).join('\n'));
            // console.log(path)
            return 0;
        }

        result.push(path.map(a => {
            if (data.matrix[a.y][a.x] == 1)
                console.log("Land")
            return a.x + "," + a.y
        }).join(' '))
    }

    return 1// result.join('\n');
};

caroshark.generateOutput({
    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            subLevel: 4,
        })
});

function getIslandNumber({ x, y }, islands) {

    for (let i = 0; i < islands.length; i++) {
        const island = islands[i];
        const exists = (island as Array<{ x: number, y: number }>)
            .findIndex(a => a.x === x && a.y === y) != -1
        if (exists)
            return i
    }
    console.warn("No island found for", x, y)
    return -1;
}
function hasDuplicates(points: { x: number; y: number; }[]) {
    const s = points.map(x => JSON.stringify(x))
    const set = new Set(s)
    return points.length === set.size;
}

