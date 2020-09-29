import { Store } from "../Store";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { ServiceLocator } from "../../ServiceLocator";
import { Action } from "../lib/Action";
import { ActionNames } from "./ActionNames";

export class BezahlungKontokorrentGeandert implements Action {
    readonly type = ActionNames.BezahlungKontokorrentGeandert;
    constructor(public kontokorrentId: string) {
    }
}

export type BezahlungActions = BezahlungKontokorrentGeandert;

export class BezahlungActionCreator {
    large: string;


    static locate(serviceLocator: ServiceLocator) {
        return new BezahlungActionCreator(serviceLocator.store,
            serviceLocator.db);
    }
    constructor(private store: Store,
        private db: KontokorrentDatabase) {
    }

    async bezahlungEintragenGeoeffnet() {
        let id = this.store.state.kontokorrents.activeKontokorrentId || await this.db.getZuletztGesehenerKontokorrentId();
        this.store.dispatch(new BezahlungKontokorrentGeandert(id));
    }

    async bezahlungEintragenKontokorrentChanged(id: string) {
        this.store.dispatch(new BezahlungKontokorrentGeandert(id));
        await this.db.setZuletztGesehenerKontokorrentId(id);
    }
}
