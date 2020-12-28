import { KontokorrentDatabase } from "./KontokorrentDatabase";

export class KontokorrentSynchronizer {
    constructor(private db: KontokorrentDatabase) {
    }

    async getLaufendeNummer(kontokorrentId: string) {
        let aktionen = await this.db.getAktionen(kontokorrentId);
        let sorted = aktionen.map(v => v.laufendeNummer).sort((a, b) => a - b);
        let i: number;
        for (i = 0; i < sorted.length - 1; i++) {
            if (sorted[i] + 1 !== sorted[i + 1]) {
                break;
            }
        }
        return sorted[i];
    }
}