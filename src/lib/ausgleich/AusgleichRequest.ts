import { GeforderteZahlung } from "./GeforderteZahlung";


export interface AusgleichRequest {
    bisLaufendeNummer: number;
    kontokorrentId: string;
    geforderteZahlungen: GeforderteZahlung[];
    mussZahlungen: GeforderteZahlung[];
}
