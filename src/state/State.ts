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

export interface KontokorrentState {
    id: string;
    name: string;
}

export interface State {
    account: AccountState
    kontokorrents: KontokorrentsState;
}
