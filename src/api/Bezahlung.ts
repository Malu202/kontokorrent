export interface Bezahlung {
    id: string;
    zeitpunkt: string;
    bezahlendePersonId: string;
    empfaengerIds: string[];
    wert: number;
    beschreibung: string;
}
