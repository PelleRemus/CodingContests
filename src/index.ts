import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";

caroshark.main = async (data: LevelData) => {

    // code here 
    let result = []
    for(let [x,y] of data.coordonates)
        result.push(data.matrix[y][x])

    return result.join('\n');
};

caroshark.generateOutput({
    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
        })
});