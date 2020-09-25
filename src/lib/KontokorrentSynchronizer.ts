import { KontokorrentDatabase } from "./KontokorrentDatabase";

export class KontokorrentSynchronizer {
    constructor(private db: KontokorrentDatabase) {
    }

    async getLaufendeNummer(kontokorrentId: string) {
        let aktionen = await this.db.getAktionen(kontokorrentId);
        let max = Math.max(...aktionen.map(v => v.laufendeNummer));
        return max;
    }
}