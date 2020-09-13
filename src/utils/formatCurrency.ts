import { round } from "./round";

export function formatCurrency(wert: number) {
    var Betrag: string = "" + round(wert, 2);
    var Kommaindex = Betrag.toString().indexOf(".");
    var Nachkommastellen = 0;
    if (Kommaindex != -1) {
        Nachkommastellen = Betrag.toString().length - (Kommaindex + 1);
        if (Nachkommastellen == 1)
            Betrag += '0';
    }
    return Betrag;
}
