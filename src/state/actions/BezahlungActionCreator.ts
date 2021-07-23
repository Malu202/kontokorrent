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
import { WorkerService, workerServiceFactory } from "../../lib/WorkerService";
import { BearbeitungsStatus } from "../../lib/BearbeitungsStatus";

export class BezahlungEintragenKontokorrentGeandert implements Action {
    readonly type = ActionNames.BezahlungEintragenKontokorrentGeandert;
    constructor(public kontokorrentId: string) {
    }
}

export class BezahlungGeoeffnet implements Action {
    readonly type = ActionNames.BezahlungGeoeffnet;
    constructor(public kontokorrentId: string, public bezahlungId: string,
        public bearbeitungsStatus: BearbeitungsStatus, public bezahlung: Bezahlung | null) {
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

export type BezahlungActions = BezahlungEintragenKontokorrentGeandert
    | NeueBezahlungAnlegenFailed
    | NeueBezahlungAnlegen
    | NeueBezahlungAngelegt
    | BezahlungGeoeffnet;

export interface NeueBezahlungModel {
    betreff: string, betrag: number, datum: Date, bezahlendePerson: string, empfaenger: string[]
}

export class BezahlungActionCreator {
    constructor(private store: Store,
        private db: KontokorrentDatabase,
        private neueBezahlungService: NeueBezahlungService,
        private workerService: WorkerService) {
    }


    async bezahlungGeoeffnet(kontokorrentId: string, bezahlungId: string) {
        let b = await this.db.getBearbeitungsStatus(kontokorrentId, bezahlungId);
        let bezahlung: Bezahlung = null;
        if (b.aktion) {
            let bezahlungAktion = b.aktion;
            bezahlung = {
                beschreibung: bezahlungAktion.bezahlung.beschreibung,
                bezahlendePersonId: bezahlungAktion.bezahlung.bezahlendePersonId,
                empfaengerIds: bezahlungAktion.bezahlung.empfaengerIds,
                id: bezahlungAktion.bezahlung.id,
                status: BezahlungStatus.Gespeichert,
                wert: bezahlungAktion.bezahlung.wert,
                zeitpunkt: bezahlungAktion.bezahlung.zeitpunkt
            };
        }
        this.store.dispatch(new BezahlungGeoeffnet(kontokorrentId, bezahlungId, b.status, bezahlung));
        await (await this.workerService.getWorker()).getBeschreibungVorschlaege(kontokorrentId, null);
    }

    async bezahlungEintragenGeoeffnet() {
        let id = this.store.state.kontokorrents.activeKontokorrentId || await this.db.getZuletztGesehenerKontokorrentId();
        this.store.dispatch(new BezahlungEintragenKontokorrentGeandert(id));
        await (await this.workerService.getWorker()).getBeschreibungVorschlaege(id, null);
    }

    async bezahlungEintragenKontokorrentChanged(id: string) {
        this.store.dispatch(new BezahlungEintragenKontokorrentGeandert(id));
        await this.db.setZuletztGesehenerKontokorrentId(id);
        await (await this.workerService.getWorker()).getBeschreibungVorschlaege(id, null);
    }

    async bezahlungHinzufuegen(kontokorrentId: string,
        bezahlung: NeueBezahlungModel) {
        let id = uuid();
        if (!(await this.bezahlungPerSyncHinzufuegen(kontokorrentId, id, bezahlung))) {
            await this.bezahlungDirektHinzufuegen(kontokorrentId, bezahlung, id);
        }
    }

    private async bezahlungPerSyncHinzufuegen(kontokorrentId: string,
        id: string,
        bezahlung: NeueBezahlungModel) {
        if ("serviceWorker" in navigator && "SyncManager" in window) {
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
                this.store.dispatch(new NeueBezahlungAngelegt(kontokorrentId, {
                    beschreibung: zwischengespeichert.beschreibung,
                    bezahlendePersonId: zwischengespeichert.bezahlendePersonId,
                    empfaengerIds: zwischengespeichert.empfaengerIds,
                    id: zwischengespeichert.id,
                    wert: zwischengespeichert.wert,
                    zeitpunkt: zwischengespeichert.zeitpunkt,
                    status: BezahlungStatus.Zwischengespeichert
                }));
            } catch {
                console.warn("background sync not allowed");
                await this.db.zwischengespeicherteBezahlungErledigt(id);
                return false;
            }
        } else {
            console.log("background sync not supported");
            return false;
        }
        return true;
    }

    async bezahlungDirektHinzufuegen(kontokorrentId: string,
        bezahlung: NeueBezahlungModel, id: string = null) {
        let request: NeueBezahlungRequest = {
            beschreibung: bezahlung.betreff,
            bezahlendePersonId: bezahlung.bezahlendePerson,
            empfaengerIds: bezahlung.empfaenger,
            id: id || uuid(),
            wert: bezahlung.betrag,
            zeitpunkt: bezahlung.datum
        };
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

    async getBeschreibungVorschlaege(kontokorrentId: string, eingabe: string) {
        (await this.workerService.getWorker()).getBeschreibungVorschlaege(kontokorrentId, eingabe);
    }
}

export function bezahlungActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("BezahlungActionCreator",
        serviceLocator => new BezahlungActionCreator(serviceLocator.store,
            serviceLocator.db,
            neueBezahlungServiceFactory(serviceLocator),
            workerServiceFactory(serviceLocator)));
}
