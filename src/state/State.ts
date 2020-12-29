import { AccountInfo } from "../lib/AccountInfo";

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

export const enum BezahlungAnlegenStatus {
    Anlegen,
    Angelegt,
    Failed
}

export interface KontokorrentState {
    id: string;
    name: string;
    personen: Person[];
    bezahlungen: Bezahlung[];
    synchronisieren: boolean;
    bezahlungAnlegen: BezahlungAnlegenStatus;
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
