import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";
import { findIslands } from "./utils";

caroshark.main = async (data: LevelData) => {

    // code here 
    let result = []
    const islands = findIslands(data.matrix);

    for (let pair of data.coordonates) {
        const a = getIslandNumber(pair[0], islands)
        const b = getIslandNumber(pair[1], islands)
        result.push(a == b ? "SAME" : "DIFFERENT")
    }

    return result.join('\n');
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
