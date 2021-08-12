import { AccountInfo } from "../lib/AccountInfo";
import { BearbeitungsStatus } from "../lib/BearbeitungsStatus";

export interface AccountState {
    accountCreated: boolean,
    accountCreating: boolean,
    accountCreationFailed: boolean
    loginExpired: boolean;
    accountInfo: AccountInfo
}

export interface KontokorrentsState {
    kontokorrents: { [id: string]: KontokorrentState };
    hinzufuegen: boolean;
    listeLaden: boolean;
    hinzufuegenFailed: {
        kontokorrentNotFound: boolean
    }
    creating: boolean;
    creationFailed: { exists: boolean };
    activeKontokorrentId: string;
}

export interface Person {
    name: string;
    id: string;
    balance: number;
}

export enum BezahlungStatus {
    Zwischengespeichert = "zwischengespeichert",
    Speichern = "speichern",
    Gespeichert = "gespeichert"
}

export interface Bezahlung {
    id: string;
    zeitpunkt: Date;
    bezahlendePersonId: string;
    empfaengerIds: string[];
    wert: number;
    beschreibung: string;
    status: BezahlungStatus
}

export const enum RequestStatus {
    InProgress,
    Success,
    Failed
}

export interface AngezeigteBezahlungState {
    bearbeitungsStatus: BearbeitungsStatus;
    updateStatus?: RequestStatus;
    deleteStatus?: RequestStatus;
}

export interface KontokorrentState {
    id: string;
    name: string;
    oeffentlicherName:string;
    personen: Person[];
    bezahlungen: Bezahlung[];
    synchronisieren: boolean;
    bezahlungAnlegen: RequestStatus;
    angezeigteBezahlung: { [id: string]: AngezeigteBezahlungState }
}

export interface BeschreibungVorschlagState {
    kontokorrentId: string;
    vorschlaege: string[];
}

export interface State {
    account: AccountState
    kontokorrents: KontokorrentsState;
    beschreibungVorschlaege: BeschreibungVorschlagState;
}
