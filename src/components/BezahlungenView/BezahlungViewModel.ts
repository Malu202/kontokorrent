import { BezahlungStatus } from "../../state/State";

export interface BezahlungViewModel {
    tag: number;
    woche:number;
    bezahlendePersonName: string;
    empfaenger: string;
    wert: number;
    beschreibung: string;
    status:BezahlungStatus;
    id:string;
}
