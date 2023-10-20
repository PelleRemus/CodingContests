import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";
import { findIslands } from "./utils";

caroshark.main = async (data: LevelData) => {

    // code here 
    let result = []
    // const islands = findIslands(data.matrix);

    let isValid = true;


    for (let points of data.coordonates) {
        isValid = true;

        let p = []

        for (let i = 0; i < 2 * points.length - 1; i++) {
            if (i % 2 == 0)
                p.push(points[i / 2])
            else {
                let p1 = points[(i - 1) / 2];
                let p2 = points[(i - 1) / 2 + 1];
                p.push(
                    {
                        x: ((p1.x + p2.x) / 2),
                        y: ((p1.y + p2.y) / 2),
                    }
                )
            }
        }
        // console.log(p)
        const hasSamePoints = hasDuplicates(p)
        if (hasSamePoints)
            isValid = false
        result.push(isValid ? "INVALID" : "VALID")
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
function hasDuplicates(points: { x: number; y: number; }[]) {
    const s = points.map(x => JSON.stringify(x))
    const set = new Set(s)
    console.log(s)
    console.log(set.values())
    return points.length === set.size;
}

