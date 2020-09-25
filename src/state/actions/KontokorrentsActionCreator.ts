import { Store } from "../Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";
import { NeuerKontokorrentRequest } from "../../api/NeuerKontokorrentRequest";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { InteractionRequiredException } from "../../api/InteractionRequiredException";
import { RoutingActionCreator } from "./RoutingActionCreator";
import { v4 as uuid } from "uuid";
import { Bezahlung } from "../State";
type KontokorrentWorkerApi = import("../../worker/KontokorrentWorker").KontokorrentWorkerApi;
import { wrap } from "comlink";
import { filterBezahlungen } from "../../lib/filterBezahlungen";
import { KontokorrentBalance } from "../../lib/KontokorrentBalance";


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
    KontokorrentGeoeffnet = "KontokorrentGeoeffnet",
    KontokorrentBezahlungen = "KontokorrentBezahlungen",
    KontokorrentSynchronisieren = "KontokorrentSynchronisieren",
    KontokorrentSynchronisiert = "KontokorrentSynchronisiert",
    KontokorrentBalanceAktualisiert = "KontokorrentBalanceAktualisiert",
    LoginPageGeoeffnet = "LoginPageGeoeffnet"
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
    constructor(public kontokorrent: KontokorrentInfo) {

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

export class KontokorrentBezahlungen implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentBezahlungen;
    constructor(public kontokorrentId: string, public bezahlungen: Bezahlung[]) {

    }
}

export class KontokorrentSynchronisieren implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentSynchronisieren;
    constructor(public kontokorrentId: string) {

    }
}

export class KontokorrentSynchronisiert implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentSynchronisiert;
    constructor(public kontokorrentId: string) {

    }
}

export class KontokorrentBalanceAktualisiert implements Action {
    readonly type = KontokorrentsActionNames.KontokorrentBalanceAktualisiert;
    constructor(public kontokorrentId: string, public balance: KontokorrentBalance) {

    }
}

export class LoginPageGeoeffnet implements Action {
    readonly type = KontokorrentsActionNames.LoginPageGeoeffnet;
    constructor() {

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
    | KontokorrentGeoeffnet
    | KontokorrentBezahlungen
    | KontokorrentSynchronisieren
    | KontokorrentSynchronisiert
    | KontokorrentBalanceAktualisiert
    | LoginPageGeoeffnet;

export class KontokorrentsActionCreator {
    private workerApi: KontokorrentWorkerApi;
    constructor(private store: Store,
        private apiClient: ApiClient,
        private routingActionCreator: RoutingActionCreator,
        private db: KontokorrentDatabase) {

    }

    loginPageGeoeffnet() {
        this.store.dispatch(new LoginPageGeoeffnet());
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
            await this.db.addKontokorrent({
                id: id,
                name: name,
                personen: request.personen,
                oeffentlicherName: oeffentlicherName
            });
            this.store.dispatch(new KontokorrentCreated({
                id: id,
                name: name,
                personen: request.personen,
                oeffentlicherName: oeffentlicherName
            }));
            return true;
        }
        return false;
    }

    async kontokorrentHinzufuegen(oeffentlicherName: string) {
        let kk = await this.db.getPerOeffentlichName(oeffentlicherName);
        if (null != kk) {
            return kk.id;
        }
        this.store.dispatch(new KontokorrentHinzufuegen());
        try {
            let res = await this.apiClient.kontokorrentHinzufuegen(oeffentlicherName, null);
            if (null == res) {
                this.store.dispatch(new KontokorrentHinzufuegenFailed(true));
            }
            else {
                let newIds = await this.db.setKontokorrents(res.map(v => {
                    return {
                        id: v.id,
                        name: v.name,
                        personen: v.personen,
                        oeffentlicherName: v.oeffentlicherName
                    };
                }));
                this.store.dispatch(new KontokorrentHinzufuegenSuccess(res));
                return newIds[0];
            }
        }
        catch {
            this.store.dispatch(new KontokorrentHinzufuegenFailed(false));
        }
        return false;
    }

    async navigiereZuLetztGesehenem(redirect?: boolean) {
        let id = await this.db.getZuletztGesehenerKontokorrentId();
        if (id) {
            this.routingActionCreator.navigateKontokorrent(id, redirect);
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
                    name: e.name,
                    personen: e.personen,
                    oeffentlicherName: e.oeffentlicherName
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

    private async refreshBezahlungen(id: string) {
        let aktionen = await this.db.getAktionen(id);
        this.store.dispatch(new KontokorrentBezahlungen(id, filterBezahlungen(aktionen)));
    }

    private async calculateBalance(id: string) {
        let balance = await (await this.getWorkerApi()).calculateBalance(id);
        this.store.dispatch(new KontokorrentBalanceAktualisiert(id, balance));
    }

    private async refreshKontokorrent(id: string) {
        await Promise.all([this.refreshBezahlungen(id), this.calculateBalance(id)]);
    }

    private async kontokorrentSynchronisieren(id: string) {
        this.store.dispatch(new KontokorrentSynchronisieren(id));
        let laufendeNummer = await (await this.getWorkerApi()).getLaufendeNummer(id);
        let res = await this.apiClient.getAktionen(id, laufendeNummer);
        if (res.success) {
            await this.db.addAktionen(id, res.aktionen);
            if (res.aktionen.length > 0) {
                await this.refreshKontokorrent(id);
            }
        }
        this.store.dispatch(new KontokorrentSynchronisiert(id));
    }

    private async getWorkerApi() {
        if (this.workerApi) {
            return this.workerApi;
        }
        const worker = new Worker(
            "../../worker/KontokorrentWorker",
            { name: 'kontokorrent-worker', type: "module" },
        ) as Worker;
        this.workerApi = wrap<KontokorrentWorkerApi>(worker);
        return this.workerApi;
    }



    async kontokorrentOeffnen(id: string) {
        let kk = await this.db.getKontokorrent(id);
        if (null != kk) {
            this.store.dispatch(new KontokorrentGeoeffnet(id));
            let tasks = [];
            tasks.push(this.db.setZuletztGesehenerKontokorrentId(id));
            tasks.push(this.refreshKontokorrent(id));
            tasks.push(this.kontokorrentSynchronisieren(id));
            await Promise.all(tasks);
        }
    }
}
