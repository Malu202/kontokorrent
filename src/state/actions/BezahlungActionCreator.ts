import { Store } from "../Store";
import { Action } from "../lib/Action";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";


export enum BezahlungActionNames {
    BezahlungKontokorrentGeandert = "BezahlungKontokorrentGeandert"
}

export class BezahlungKontokorrentGeandert implements Action {
    readonly type = BezahlungActionNames.BezahlungKontokorrentGeandert;
    constructor(public kontokorrentId: string) {

    }
}

export type BezahlungActions = BezahlungKontokorrentGeandert
    ;

export class BezahlungActionCreator {

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
