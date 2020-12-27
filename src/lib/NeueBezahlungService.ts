import { ApiClient } from "../api/ApiClient";
import { NeueBezahlungRequest } from "../api/NeueBezahlungRequest";
import { ServiceLocator } from "../ServiceLocator";
import { KontokorrentDatabase } from "./KontokorrentDatabase";

export enum NeueBezahlungHinzufuegenResult {
    BackgroundSync,
    Direct
}

export class NeueBezahlungService {
    constructor(private apiClient: ApiClient,
        private db: KontokorrentDatabase) {
    }

    async bezahlungAnlegen(kontokorrentId: string, request: NeueBezahlungRequest) {
        let aktion = await this.apiClient.neueBezahlung(kontokorrentId, request);
        this.db.addAktionen(kontokorrentId, [aktion]);
        return aktion;
    }
}

export function neueBezahlungServiceFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("NeueBezahlungService",
        serviceLocator => new NeueBezahlungService(serviceLocator.apiClient,
            serviceLocator.db));
}