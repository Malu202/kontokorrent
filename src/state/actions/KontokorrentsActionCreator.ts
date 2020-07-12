import { Store } from "../Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { KontokorrentListenEintrag } from "../../api/KontokorrentListenEintrag";
import { NeuerKontokorrentRequest } from "../../api/NeuerKontokorrentRequest";


export enum KontokorrentsActionNames {
    KontokorrentCreating = "KontokorrentCreating",
    KontokorrentCreated = "KontokorrentCreated",
    KontokorrentCreationFailed = "KontokorrentCreationFailed",
    KontokorrentHinzufuegenFailed = "KontokorrentHinzufuegenFailed",
    KontokorrentHinzufuegen = "KontokorrentHinzufuegen",
    KontokorrentHinzufuegenSuccess = "KontokorrentHinzufuegenSuccess"
}

export class KontokorrentCreationFailed implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentCreationFailed;
    constructor(public exists: boolean) {

    }
}

export class KontokorrentCreating implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentCreating;
    constructor() {

    }
}

export class KontokorrentCreated implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentCreated;
    constructor(public id: string, public name: string) {

    }
}

export class KontokorrentHinzufuegenFailed implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentHinzufuegenFailed;
    constructor(public notFound: boolean) {

    }
}

export class KontokorrentHinzufuegen implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentHinzufuegen;
    constructor() {

    }
}

export class KontokorrentHinzufuegenSuccess implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentHinzufuegenSuccess;
    constructor(public kontokorrents: KontokorrentListenEintrag[]) {

    }
}

export type KontokorrentsActions = KontokorrentCreationFailed
    | KontokorrentCreating
    | KontokorrentCreated
    | KontokorrentHinzufuegenFailed
    | KontokorrentHinzufuegen
    | KontokorrentHinzufuegenSuccess;

export class KontokorrentsActionCreator {
    constructor(private store: Store,
        private apiClient: ApiClient) {

    }

    async kontokorrentErstellen(id: string, name: string, oeffentlicherName: string, personen: string[]) {
        let request: NeuerKontokorrentRequest = {
            name,
            id,
            oeffentlicherName,
            personen: personen.map(v => { return { name: v } })
        };
        this.store.dispatch(new KontokorrentCreating());
        let res = await this.apiClient.neuerKontokorrent(request);
        if (!res.success) {
            this.store.dispatch(new KontokorrentCreationFailed(res.exists));
        }
        else {
            this.store.dispatch(new KontokorrentCreated(id, name));
            return true;
        }
        return false;
    }

    async kontokorrentHinzufuegen(oeffentlicherName: string) {
        this.store.dispatch(new KontokorrentHinzufuegen());
        try {
            let res = await this.apiClient.kontokorrentHinzufuegen(oeffentlicherName, null);
            if (null == res) {
                this.store.dispatch(new KontokorrentHinzufuegenFailed(true));
            }
            else {
                this.store.dispatch(new KontokorrentHinzufuegenSuccess(res));
                return true;
            }
        }
        catch {
            this.store.dispatch(new KontokorrentHinzufuegenFailed(false));
        }
        return false;
    }
}
