import { KontokorrentDatabase } from "./KontokorrentDatabase";
import { KontokorrentBalance } from "./KontokorrentBalance";
import { filterBezahlungen } from "./filterBezahlungen";
import { groupBy } from "../utils/groupBy";

class GeteilteZahlung {
    constructor(public wert: number,
        public empfaengerAnzahl: number,
        public isEmpfaenger: boolean) {

    }
}

export class BalanceCalculator {
    private db: KontokorrentDatabase;

    constructor() {
        this.db = new KontokorrentDatabase();
    }

    erweitern(summe: number, nenner: number, andere: number[]) {
        let c = 1;
        for (let n of andere) {
            if (n != nenner) {
                c *= n;
            }
        }
        return summe * c;
    }

    async calculateBalance(kontokorrentId: string) {
        let aktionen = await this.db.getAktionen(kontokorrentId);
        let bezahlungen = filterBezahlungen(aktionen);
        let kk = await this.db.getKontokorrent(kontokorrentId);
        let geteilteZahlungen: { [id: string]: GeteilteZahlung[] } = {};
        for (let p of kk.personen) {
            geteilteZahlungen[p.id] = [];
        }
        for (let b of bezahlungen) {
            for (let e of b.empfaengerIds) {
                geteilteZahlungen[e].push(new GeteilteZahlung(b.wert, b.empfaengerIds.length, true));
                geteilteZahlungen[b.bezahlendePersonId].push(new GeteilteZahlung(b.wert, b.empfaengerIds.length, false));
            }
        }
        let balance: KontokorrentBalance = {};
        for (let p of kk.personen) {
            let gruppen = groupBy(geteilteZahlungen[p.id], "empfaengerAnzahl");
            let alleNenner = Array.from(gruppen.keys());
            let gesamtNenner = Array.from(gruppen.keys()).reduce((p, c) => p * c, 1);
            if (gesamtNenner < 362880) {
                let gesamtSumme = 0;
                for (let g of gruppen.keys()) {
                    let zahlungen = gruppen.get(g);
                    let summe = zahlungen.reduce((p, c) => p + (c.isEmpfaenger ? c.wert : -c.wert), 0);
                    gesamtSumme += this.erweitern(summe, g, alleNenner);
                }
                balance[p.id] = gesamtSumme / gesamtNenner;
            }
            else {
                let gesamtSumme = 0;
                for (let g of gruppen.keys()) {
                    let zahlungen = gruppen.get(g);
                    let summe = zahlungen.reduce((p, c) => p + (c.isEmpfaenger ? c.wert : -c.wert), 0);
                    gesamtSumme += summe / g;
                }
                balance[p.id] = gesamtSumme;
            }
        }
        return balance;
    }
}