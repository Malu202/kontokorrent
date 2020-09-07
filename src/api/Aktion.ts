import { Bezahlung } from "./Bezahlung";

export interface Aktion {
    laufendeNummer: number;
    bezahlung: Bezahlung;
    bearbeiteteBezahlungId: string;
    geloeschteBezahlungId: string;
}
