import { KontokorrentBalance } from "../KontokorrentBalance";
import { ZahlungsBewerter } from "./ZahlungsBewerter";
import { GeforderteZahlung } from "./GeforderteZahlung";
import { AusgleichsZahlung } from "./AusgleichsZahlung";
import { Score } from "./Score";
import { balanceList } from "./balanceList";

function getMax(a: number[]) {
    let max = a[0];
    for (let v of a) {
        if (v > max) {
            max = v;
        }
    }
    return max;
}

export class PersonenBeziehungScoreBewerter implements ZahlungsBewerter {
    private scores: Score[];

    constructor(balance: KontokorrentBalance, bezahlungen: {
        empfaengerIds: string[];
        bezahlendePersonId: string;
    }[], bevorzugteZahlungen: GeforderteZahlung[]) {
        this.scores = this.getScores(balance, bezahlungen);
        var max = getMax(this.scores.map(v => v.value));
        max += 1.0;
        for (let bevorzugteZahlung of bevorzugteZahlungen) {
            this.scores.find(v => v.Is(bevorzugteZahlung.bezahlendePersonId, bevorzugteZahlung.empfaengerPersonId)).value = max;
        }
    }

    private compare(x: AusgleichsZahlung, y: AusgleichsZahlung): number {
        if (null == x || null == y) {
            return -1;
        }
        var xScore = this.scores.find(v => v.Is(x.bezahlendePersonId, x.empfaengerPersonId)).value;
        var yScore = this.scores.find(v => v.Is(y.bezahlendePersonId, y.empfaengerPersonId)).value;
        if (Math.abs(xScore - yScore) < Number.EPSILON) {
            return 0;
        }
        else if (xScore < yScore) {
            return -1;
        }
        else {
            return 1;
        }
    }

    findeBesteZahlung(a: AusgleichsZahlung[]): AusgleichsZahlung {
        return a.sort((a, b) => this.compare(b, a))[0];
    }

    private getScores(balance: KontokorrentBalance, bezahlungen: {
        empfaengerIds: string[];
        bezahlendePersonId: string;
    }[]) {
        let scores: Score[] = [];
        let list = balanceList(balance);
        for (let pA of list) {
            for (let pB of list) {
                if (pB.personId != pA.personId) {
                    if (!scores.some(s => s.Is(pA.personId, pB.personId))) {
                        scores.push(new Score(pA.personId, pB.personId, 0));
                    }
                }
            }
        }

        for (let b of bezahlungen) {
            for (let e of b.empfaengerIds) {
                if (b.bezahlendePersonId != e) {
                    var score = scores.find(s => s.Is(b.bezahlendePersonId, e));
                    score.value += 1.0 / b.empfaengerIds.length;
                }
            }
        }
        return scores;
    }
}
