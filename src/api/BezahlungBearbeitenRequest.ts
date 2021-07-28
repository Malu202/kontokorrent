
export interface BezahlungBearbeitenRequest {
    id:string;
    empfaengerIds: string[];
    wert: number;
    beschreibung: string;
    zeitpunkt: Date;
    bezahlendePersonId:string;
}
