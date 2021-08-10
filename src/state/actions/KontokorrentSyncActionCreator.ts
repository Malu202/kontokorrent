import { Store } from "../lib/Store";
import { ApiClient } from "../../api/ApiClient";
import { Action } from "../lib/Action";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { Bezahlung, BezahlungStatus } from "../State";
import { filterBezahlungen } from "../../lib/filterBezahlungen";
import { ActionNames } from "./ActionNames";
import { KontokorrentSynchronizer } from "../../lib/KontokorrentSynchronizer";
import { BalanceCalculator } from "../../lib/BalanceCalculator";
import { KontokorrentBalance } from "../../lib/KontokorrentBalance";

export class KontokorrentGeoeffnet implements Action {
    readonly type = ActionNames.KontokorrentGeoeffnet;
    constructor(public id: string) {

    }
}

export class KontokorrentBezahlungen implements Action {
    readonly type = ActionNames.KontokorrentBezahlungen;
    constructor(public kontokorrentId: string, public bezahlungen: Bezahlung[]) {

    }
}

export class KontokorrentSynchronisieren implements Action {
    readonly type = ActionNames.KontokorrentSynchronisieren;
    constructor(public kontokorrentId: string) {

    }
}

export class KontokorrentSynchronisiert implements Action {
    readonly type = ActionNames.KontokorrentSynchronisiert;
    constructor(public kontokorrentId: string) {

    }
}

export class KontokorrentBalanceAktualisiert implements Action {
    readonly type = ActionNames.KontokorrentBalanceAktualisiert;
    constructor(public kontokorrentId: string, public balance: KontokorrentBalance) {

    }
}

export type KontokorrentSyncActions =
    | KontokorrentGeoeffnet
    | KontokorrentBezahlungen
    | KontokorrentSynchronisieren
    | KontokorrentSynchronisiert
    | KontokorrentBalanceAktualisiert;

export class KontokorrentSyncActionCreator {

    constructor(private store: Store,
        private apiClient: ApiClient,
        private db: KontokorrentDatabase) {

    }
    private async refreshBezahlungen(id: string) {
        let aktionen = filterBezahlungen(await this.db.getAktionen(id)).map(b => {
            return {
                ...b,
                status: BezahlungStatus.Gespeichert
            };
        });
        let zwischengespeicherte = (await this.db.getZwischengespeicherteBezahlungenForKontokorrent(id)).map(b => {
            let x: Bezahlung = {
                status: BezahlungStatus.Zwischengespeichert,
                beschreibung: b.beschreibung,
                bezahlendePersonId: b.bezahlendePersonId,
                empfaengerIds: b.empfaengerIds,
                id: b.id,
                wert: b.wert,
                zeitpunkt: b.zeitpunkt
            };
            return x;
        }).filter(b => !aktionen.some(a => a.id == b.id));
        this.store.dispatch(new KontokorrentBezahlungen(id, [...aktionen, ...zwischengespeicherte]));
    }

    private async calculateBalance(id: string) {
        let balance = await (new BalanceCalculator(this.db).calculateBalance(id));;
        this.store.dispatch(new KontokorrentBalanceAktualisiert(id, balance));
    }

    private async refreshKontokorrent(id: string) {
        await Promise.all([this.refreshBezahlungen(id), this.calculateBalance(id)]);
    }

    private async kontokorrentSynchronisieren(id: string) {
        this.store.dispatch(new KontokorrentSynchronisieren(id));
        let laufendeNummer = await (new KontokorrentSynchronizer(this.db).getLaufendeNummer(id));
        let res = await this.apiClient.getAktionen(id, laufendeNummer);
        if (res.success) {
            await this.db.addAktionen(id, res.aktionen);
            if (res.aktionen.length > 0) {
                await this.refreshKontokorrent(id);
            }
        }
        this.store.dispatch(new KontokorrentSynchronisiert(id));
    }



    async kontokorrentOeffnen(id: string) {
        let kk = await this.db.getKontokorrent(id);
        if (null != kk) {
            this.store.dispatch(new KontokorrentGeoeffnet(id));
            await Promise.all([this.db.setZuletztGesehenerKontokorrentId(id), this.refreshKontokorrent(id)]);
            await this.kontokorrentSynchronisieren(id);
        }
    }
}