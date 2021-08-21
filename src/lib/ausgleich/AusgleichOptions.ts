import { GeforderteZahlung } from "./GeforderteZahlung";

export interface AusgleichOptions {
    geforderteZahlungen: GeforderteZahlung[];
    mussZahlungen: GeforderteZahlung[];
}