import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";

let M = {
    'W': 0,
    'D': 1,
    'S': 2,
    'A': 3,
}
caroshark.main = async (data: LevelData) => {
    // return JSON.stringify(data, null, 1);
    return data;

};

caroshark.generateOutput({
    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
        })
});