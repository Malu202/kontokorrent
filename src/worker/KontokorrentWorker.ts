import { expose } from "comlink";
import { BalanceCalculator } from "../lib/BalanceCalculator";

export async function calculateBalance(kontokorrentId: string) {
    return await (new BalanceCalculator().calculateBalance(kontokorrentId));
}

const exports = {
    calculateBalance
};
export type KontokorrentWorkerApi = typeof exports;
expose(exports, self);