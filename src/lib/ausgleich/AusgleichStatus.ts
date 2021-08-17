import { KontokorrentBalance } from "../KontokorrentBalance";
import { AusgleichsZahlung } from "./AusgleichsZahlung";
import { ZahlungsBewerter } from "./ZahlungsBewerter";
import { GeforderteZahlung } from "./GeforderteZahlung";
import { KontokorrentAusgleich } from "./KontokorrentAusgleich";
import { balanceList } from "./balanceList";

function isCloseTo(a: number, b: number, epsilon?: number): boolean {
    return Math.abs(a - b) < (epsilon || Number.EPSILON);
}


export class AusgleichStatus {
    private angewendeteZahlungen: AusgleichsZahlung[];

    constructor(private balance: KontokorrentBalance, private zahlungsBewerter: ZahlungsBewerter) {
        this.angewendeteZahlungen = [];
    }

    private anwenden(ausgleichsZahlungen: AusgleichsZahlung[]) {
        let b = { ...this.balance };
        for (let a of ausgleichsZahlungen) {
            b[a.bezahlendePersonId] -= a.wert;
            b[a.empfaengerPersonId] += a.wert;
        }
        this.balance = b;
        this.angewendeteZahlungen = [...this.angewendeteZahlungen, ...ausgleichsZahlungen];
    }

    mussZahlungenAnwenden(mussZahlungen: GeforderteZahlung[]) {
        let zahlungen = mussZahlungen.map(z => {
            let bezahlenderStatus = this.balance[z.bezahlendePersonId];
            return new AusgleichsZahlung(z.bezahlendePersonId, z.empfaengerPersonId, bezahlenderStatus);
        });
        this.anwenden(zahlungen);
    }

    gleicheAufloesen() {
        let list = balanceList(this.balance);
        let zahlungen = list.filter(p => p.wert > 0).map(bezahlender => {
            let empfaenger = list.find(p2 => p2.personId != bezahlender.personId && isCloseTo(0, p2.wert + bezahlender.wert));
            if (empfaenger) {
                return new AusgleichsZahlung(bezahlender.personId, empfaenger.personId, bezahlender.wert);
            }
            return null;
        }).filter(z => z != null);
        this.anwenden(zahlungen);
    }

    gleichheitErzeugen() {
        let list = balanceList(this.balance);
        let moeglicheGleichheitsZahlungen = list.filter(p => p.wert > 0).map(bezahlender => {
            let empfaengerKandidaten = list.filter(empf => -empf.wert > bezahlender.wert);
            for (let empfaengerKandidat of empfaengerKandidaten) {
                let ausgleichMoeglich = list.some(bezahlender2 => bezahlender.personId != bezahlender2.personId
                    && bezahlender2.wert > 0
                    && isCloseTo(empfaengerKandidat.wert + bezahlender.wert, -bezahlender2.wert));
                if (ausgleichMoeglich) {
                    return new AusgleichsZahlung(bezahlender.personId, empfaengerKandidat.personId, bezahlender.wert);
                }
            }
            return null;
        }).filter(z => z != null);
        if (moeglicheGleichheitsZahlungen.length > 0) {
            let best = this.zahlungsBewerter.findeBesteZahlung(moeglicheGleichheitsZahlungen);
            this.anwenden([best]);
            return true;
        } else {
            return false;
        }
    }

    istAufgeloest(): boolean {
        return !Object.values(this.balance).some(s => !isCloseTo(s, 0, 0.05));
    }

    getAusgleich(): KontokorrentAusgleich {
        return {
            ausgleichZahlungen: this.angewendeteZahlungen
        };
    }

    private flattenAusgleichZahlungen(z: AusgleichsZahlung[][]) {
        return z.reduce((a, b) => a.concat(b), []);
    }


    moeglicheZahlung() {
        let list = balanceList(this.balance);
        let einfacheZahlungKandidaten = list.filter(b => b.wert > 0)
            .map(bezahlender => {
                return list.filter(empf => empf.personId != bezahlender.personId && -empf.wert > bezahlender.wert)
                    .map(empfaenger => new AusgleichsZahlung(bezahlender.personId, empfaenger.personId, bezahlender.wert));
            });

        let einfacheZahlung = this.zahlungsBewerter.findeBesteZahlung(this.flattenAusgleichZahlungen(einfacheZahlungKandidaten));
        if (null != einfacheZahlung) {
            this.anwenden([einfacheZahlung]);
            return;
        }
        let teilzahlungKandidaten = list.filter(b => b.wert > 0)
            .map(bezahlender => {
                return list.filter(empf => empf.personId != bezahlender.personId && empf.wert < 0)
                    .map(empfaenger => new AusgleichsZahlung(bezahlender.personId, empfaenger.personId, Math.abs(empfaenger.wert)));
            });
        let teilzahlung = this.zahlungsBewerter.findeBesteZahlung(this.flattenAusgleichZahlungen(teilzahlungKandidaten));
        if (null != teilzahlung) {
            this.anwenden([teilzahlung]);
        }
    }
}
