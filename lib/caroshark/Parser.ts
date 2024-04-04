type NamesToKeys<S extends string, Sep extends string> = S extends `${infer First}${Sep}${infer Rest}`
    ? First | NamesToKeys<Rest, Sep>
    : S;

export class Parser<T extends Record<string, unknown> = {}> {
    constructor(readonly obj: T, private fileContent: Array<string>, private i: number = 0) { }

    static create(fileContent: Array<string>, i: number = 0): Parser {
        return new Parser({}, fileContent, i);
    }

    number<K extends string>(name: K): Parser<T & { [k in K]: number }> {
        const nextPart = { [name]: parseFloat(this.fileContent[this.i]) } as { [k in K]: number };

        return new Parser({ ...this.obj, ...nextPart }, this.fileContent, this.i + 1);
    }

    /**
     * @param names 
     * @example .numbers('x')
     * @example .numbers('x y')
     */
    numbers<K extends string, Sep extends string>(names: K, splitBy: Sep = ' ' as Sep): Parser<T & { [q in NamesToKeys<typeof names, string extends Sep ? ' ' : Sep>]: number }> {
        let nextPart = {} as any;

        let variables = names.split(splitBy);
        let values = this.fileContent[this.i].split(splitBy).map(x => parseFloat(x));
        for (let i = 0; i < variables.length; i++)
            nextPart[String(variables[i])] = values[i];

        return new Parser({ ...this.obj, ...nextPart }, this.fileContent, this.i + 1);
    }

    skip(length: number | string = 1) {
        const n = typeof length === 'number' ? length : (this.obj[length] as number);
        return new Parser(this.obj, this.fileContent, this.i + n);
    }

    string<K extends string>(name: K): Parser<T & { [k in K]: string }> {
        const nextPart = { [name]: this.fileContent[this.i] } as { [k in K]: string };

        return new Parser({ ...this.obj, ...nextPart }, this.fileContent, this.i + 1);
    }

    array<K extends string, V>(name: K, splitBy = '', mapFunc?: (x: string) => V extends unknown ? string : V): Parser<T & { [k in K]: Array<ReturnType<typeof mapFunc>> }> {
        if (!mapFunc)
            mapFunc = (x) => x as V extends unknown ? string : V

        const nextPart = {
            [name]: this.fileContent[this.i].split(splitBy).map(mapFunc)
        } as { [k in K]: Array<ReturnType<typeof mapFunc>> };

        return new Parser({ ...this.obj, ...nextPart }, this.fileContent, this.i + 1);
    }

    lines<K extends string, V>(name: K, length: number | string, mapFunc?: (line: string) => V extends unknown ? string : V): Parser<T & { [k in K]: Array<ReturnType<typeof mapFunc>> }> {
        if (!mapFunc)
            mapFunc = (x) => x as V extends unknown ? string : V

        const n = typeof length === 'number' ? length : (this.obj[length] as number);
        const arr = [];

        for (let i = 0; i < n; i++)
            arr.push(mapFunc(this.fileContent[this.i + i]))

        const nextPart = {
            [name]: arr
        } as { [k in K]: Array<ReturnType<typeof mapFunc>> };

        return new Parser({ ...this.obj, ...nextPart }, this.fileContent, this.i + n);
    }

    matrix<K extends string, V>(name: K, length: number | string, splitBy = '', mapFunc?: (line: string) => V extends unknown ? string : V): Parser<T & { [k in K]: Array<Array<ReturnType<typeof mapFunc>>> }> {
        if (!mapFunc)
            mapFunc = (x) => x as V extends unknown ? string : V

        const n = typeof length === 'number' ? length : (this.obj[length] as number);
        const arr: Array<Array<any>> = [];

        console.log({ n, arr, fileContent: this.fileContent.length })

        for (let i = 0; i < n; i++)
            arr.push(this.fileContent[this.i + i].split(splitBy).map(mapFunc))


        const nextPart = {
            [name]: arr
        } as { [k in K]: Array<Array<ReturnType<typeof mapFunc>>> };

        return new Parser({ ...this.obj, ...nextPart }, this.fileContent, this.i + n);
    }

    arrayOfObject<K extends string, V extends Parser>(name: K, length: number | string, p: (P: Parser) => V): Parser<T & { [k in K]: Array<ReturnType<typeof p>['obj']> }> {

        const n = typeof length === 'number' ? length : this.obj[length] as number;
        const arr = [];

        for (let i = 0; i < n; i++) {
            const obj = p(Parser.create(this.fileContent, this.i)).build();
            arr.push(obj)
            this.i += Object.keys(obj).length - 1;
        }
        const nextPart = {
            [name]: arr
        } as { [k in K]: Array<Array<ReturnType<typeof p>['obj']>> };

        return new Parser({ ...this.obj, ...nextPart }, this.fileContent, this.i);
    }

    build(): T {
        return this.obj;
    }
}