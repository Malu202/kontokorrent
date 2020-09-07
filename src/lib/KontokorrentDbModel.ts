import { DBSchema } from "idb";

export interface KontokorrentDbModel {
    name: string;
    id: string;
    laufendeNummer: number;
    personen : {name:string, id:string}[]
}