import { Store } from "../Store";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { ServiceLocator } from "../../ServiceLocator";
import { Action } from "../lib/Action";
import { ActionNames } from "./ActionNames";
import { NeueBezahlungBackgroundSyncTag } from "../../sw.constants";
import { NeueBezahlungService, neueBezahlungServiceFactory } from "../../lib/NeueBezahlungService";
import { NeueBezahlungRequest } from "../../api/NeueBezahlungRequest";
import { v4 as uuid } from "uuid";
import { NeueBezahlungDbModel } from "../../lib/NeueBezahlungDbModel";
import { Bezahlung, BezahlungStatus } from "../State";

export class BezahlungKontokorrentGeandert implements Action {
    readonly type = ActionNames.BezahlungKontokorrentGeandert;
    constructor(public kontokorrentId: string) {
    }
}

export class NeueBezahlungAnlegen implements Action {
    readonly type = ActionNames.NeueBezahlungAnlegen;
    constructor(public kontokorrentId: string) {
    }
}

export class NeueBezahlungAngelegt implements Action {
    readonly type = ActionNames.NeueBezahlungAngelegt;
    constructor(public kontokorrentId: string, public bezahlung: Bezahlung) {
    }
}

export class NeueBezahlungAnlegenFailed implements Action {
    readonly type = ActionNames.NeueBezahlungAnlegenFailed;
    constructor(public kontokorrentId: string) {
    }
}

export type BezahlungActions = BezahlungKontokorrentGeandert
    | NeueBezahlungAnlegenFailed
    | NeueBezahlungAnlegen
    | NeueBezahlungAngelegt;

export class BezahlungActionCreator {
    constructor(private store: Store,
        private db: KontokorrentDatabase,
        private neueBezahlungService: NeueBezahlungService) {
    }

    async bezahlungEintragenGeoeffnet() {
        let id = this.store.state.kontokorrents.activeKontokorrentId || await this.db.getZuletztGesehenerKontokorrentId();
        this.store.dispatch(new BezahlungKontokorrentGeandert(id));
    }

    async bezahlungEintragenKontokorrentChanged(id: string) {
        this.store.dispatch(new BezahlungKontokorrentGeandert(id));
        await this.db.setZuletztGesehenerKontokorrentId(id);
    }

    async bezahlungHinzufuegen(kontokorrentId: string, bezahlung: { betreff: string, betrag: number, datum: Date, bezahlendePerson: string, empfaenger: string[] }) {
        let direct = false;
        let id = uuid();
        let request: NeueBezahlungRequest = {
            beschreibung: bezahlung.betreff,
            bezahlendePersonId: bezahlung.bezahlendePerson,
            empfaengerIds: bezahlung.empfaenger,
            id: id,
            wert: bezahlung.betrag,
            zeitpunkt: bezahlung.datum
        };
        if ("serviceWorker" in navigator && "SyncManager" in window && false) {
            let reg = await navigator.serviceWorker.ready;
            try {
                let zwischengespeichert: NeueBezahlungDbModel = {
                    beschreibung: bezahlung.betreff,
                    bezahlendePersonId: bezahlung.bezahlendePerson,
                    empfaengerIds: bezahlung.empfaenger,
                    id: id,
                    wert: bezahlung.betrag,
                    zeitpunkt: bezahlung.datum,
                    kontokorrentId: kontokorrentId
                }
                await this.db.bezahlungZwischenspeichern(zwischengespeichert);
                await reg.sync.register(NeueBezahlungBackgroundSyncTag);
            } catch {
                console.warn("background sync not allowed");
                await this.db.zwischengespeicherteBezahlungErledigt(id);
                direct = true;
            }
        } else {
            console.log("background sync not supported");
            direct = true;
        }
        if (direct) {
            this.store.dispatch(new NeueBezahlungAnlegen(kontokorrentId));
            try {
                let aktion = await this.neueBezahlungService.bezahlungAnlegen(kontokorrentId, request);
                this.store.dispatch(new NeueBezahlungAngelegt(kontokorrentId, {
                    beschreibung: aktion.bezahlung.beschreibung,
                    bezahlendePersonId: aktion.bezahlung.bezahlendePersonId,
                    empfaengerIds: aktion.bezahlung.empfaengerIds,
                    id: aktion.bezahlung.id,
                    wert: aktion.bezahlung.wert,
                    zeitpunkt: aktion.bezahlung.zeitpunkt,
                    status: BezahlungStatus.Gespeichert
                }));
            }
            catch (err) {
                console.error(err);
                this.store.dispatch(new NeueBezahlungAnlegenFailed(kontokorrentId));
                throw err;
            }
        }
    }
}

export function bezahlungActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("BezahlungActionCreator",
        serviceLocator => new BezahlungActionCreator(serviceLocator.store,
            serviceLocator.db,
            neueBezahlungServiceFactory(serviceLocator)));
}
