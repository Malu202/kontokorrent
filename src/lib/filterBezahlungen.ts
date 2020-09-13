import { BezahlungDbModel } from "./BezahlungDbModel";
import { AktionDbModel } from "./AktionDbModel";

export function filterBezahlungen(aktionen: AktionDbModel[]) {
    let bezahlungenMap: { [id: string]: BezahlungDbModel } = {};
    let ordered = aktionen.sort((a,b)=> a.laufendeNummer - b.laufendeNummer);
    for (let b of ordered) {
        if (b.bearbeiteteBezahlungId) {
            delete bezahlungenMap[b.bearbeiteteBezahlungId];
        }
        if (b.geloeschteBezahlungId) {
            delete bezahlungenMap[b.geloeschteBezahlungId];
        }
        else {
            bezahlungenMap[b.bezahlung.id] = b.bezahlung;
        }
    }
    let bezahlungen = Object.values(bezahlungenMap);
    return bezahlungen;
}