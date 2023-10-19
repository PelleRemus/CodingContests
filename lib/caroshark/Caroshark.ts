import * as fs from "fs";
import * as path from "path";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Caroshark {
  /** La care level este acuma. */
  level: number;

  /** Prin functia asta trece fiecare fisier .in cand accesez level.in
   * @returns default value e ca face split per '\n'
   */
  static inFilesMap: (str: string) => any;

  /** Continutul pur al fisierelor de .in */
  inFiles: Array<string> = [];

  #files: Array<ReturnType<typeof Caroshark.inFilesMap>> = [];

  /** Continutul pur al fisierului de example */
  #exampleInFile: string = "";
  #exampleFile: ReturnType<typeof Caroshark.inFilesMap>;

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

    Caroshark.inFilesMap = (str: string) =>
      str
        .split("\n")
        .map((x) => x.trim())
        .map((x) => (x != "" && !isNaN(x as any) ? parseFloat(x) : x));

    this.#loadInFiles();
  }

  #formatFile(fileContent: string) {
    // removing the trailing endline
    if (fileContent[fileContent.length - 1] === "\n")
      fileContent = fileContent.substring(0, fileContent.length - 1);
    return Caroshark.inFilesMap(fileContent);
  }
  /*   get in() {
      return this.inFiles.map((file) => {
        this.#formatFile(file)
      });
    } */

  async #generateOutputLevel({
    consoleOnly = true,
    subLevel
  }: { consoleOnly: boolean; subLevel: number }) {

    const i = subLevel - 1;

    // header
    console.log(consoleOnly ? `\nOutput level ${this.level}_${subLevel}:` : `\nGenerating the file level${this.level}_${subLevel}.out:`);

    //content
    const output = await this.main(this.#files[i], subLevel);
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
    subLevelTo = this.inFiles.length,
  }: {
    consoleOnly?: boolean; exampleOnly?: boolean,
    subLevel?: number,
    subLevelFrom?: number
    subLevelTo?: number
  } = {}) {

    if (exampleOnly)
      this.#exampleFile = this.#formatFile(this.#exampleInFile)
    else
      this.#files = this.inFiles.map((file) => this.#formatFile(file))
    
    if (exampleOnly) {
      const output = await this.main(this.#exampleFile, -1);
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
    this.#exampleInFile = fs.readFileSync(getInFilesPath(`level${this.level}_example.in`), "utf8");

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