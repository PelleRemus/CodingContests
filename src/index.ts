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
        const visited = new Array(data.m).fill(0).map(x => new Array(data.m).fill(false))

        let matrix2 = JSON.parse(JSON.stringify(data.matrix))
        dfs(matrix2, data.m, point, visited);

        console.log((matrix2))
    }

    return 1;
};

caroshark.generateOutput({
    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
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

