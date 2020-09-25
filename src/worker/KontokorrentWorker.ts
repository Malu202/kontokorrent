import { expose } from "comlink";
import { BalanceCalculator } from "../lib/BalanceCalculator";
import { KontokorrentDatabase } from "../lib/KontokorrentDatabase";
import { KontokorrentSynchronizer } from "../lib/KontokorrentSynchronizer";

const db = new KontokorrentDatabase();

export async function calculateBalance(kontokorrentId: string) {
    return await (new BalanceCalculator(db).calculateBalance(kontokorrentId));
}

export async function getLaufendeNummer(kontokorrentId: string) {
    return await (new KontokorrentSynchronizer(db).getLaufendeNummer(kontokorrentId));
}

const exports = {
    calculateBalance,
    getLaufendeNummer
};
export type KontokorrentWorkerApi = typeof exports;
expose(exports, self);