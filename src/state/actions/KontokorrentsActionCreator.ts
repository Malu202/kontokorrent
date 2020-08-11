import { Store } from "../Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { KontokorrentListenEintrag } from "../../api/KontokorrentListenEintrag";
import { NeuerKontokorrentRequest } from "../../api/NeuerKontokorrentRequest";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { InteractionRequiredException } from "../../api/InteractionRequiredException";
import { RoutingActionCreator } from "./RoutingActionCreator";


export enum KontokorrentsActionNames {
    KontokorrentCreating = "KontokorrentCreating",
    KontokorrentCreated = "KontokorrentCreated",
    KontokorrentCreationFailed = "KontokorrentCreationFailed",
    KontokorrentHinzufuegenFailed = "KontokorrentHinzufuegenFailed",
    KontokorrentHinzufuegen = "KontokorrentHinzufuegen",
    KontokorrentHinzufuegenSuccess = "KontokorrentHinzufuegenSuccess",
    KontokorrentListeLaden = "KontokorrentListeLaden",
    KontokorrentListe = "KontokorrentListe",
    KontokorrentListeLadenFailed = "KontokorrentListeLadenFailed"
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

export class KontokorrentListeLaden implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentListeLaden;
    constructor() {

    }
}

export class KontokorrentListe implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentListe;
    constructor(public kontokorrents: KontokorrentListenEintrag[]) {

    }
}

export class KontokorrentListeLadenFailed implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentListeLadenFailed;
    constructor(public interactionRequired: boolean) {

    }
}


export type KontokorrentsActions = KontokorrentCreationFailed
    | KontokorrentCreating
    | KontokorrentCreated
    | KontokorrentHinzufuegenFailed
    | KontokorrentHinzufuegen
    | KontokorrentHinzufuegenSuccess
    | KontokorrentListeLaden
    | KontokorrentListeLadenFailed
    | KontokorrentListe;

export class KontokorrentsActionCreator {
    constructor(private store: Store,
        private apiClient: ApiClient,
        private routingActionCreator: RoutingActionCreator) {

    }

    async kontokorrentErstellen(id: string, name: string, oeffentlicherName: string, personen: string[]) {
        let request: NeuerKontokorrentRequest = {
            name,
            id,
            oeffentlicherName,
            personen: personen.map(v => { return { name: v } })
        };
        let db = new KontokorrentDatabase();
        await db.initialize();
        this.store.dispatch(new KontokorrentCreating());
        try {
            let res = await this.apiClient.neuerKontokorrent(request);
            if (!res.success) {
                this.store.dispatch(new KontokorrentCreationFailed(res.exists));
            }
            else {
                await db.addKontokorrent({ id: id, name: name });
                this.store.dispatch(new KontokorrentCreated(id, name));
                return true;
            }
        }
        finally {
            db.close();
        }
        return false;
    }

    async kontokorrentHinzufuegen(oeffentlicherName: string) {
        this.store.dispatch(new KontokorrentHinzufuegen());
        let db = new KontokorrentDatabase();
        await db.initialize();
        try {
            let res = await this.apiClient.kontokorrentHinzufuegen(oeffentlicherName, null);
            if (null == res) {
                this.store.dispatch(new KontokorrentHinzufuegenFailed(true));
            }
            else {
                await db.setKontokorrents(res);
                this.store.dispatch(new KontokorrentHinzufuegenSuccess(res));
                return true;
            }
        }
        catch {
            this.store.dispatch(new KontokorrentHinzufuegenFailed(false));
        }
        db.close();
        return false;
    }

    async navigiereZuLetztGesehenem() {
        const db = new KontokorrentDatabase();
        await db.initialize();
        let id = await db.getZuletztGesehenerKontokorrentId();
        db.close();
        if (id) {
            this.routingActionCreator.navigateKontokorrent(id);
            return true;
        }
        return false;
    }

    async syncKontokorrentListe() {
        this.store.dispatch(new KontokorrentListeLaden());
        const db = new KontokorrentDatabase();
        const listenTask = this.apiClient.kontokorrentsAuflisten();

        await db.initialize();
        let kontokorrents = await db.getKontokorrents();
        this.store.dispatch(new KontokorrentListe(kontokorrents));
        try {
            let liste = await listenTask;
            await db.setKontokorrents(liste);
            this.store.dispatch(new KontokorrentListe(liste));
        }
        catch (e) {
            if (e instanceof InteractionRequiredException) {
                this.store.dispatch(new KontokorrentListeLadenFailed(true));
            }
            else {
                this.store.dispatch(new KontokorrentListeLadenFailed(false));
            }
        }
        db.close();
    }
}
