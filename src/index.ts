import { RunTypes } from "../lib/caroshark";
import { caroshark, LevelData, runType } from "./setup";

caroshark.main = async (data: LevelData) => {

    // code here 

    return data;
};

caroshark.generateOutput({
    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
        })
});