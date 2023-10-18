import * as fs from "fs";
import * as path from "path";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Level {
  /** La care level este acuma. */
  level: number;

  /** Prin functia asta trece fiecare fisier .in cand accesez level.in
   * @returns default value e ca face split per '\n'
   */
  inFilesMap: (str: string) => any;

  /** Continutul pur al fisierelor de .in */
  inFiles: Array<string> = [];

  /** Continutul pur al fisierului de example */
  exampleFile: string = "";

  /**
   * @param data va fi data din fiecare fisier .in mapat
   * @return va fi introdus in fisierul .out
   */
  main!: (data: any, subLevel: number) => any; //string | Promise<string>;

  constructor({
    level,
  }: {
    level: number;
  }) {
    this.level = level;

    this.inFilesMap = (str: string) =>
      str
        .split("\n")
        .map((x) => x.trim())
        .map((x) => (x != "" && !isNaN(x as any) ? parseInt(x) : x));

    this.#loadInFiles();
  }

  get in() {
    return this.inFiles.map((file) => {
      // removing the trailing endline
      if (file[file.length - 1] === "\n")
        file = file.substring(0, file.length - 1);
      return this.inFilesMap(file);
    });
  }

  async #generateOutputLevel({
    consoleOnly = true,
    subLevel
  }: { consoleOnly: boolean; subLevel: number }) {

    const i = subLevel - 1;

    // header
    console.log(consoleOnly ? `\nOutput level ${this.level}_${subLevel}:` : `\nGenerating the file level${this.level}_${subLevel}.out:`);

    //content
    const output = await this.main(this.in[i], subLevel);
    if (consoleOnly) {
      console.log("--- Result:");
      console.log(output);
    } else {
      this.#createOutFile(
        `level${this.level}_${subLevel}.out`,
        typeof output === "string" ? output : JSON.stringify(output)
      );
    }

    // footer
    if (!consoleOnly) {
      console.log(`Output level${this.level}_${subLevel}.out was updated.`);
    }

  }
  async generateOutput({
    consoleOnly = true,
    exampleOnly = true,
    subLevel,
    subLevelFrom = 1,
    subLevelTo = this.in.length,
  }: {
    consoleOnly?: boolean; exampleOnly?: boolean,
    subLevel?: number,
    subLevelFrom?: number
    subLevelTo?: number
  } = {}) {

    if (exampleOnly) {
      const output = await this.main(this.exampleFile, -1);
      if (consoleOnly) {
        console.log("Example level:");
        console.log(output);
      } else {
        this.#createOutFile(
          `level${this.level}_example.out`,
          typeof output === "string" ? output : JSON.stringify(output)
        );
        console.log(`Example level${this.level}_example.out file was updated.`);
      }
    }
    else if (subLevel === undefined) {
      for (let i = subLevelFrom; i <= subLevelTo; i++) {
        await this.#generateOutputLevel({ consoleOnly, subLevel: i });
      }
    }
    else await this.#generateOutputLevel({ consoleOnly, subLevel });
  }

  //#region private parts
  #loadInFiles() {
    const getInFilesPath = (fileName: string) => {
      return path.join(
        __dirname,
        `../../levels/level${this.level}/in/`,
        fileName
      );
    }
    this.exampleFile = fs.readFileSync(getInFilesPath(`level${this.level}_example.in`), "utf8");

    this.inFiles = [];
    let subLevel = 1;
    while (fs.existsSync(getInFilesPath(`level${this.level}_${subLevel}.in`))) {
      this.inFiles.push(
        fs.readFileSync(getInFilesPath(`level${this.level}_${subLevel}.in`), "utf8")
      )
      subLevel++;
    }
  }

  #createOutFile(fileName: string, content: string) {
    const getOutFilesPath = (fileName: string) => {
      return path.join(
        __dirname,
        `../../levels/level${this.level}/out/`,
        fileName
      );
    }
    fs.writeFileSync(getOutFilesPath(fileName), content, { flag: "w" });
  }
  //#endregion
}
