export interface AccountState {
    accountCreated: boolean,
    accountCreating: boolean,
    accountCreationFailed: boolean
    loginExpired : boolean;
}

export interface KontokorrentsState {
    kontokorrents: { [id: string]: KontokorrentState };
    hinzufuegen: boolean;
    hinzufuegenFailed: {
        kontokorrentNotFound: boolean
    }
    creating: boolean;
    creationFailed: { exists: boolean };
}

export interface KontokorrentState {
    id: string;
    name: string;
}

export interface State {
    account: AccountState
    kontokorrents: KontokorrentsState;
}
