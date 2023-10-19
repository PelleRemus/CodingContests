# CaroShark

### Map the in files
```ts
const caroshark = new Caroshark({ level: 2 });

Caroshark.inFilesMap = (str: string): LevelData => {
    return (new Parser(str.split("\n").map((x) => x.trim())))
        .number("n")
        .numbers("a b")
        .numbers("m")
        .string("path")
        .lines("commands", 'n', (line: string) => line.split(' '))
        .build(); 
}
```

### New level steps
1. duplica folderul `levels/levelTemplate`
2. renumeste in `levelN` ex. level1, level2 ...
3. Pune fisiere .in in `levelN/in/`
4. Actualizeaza variabila level in `src/index.tsx`

## Run types

### Example
Citesteste si scrie(consola) doar fisierul de test. Live update
```
npm run ex
```
### Dev
Citesteste si scrie(consola) doar fisierul de in. Live update 
```
npm run dev
```
### SOLUTION
Citesteste si scrie(fisiere) doar fisierul de in. Executa doar odata
```
npm run sol
```