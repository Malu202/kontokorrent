export interface NeueBezahlungDbModel {
    id: string;
    zeitpunkt: Date;
    bezahlendePersonId: string;
    empfaengerIds: string[];
    wert: number;
    beschreibung: string;
    kontokorrentId: string;
}
