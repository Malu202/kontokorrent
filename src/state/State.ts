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

export interface Bezahlung {
    id: string;
    zeitpunkt: Date;
    bezahlendePersonId: string;
    empfaengerIds: string[];
    wert: number;
    beschreibung: string;
}

export interface KontokorrentState {
    id: string;
    name: string;
    personen: Person[];
    bezahlungen: Bezahlung[];
    synchronisieren: boolean;
}

export interface State {
    account: AccountState
    kontokorrents: KontokorrentsState;
}
