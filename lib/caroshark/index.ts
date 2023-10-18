import { Level } from './Level';
export enum RunTypes {

  // Citesteste si scrie(consola) doar fisierul de test. Live update
  EXAMPLE = "example",

  // Citesteste si scrie(consola) doar fisierul de in. Live update 
  DEV = "dev",

  // Citesteste si scrie(fisiere) doar fisierul de in. Executa doar odata
  SOLUTION = "solution"
}
export {
  Level
};