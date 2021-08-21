import { AusgleichOptions } from "./AusgleichOptions";
import { GeforderteZahlung } from "./GeforderteZahlung";

export interface AusgleichRequest {
    bisLaufendeNummer: number;
    kontokorrentId: string;
    ausgleichOptions: AusgleichOptions;
}
