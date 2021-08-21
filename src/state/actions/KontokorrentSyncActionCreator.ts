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
import { GeforderteZahlung } from "../../lib/ausgleich/GeforderteZahlung";
import { AusgleichOptions } from "../../lib/ausgleich/AusgleichOptions";
import { AusgleichService } from "../../lib/ausgleich/AusgleichService";
import { KontokorrentAusgleich } from "../../lib/ausgleich/KontokorrentAusgleich";

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

export class KontokorrentNichtGefunden implements Action {
    readonly type = ActionNames.KontokorrentNichtGefunden;
    constructor(public oeffentlicherName: string) {

    }
}

export class KontokorrentOeffnen implements Action {
    readonly type = ActionNames.KontokorrentOeffnen;
    constructor(public oeffentlicherName: string) {

    }
}

export class AusgleichBerechnen implements Action {
    readonly type = ActionNames.AusgleichBerechnen;
    constructor(public kontokorrentId: string) {

    }
}

export class AusgleichBerechnet implements Action {
    readonly type = ActionNames.AusgleichBerechnet;
    constructor(public kontokorrentId: string, public ausgleich: KontokorrentAusgleich) {

    }
}

export type KontokorrentSyncActions =
    | KontokorrentGeoeffnet
    | KontokorrentBezahlungen
    | KontokorrentSynchronisieren
    | KontokorrentSynchronisiert
    | KontokorrentBalanceAktualisiert
    | KontokorrentNichtGefunden
    | KontokorrentOeffnen
    | AusgleichBerechnen
    | AusgleichBerechnet;

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



    async kontokorrentOeffnen(oeffentlicherName: string) {
        this.store.dispatch(new KontokorrentOeffnen(oeffentlicherName));
        let kk = await this.db.getPerOeffentlichName(oeffentlicherName);
        if (null != kk) {
            this.store.dispatch(new KontokorrentGeoeffnet(kk.id));
            await Promise.all([this.db.setZuletztGesehenerKontokorrentId(kk.id), this.refreshKontokorrent(kk.id)]);
            await this.kontokorrentSynchronisieren(kk.id);
        } else {
            this.store.dispatch(new KontokorrentNichtGefunden(oeffentlicherName));
        }
    }

    async ausgleichRechnen(oeffentlicherName: string, ausgleichOptions: AusgleichOptions) {
        let kk = await this.db.getPerOeffentlichName(oeffentlicherName);
        if (null != kk) {
            this.store.dispatch(new AusgleichBerechnen(kk.id));
            await this.kontokorrentSynchronisieren(kk.id);
            let ausgleich = await (new AusgleichService(this.db).getAusgleich({
                ausgleichOptions: ausgleichOptions,
                bisLaufendeNummer: null,
                kontokorrentId: kk.id
            }));
            this.store.dispatch(new AusgleichBerechnet(kk.id, ausgleich));
        } else {
            this.store.dispatch(new KontokorrentNichtGefunden(oeffentlicherName));
        }
    }
}