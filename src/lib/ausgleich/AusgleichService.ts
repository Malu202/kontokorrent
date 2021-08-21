import { BalanceCalculator } from "../BalanceCalculator";
import { KontokorrentDatabase } from "../KontokorrentDatabase";
import { PersonenBeziehungScoreBewerter } from "./PersonenBeziehungScoreBewerter";
import { AusgleichRequest } from "./AusgleichRequest";
import { KontokorrentAusgleich } from "./KontokorrentAusgleich";
import { AusgleichStatus } from "./AusgleichStatus";
import { AusgleichNichtMoeglichError } from "./AusgleichNichtMoeglichError";

export class AusgleichService {
    constructor(private db: KontokorrentDatabase) {
    }

    public async getAusgleich(request: AusgleichRequest): Promise<KontokorrentAusgleich> {
        let calc = new BalanceCalculator(this.db);
        let balance = await calc.getBalance({
            kontokorrentId: request.kontokorrentId,
            zwischengespeicherte: false,
            bisLaufendeNummer: request.bisLaufendeNummer,
        });
        let ausgleichStatus = new AusgleichStatus(balance.balance, new PersonenBeziehungScoreBewerter(balance.balance, balance.bezahlungen, request.ausgleichOptions.geforderteZahlungen));
        ausgleichStatus.mussZahlungenAnwenden(request.ausgleichOptions.mussZahlungen);
        for (let i = 0; i < 1000; i++) {
            if (ausgleichStatus.istAufgeloest()) {
                return ausgleichStatus.getAusgleich();
            }
            ausgleichStatus.gleicheAufloesen();
            if (!ausgleichStatus.istAufgeloest()) {
                if (!ausgleichStatus.gleichheitErzeugen()) {
                    ausgleichStatus.moeglicheZahlung();
                }
            }
        }
        throw new AusgleichNichtMoeglichError();
    }
}
