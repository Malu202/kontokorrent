import { ActionNames } from "./ActionNames";
import { Action } from "../lib/Action";

export class ServiceWorkerBezahlungAnlegen implements Action {
    readonly type = ActionNames.ServiceWorkerBezahlungAnlegen;
    constructor(public kontokorrentId: string, public bezahlungId: string) {

    }
}

export class ServiceWorkerBezahlungAngelegt implements Action {
    readonly type = ActionNames.ServiceWorkerBezahlungAngelegt;
    constructor(public kontokorrentId: string, public bezahlungId: string) {

    }
}

export type ServiceWorkerActions =
    | ServiceWorkerBezahlungAngelegt
    | ServiceWorkerBezahlungAnlegen;