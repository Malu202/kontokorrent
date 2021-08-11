import { KontokorrentBalance } from "../KontokorrentBalance";


export function balanceList(balance: KontokorrentBalance) {
    return Object.entries(balance).map(([k, v]) => {
        return {
            personId: k,
            wert: v
        };
    });
}
