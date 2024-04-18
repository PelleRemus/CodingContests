import * as fs from "fs";
import * as path from "path";
import AdmZip from "adm-zip";

export function unzipLevelFile(maxLevel = 5) {
    const levelsFolder = path.join(
        __dirname,
        `../../levels/`,
    )
    for (let i = 1; i < maxLevel; i++) {

        const zipFilePath = path.join(
            levelsFolder,
            `level${i}/level${i}.zip`,
        )

        const unzipedPath = path.join(
            levelsFolder,
            `level${i}/in`,
        )

        const existsFolder = fs.existsSync(zipFilePath);
        const alreadyExtracted = fs.existsSync(path.join(
            levelsFolder,
            `level${i}/in/level${i}_1.in`,
        ));

        if (existsFolder && !alreadyExtracted) {
            const zip = new AdmZip(zipFilePath);
            zip.extractAllTo(/*target path*/ unzipedPath, /*overwrite*/ false);
            console.log("Level " + i + " .zip extracted.")
        }
    }
}