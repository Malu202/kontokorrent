
export interface NeueBezahlungRequest {
    id: string;
    empfaengerIds: string[];
    wert: number;
    beschreibung: string;
    zeitpunkt: Date;
    bezahlendePersonId: string;
}
