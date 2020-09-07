import { Store } from "../Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";
import { NeuerKontokorrentRequest } from "../../api/NeuerKontokorrentRequest";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { InteractionRequiredException } from "../../api/InteractionRequiredException";
import { RoutingActionCreator } from "./RoutingActionCreator";
import { v4 as uuid } from "uuid";

export enum KontokorrentsActionNames {
    KontokorrentCreating = "KontokorrentCreating",
    KontokorrentCreated = "KontokorrentCreated",
    KontokorrentCreationFailed = "KontokorrentCreationFailed",
    KontokorrentHinzufuegenFailed = "KontokorrentHinzufuegenFailed",
    KontokorrentHinzufuegen = "KontokorrentHinzufuegen",
    KontokorrentHinzufuegenSuccess = "KontokorrentHinzufuegenSuccess",
    KontokorrentListeLaden = "KontokorrentListeLaden",
    KontokorrentListe = "KontokorrentListe",
    KontokorrentListeLadenFailed = "KontokorrentListeLadenFailed",
    KontokorrentGeoeffnet = "KontokorrentGeoeffnet"
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
    constructor(public kontokorrents: KontokorrentInfo[]) {

    }
}

export class KontokorrentListeLaden implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentListeLaden;
    constructor() {

    }
}

export class KontokorrentListe implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentListe;
    constructor(public kontokorrents: KontokorrentInfo[]) {

    }
}

export class KontokorrentListeLadenFailed implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentListeLadenFailed;
    constructor(public interactionRequired: boolean) {

    }
}

export class KontokorrentGeoeffnet implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentGeoeffnet;
    constructor(public id: string) {

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
    | KontokorrentListe
    | KontokorrentGeoeffnet;

export class KontokorrentsActionCreator {
    constructor(private store: Store,
        private apiClient: ApiClient,
        private routingActionCreator: RoutingActionCreator,
        private db: KontokorrentDatabase) {

    }

    async kontokorrentErstellen(id: string, name: string, oeffentlicherName: string, personen: string[]) {
        let request: NeuerKontokorrentRequest = {
            name,
            id,
            oeffentlicherName,
            personen: personen.map(v => { return { name: v, id: uuid() } })
        };
        this.store.dispatch(new KontokorrentCreating());
        let res = await this.apiClient.neuerKontokorrent(request);
        if (!res.success) {
            this.store.dispatch(new KontokorrentCreationFailed(res.exists));
        }
        else {
            await this.db.addKontokorrent({ id: id, name: name, laufendeNummer: 0, personen: request.personen });
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
                await this.db.setKontokorrents(res.map(v => {
                    return {
                        id: v.id,
                        laufendeNummer: null,
                        name: v.name,
                        personen: v.personen
                    };
                }));
                this.store.dispatch(new KontokorrentHinzufuegenSuccess(res));
                return true;
            }
        }
        catch {
            this.store.dispatch(new KontokorrentHinzufuegenFailed(false));
        }
        return false;
    }

    async navigiereZuLetztGesehenem() {
        let id = await this.db.getZuletztGesehenerKontokorrentId();
        if (id) {
            this.routingActionCreator.navigateKontokorrent(id);
            return true;
        }
        return false;
    }

    async syncKontokorrentListe() {
        this.store.dispatch(new KontokorrentListeLaden());
        const listenTask = this.apiClient.kontokorrentsAuflisten();

        let kontokorrents = await this.db.getKontokorrents();
        this.store.dispatch(new KontokorrentListe(kontokorrents));
        try {
            let liste = await listenTask;
            await this.db.setKontokorrents(liste.map(e => {
                return {
                    id: e.id,
                    laufendeNummer: null,
                    name: e.name,
                    personen: e.personen
                }
            }));
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
    }

    async kontokorrentOeffnen(id: string) {
        let kk = await this.db.getKontokorrent(id);
        if (null != kk) {
            let tasks = [];
            this.store.dispatch(new KontokorrentGeoeffnet(id));
            tasks.push(this.db.setZuletztGesehenerKontokorrentId(id));
            let res = await this.apiClient.getAktionen(id, kk.laufendeNummer);
            if (res.success) {

            }
            await Promise.all(tasks);
        }
    }
}
