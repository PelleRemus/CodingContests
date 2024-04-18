import { Caroshark } from './Caroshark';
import { Parser } from './Parser';
import * as LevelExtractor from './LevelExtractor';
export enum RunTypes {

  // Citesteste si scrie(consola) doar fisierul de test. Live update
  EXAMPLE = "example",

  // Citesteste si scrie(consola) doar fisierul de in. Live update 
  DEV = "dev",

  // Citesteste si scrie(fisiere) doar fisierul de in. Executa doar odata
  SOLUTION = "solution"
}
export {
  Caroshark,
  Parser,
  LevelExtractor
};