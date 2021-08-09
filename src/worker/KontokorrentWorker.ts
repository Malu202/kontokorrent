import { expose } from "comlink";
import { BalanceCalculator } from "../lib/BalanceCalculator";
import { KontokorrentDatabase } from "../lib/KontokorrentDatabase";
import { KontokorrentSynchronizer } from "../lib/KontokorrentSynchronizer";
import { BeschreibungVorschlagActionCreator } from "../state/actions/BeschreibungVorschlagActionCreator";
import { Action } from "../state/lib/Action";

let storeAdapter = {
    dispatch(action: Action): void {
        self.postMessage({ type: "statedispatch", msg: action });
    }
}

const db = new KontokorrentDatabase();
const beschreibungVorschlagActionCreator = new BeschreibungVorschlagActionCreator(db, storeAdapter);

export async function calculateBalance(kontokorrentId: string) {
    return await (new BalanceCalculator(db).calculateBalance(kontokorrentId));
}

export async function getLaufendeNummer(kontokorrentId: string) {
    return await (new KontokorrentSynchronizer(db).getLaufendeNummer(kontokorrentId));
}

export async function getBeschreibungVorschlaege(kontokorrentId: string, eingabe: string) {
    await beschreibungVorschlagActionCreator.getVorschlaege(kontokorrentId, eingabe);
}

export function resetBeschreibungenCache() {
    beschreibungVorschlagActionCreator.resetCache();
}

const exports = {
    calculateBalance,
    getLaufendeNummer,
    getBeschreibungVorschlaege,
    resetBeschreibungenCache
};
export type KontokorrentWorkerApi = typeof exports;
expose(exports, self);