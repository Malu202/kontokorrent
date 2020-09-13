import { BezahlungDbModel } from "./BezahlungDbModel";

export interface AktionDbModel {
    laufendeNummer: number;
    bezahlung: BezahlungDbModel;
    bearbeiteteBezahlungId: string;
    geloeschteBezahlungId: string;
    kontokorrentId: string;
}
