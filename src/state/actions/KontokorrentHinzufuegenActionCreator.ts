import { ApiClient } from "../../api/ApiClient";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";
import { NeuerKontokorrentRequest } from "../../api/NeuerKontokorrentRequest";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { ServiceLocator } from "../../ServiceLocator";
import { Action } from "../lib/Action";
import { Store } from "../Store";
import { ActionNames } from "./ActionNames";
import { v4 as uuid } from "uuid";

export class KontokorrentCreationFailed implements Action {
    readonly type = ActionNames.KontokorrentCreationFailed;
    constructor(public exists: boolean) {

    }
}

export class KontokorrentCreating implements Action {
    readonly type = ActionNames.KontokorrentCreating;
    constructor() {

    }
}

export class KontokorrentCreated implements Action {
    readonly type = ActionNames.KontokorrentCreated;
    constructor(public kontokorrent: KontokorrentInfo) {

    }
}

export class KontokorrentHinzufuegenFailed implements Action {
    readonly type = ActionNames.KontokorrentHinzufuegenFailed;
    constructor(public notFound: boolean) {

    }
}

export class KontokorrentHinzufuegen implements Action {
    readonly type = ActionNames.KontokorrentHinzufuegen;
    constructor() {

    }
}

export class KontokorrentHinzufuegenSuccess implements Action {
    readonly type = ActionNames.KontokorrentHinzufuegenSuccess;
    constructor(public kontokorrents: KontokorrentInfo[]) {

    }
}

export class LoginPageGeoeffnet implements Action {
    readonly type = ActionNames.LoginPageGeoeffnet;
    constructor() {

    }
}

export class NichtGefundenPageGeoeffnet implements Action {
    readonly type = ActionNames.NichtGefundenPageGeoeffnet;
    constructor() {

    }
}

export type KontokorrentHinzufuegenActions = KontokorrentCreationFailed
    | KontokorrentCreating
    | KontokorrentCreated
    | KontokorrentHinzufuegenFailed
    | KontokorrentHinzufuegen
    | KontokorrentHinzufuegenSuccess
    | LoginPageGeoeffnet
    | NichtGefundenPageGeoeffnet;

export class KontokorrentHinzufuegenActionCreator {

    constructor(private store: Store,
        private apiClient: ApiClient,
        private db: KontokorrentDatabase) {

    }

    loginPageGeoeffnet() {
        this.store.dispatch(new LoginPageGeoeffnet());
    }

    nichtGefundenPageGeoeffnet() {
        this.store.dispatch(new NichtGefundenPageGeoeffnet());
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
        catch (err) {
            this.store.dispatch(new KontokorrentHinzufuegenFailed(false));
        }
        return false;
    }
}

export function kontokorrentHinzufuegenActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("KontokorrentHinzufuegenActionCreator",
        serviceLocator => new KontokorrentHinzufuegenActionCreator(
            serviceLocator.store,
            serviceLocator.apiClient,
            serviceLocator.db
        ));
}