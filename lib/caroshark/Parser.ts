export class Parser {
    obj: Record<string, any> = {};

    constructor(private fileContent: Array<string>, private i: number = 0) { }

    number(name: string) {
        this.obj[name] = parseFloat(this.fileContent[this.i]);
        this.i++;
        return this;
    }

    /**
     * @param names 
     * @example .numbers('x')
     * @example .numbers('x y')
     */
    numbers(names: string, splitBy = ' ') {
        let variables = names.split(splitBy);
        let values = this.fileContent[this.i].split(splitBy).map(x => parseFloat(x));
        for (let i = 0; i < variables.length; i++)
            this.obj[variables[i]] = values[i];

        this.i++;
        return this;
    }

    skip(length: number | string = 1) {
        const n = typeof length === 'number' ? length : this.obj[length];
        this.i += n;
        return this
    }

    string(name: string) {
        this.obj[name] = this.fileContent[this.i];
        this.i++;
        return this;
    }

    array(name: string, splitBy = '', mapFunc?: (x: string) => any) {
        if (!mapFunc)
            mapFunc = (x) => x

        this.obj[name] = this.fileContent[this.i].split(splitBy).map(mapFunc);
        this.i++;
        return this;
    }

    lines(name: string, length: number | string, mapFunc?: (line: string) => any) {
        if (!mapFunc)
            mapFunc = (x) => x
        const n = typeof length === 'number' ? length : this.obj[length];
        const arr = [];

        for (let i = 0; i < n; i++)
            arr.push(mapFunc(this.fileContent[this.i + i]))

        this.obj[name] = arr;
        this.i += n;
        return this
    }

    matrix(name: string, length: number | string, splitBy = '', mapFunc?: (line: string) => any) {
        if (!mapFunc)
            mapFunc = (x) => x
        const n = typeof length === 'number' ? length : this.obj[length];
        const arr = [];

        for (let i = 0; i < n; i++)
            arr.push(this.fileContent[this.i + i].split(splitBy).map(mapFunc))

        this.obj[name] = arr;
        this.i += n;
        return this
    }

    arrayOfObject(name: string, length: number | string, p: (P: Parser) => any) {

        const n = typeof length === 'number' ? length : this.obj[length];
        const arr = [];

        for (let i = 0; i < n; i++) {
            const obj = p(new Parser(this.fileContent, this.i)).build();
            arr.push(obj)
            this.i += Object.keys(obj).length - 1;
        }

        this.obj[name] = arr;
        return this
    }

    build<T>(): T {
        return this.obj as T;
    }
}