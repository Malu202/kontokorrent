import { ApiClient } from "../api/ApiClient";
import { AccountInfoStore } from "../lib/AccountInfoStore";
import { AusgleichOptions } from "../lib/ausgleich/AusgleichOptions";
import { GeforderteZahlung } from "../lib/ausgleich/GeforderteZahlung";
import { KontokorrentDatabase } from "../lib/KontokorrentDatabase";
import { BeschreibungVorschlagActionCreator } from "../state/actions/BeschreibungVorschlagActionCreator";
import { KontokorrentSyncActionCreator } from "../state/actions/KontokorrentSyncActionCreator";
import { Action } from "../state/lib/Action";

let storeAdapter = {
    dispatch(action: Action): void {
        self.postMessage({ type: "statedispatch", msg: action });
    }
}

export const enum WorkerMessageType {
    KontokorrentOeffnen,
    GetBeschreibungVorschlaege,
    ResetBeschreibungenCache,
    AusgleichRechnen
}

export interface KontokorrentOeffnenMessage {
    type: WorkerMessageType.KontokorrentOeffnen;
    oeffentlicherName: string;
}

export interface GetBeschreibungVorschlaegeMessage {
    type: WorkerMessageType.GetBeschreibungVorschlaege;
    kontokorrentId: string;
    eingabe: string;
}
export interface ResetBeschreibungenCacheMessage {
    type: WorkerMessageType.ResetBeschreibungenCache;
}
export interface AusgleichRechnenMessage {
    type: WorkerMessageType.AusgleichRechnen;
    oeffentlicherName: string;
    ausgleichOptions: AusgleichOptions;
}

type WorkerMessage = KontokorrentOeffnenMessage
    | GetBeschreibungVorschlaegeMessage
    | ResetBeschreibungenCacheMessage
    | AusgleichRechnenMessage;

const db = new KontokorrentDatabase();
const accountInfoStore = new AccountInfoStore(db);
const apiClient = new ApiClient(accountInfoStore);
const beschreibungVorschlagActionCreator = new BeschreibungVorschlagActionCreator(db, storeAdapter);
const kontokorrentSyncActionCreator = new KontokorrentSyncActionCreator(storeAdapter, apiClient, db);

async function process(msg: WorkerMessage) {
    switch (msg.type) {
        case WorkerMessageType.KontokorrentOeffnen:
            await kontokorrentSyncActionCreator.kontokorrentOeffnen(msg.oeffentlicherName);
            break;
        case WorkerMessageType.GetBeschreibungVorschlaege:
            await beschreibungVorschlagActionCreator.getVorschlaege(msg.kontokorrentId, msg.eingabe);
            break;
        case WorkerMessageType.ResetBeschreibungenCache:
            beschreibungVorschlagActionCreator.resetCache();
            break;
        case WorkerMessageType.AusgleichRechnen:
            await kontokorrentSyncActionCreator.ausgleichRechnen(msg.oeffentlicherName, msg.ausgleichOptions);
            break;
    }
}

self.addEventListener("message", e => {
    let msg: WorkerMessage = e.data;
    process(msg).catch(err => console.error(err));
});