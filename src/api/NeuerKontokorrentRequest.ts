export interface NeuerKontokorrentRequest {
    id: string;
    name: string;
    oeffentlicherName: string;
    personen: { name: string; id: string }[];
}
