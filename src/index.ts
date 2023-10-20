import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";
import { findIslands } from "./utils";
import PF from 'pathfinding'

caroshark.main = async (data: LevelData) => {

    // code here 
    let result = []

    let allIslands = findIslands(data.matrix)
    let islands = [];
    for (let pair of data.coordonates) {
        const point = pair[0];
        islands.push(allIslands[getIslandNumber(point, allIslands)]);
    }

    return islands;
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

