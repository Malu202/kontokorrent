import { BezahlungDbModel } from "./BezahlungDbModel";
import { AktionDbModel } from "./AktionDbModel";

export function filterBezahlungen(aktionen: AktionDbModel[]) {
    let bezahlungenMap: { [id: string]: BezahlungDbModel } = {};
    for (let b of aktionen) {
        if (b.bearbeiteteBezahlungId) {
            delete bezahlungenMap[b.bearbeiteteBezahlungId];
        }
        if (b.geloeschteBezahlungId) {
            delete bezahlungenMap[b.bearbeiteteBezahlungId];
        }
        else {
            bezahlungenMap[b.bezahlung.id] = b.bezahlung;
        }
    }
    let bezahlungen = Object.values(bezahlungenMap);
    return bezahlungen;
}