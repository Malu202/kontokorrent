import { AusgleichsZahlung } from "./AusgleichsZahlung";


export interface ZahlungsBewerter {
    findeBesteZahlung(a: AusgleichsZahlung[]): AusgleichsZahlung;
}
