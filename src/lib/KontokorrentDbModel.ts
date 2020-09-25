import { DBSchema } from "idb";

export interface KontokorrentDbModel {
    name: string;
    id: string;
    oeffentlicherName:string;
    personen : {name:string, id:string}[]
}

