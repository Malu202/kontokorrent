
export interface BezahlungDbModel {
    id: string;
    zeitpunkt: Date;
    bezahlendePersonId: string;
    empfaengerIds: string[];
    wert: number;
    beschreibung: string;
}
