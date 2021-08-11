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

type Bezahlung = { empfaengerIds: string[], bezahlendePersonId: string, wert: number };

interface KontokorrentBalanceRequest {
    kontokorrentId: string;
    zwischengespeicherte: boolean;
    bisLaufendeNummer: null | number;
}

interface KontokorrentBalanceResult {
    bezahlungen: Bezahlung[];
    balance: KontokorrentBalance;
}

export class BalanceCalculator {
    constructor(private db: KontokorrentDatabase) {
    }

    private erweitern(summe: number, nenner: number, andere: number[]) {
        let c = 1;
        for (let n of andere) {
            if (n != nenner) {
                c *= n;
            }
        }
        return summe * c;
    }

    async getBalance(request: KontokorrentBalanceRequest): Promise<KontokorrentBalanceResult> {
        let aktionen = await this.db.getAktionen(request.kontokorrentId);
        if (request.bisLaufendeNummer) {
            aktionen = aktionen.filter(a => a.laufendeNummer <= request.bisLaufendeNummer);
        }
        let gespeicherte: Bezahlung[] = filterBezahlungen(aktionen);
        let bezahlungen: Bezahlung[];
        let zwischengespeicherte: Bezahlung[] = await this.db.getZwischengespeicherteBezahlungenForKontokorrent(request.kontokorrentId);
        if (request.zwischengespeicherte) {
            bezahlungen = [...zwischengespeicherte, ...gespeicherte];
        } else {
            bezahlungen = gespeicherte;
        }
        let kk = await this.db.getKontokorrent(request.kontokorrentId);
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
        return {
            bezahlungen: bezahlungen,
            balance: balance
        };
    }

    async calculateBalance(kontokorrentId: string) {
        return (await this.getBalance({
            kontokorrentId: kontokorrentId,
            zwischengespeicherte: true,
            bisLaufendeNummer: null
        })).balance;
    }
}