import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";
import { generateLawnFromPath } from "./utils";

caroshark.main = async (data: LevelData) => {

    function getBoundaries(path) {
        let x = { min: 0, max: 0, current: 0 }
        let y = { min: 0, max: 0, current: 0 }

        for (let dir of path) {
            if (dir == 'A') {
                x.current--
                if (x.current <= x.min)
                    x.min = x.current
            }
            else if (dir == 'D') {
                x.current++
                if (x.current >= x.max)
                    x.max = x.current
            }
            if (dir == 'W') {
                y.current++
                if (y.current >= y.max)
                    y.max = y.current
            }
            else if (dir == 'S') {
                y.current--
                if (y.current <= y.min)
                    y.min = y.current
            }
        }

        return { w: Math.abs(x.max - x.min) + 1, h: (Math.abs(y.max - y.min) + 1) }

    }

    let solution = []
    for (let lawn of data.lawns) {

        let genLawn = generateLawnFromPath(lawn.path)

        let b = getBoundaries(lawn.path)


        let v = genLawn.flat()
        let dic = {}
        for (let x of v) {
            if (!(x in dic))
                dic[x] = 0
            dic[x]++
        }
        // return dic;

        const isGood = Object.keys(dic).length == 2 && '0' in dic && '1' in dic && dic['0'] == 1

        let p = lawn.m.flat().indexOf('X')
        let tree = {
            x: Math.floor(p % lawn.m[0].length),
            y: Math.floor(p / lawn.m[0].length)
        }

        if (
            genLawn.length != b.h ||
            genLawn[0].length != b.w ||
            !isGood ||
            genLawn[tree.y][tree.x] != 0
        )
            solution.push("INVALID")
        else
            solution.push("VALID")

    }

    return solution.join(`\n`)
};

caroshark.generateOutput({
    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
        })
});