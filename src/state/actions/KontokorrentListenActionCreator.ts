import { Store } from "../Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { KontokorrentInfo } from "../../api/KontokorrentInfo";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { InteractionRequiredException } from "../../api/InteractionRequiredException";
import { RoutingActionCreator, routingActionCreatorFactory } from "./RoutingActionCreator";
import { ServiceLocator } from "../../ServiceLocator";
import { ActionNames } from "./ActionNames";

export class KontokorrentListeLaden implements Action {
    readonly type = ActionNames.KontokorrentListeLaden;
    constructor() {

    }
}

export class KontokorrentListe implements Action {
    readonly type = ActionNames.KontokorrentListe;
    constructor(public kontokorrents: KontokorrentInfo[]) {

    }
}

export class KontokorrentListeLadenFailed implements Action {
    readonly type = ActionNames.KontokorrentListeLadenFailed;
    constructor(public interactionRequired: boolean) {

    }
}

export type KontokorrentListenActions =
    | KontokorrentListeLaden
    | KontokorrentListeLadenFailed
    | KontokorrentListe;

export class KontokorrentListenActionCreator {
    constructor(private store: Store,
        private apiClient: ApiClient,
        private routingActionCreator: RoutingActionCreator,
        private db: KontokorrentDatabase) {

    }

    async navigiereZuLetztGesehenem(replace?: boolean) {
        let id = await this.db.getZuletztGesehenerKontokorrentId();
        if (id) {
            await this.routingActionCreator.navigateKontokorrentById(id, replace);
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
}

export function kontokorrentListenActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("KontokorrentListenActionCreator",
        serviceLocator => new KontokorrentListenActionCreator(
            serviceLocator.store,
            serviceLocator.apiClient,
            routingActionCreatorFactory(serviceLocator),
            serviceLocator.db
        ));
}