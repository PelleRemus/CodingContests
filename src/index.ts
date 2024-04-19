import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";

let M = {
    'W': 0,
    'D': 1,
    'S': 2,
    'A': 3,
}
caroshark.main = async (data: LevelData) => {

    // code here 
    let v = []
    for (let path of data.paths) {
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

        v.push(Math.abs(x.max - x.min) + 1 + ' ' + (Math.abs(y.max - y.min) + 1))
    }

    return v.join(`\n`);
};

caroshark.generateOutput({
    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
        })
});