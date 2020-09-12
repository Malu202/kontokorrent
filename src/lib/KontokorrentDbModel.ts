import { DBSchema } from "idb";

export interface KontokorrentDbModel {
    name: string;
    id: string;
    laufendeNummer: number;
    oeffentlicherName:string;
    personen : {name:string, id:string}[]
}

