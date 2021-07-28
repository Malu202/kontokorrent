import { ApiClient } from "../api/ApiClient";
import { BezahlungBearbeitenRequest } from "../api/BezahlungBearbeitenRequest";
import { NeueBezahlungRequest } from "../api/NeueBezahlungRequest";
import { ServiceLocator } from "../ServiceLocator";
import { KontokorrentDatabase } from "./KontokorrentDatabase";

export class BezahlungenService {

    constructor(private apiClient: ApiClient,
        private db: KontokorrentDatabase) {
    }

    async bezahlungAnlegen(kontokorrentId: string, request: NeueBezahlungRequest) {
        let aktion = await this.apiClient.neueBezahlung(kontokorrentId, request);
        this.db.addAktionen(kontokorrentId, [aktion]);
        return aktion;
    }

    async bezahlungBearbeiten(kontokorrentId: string, request: BezahlungBearbeitenRequest) {
        let aktion = await this.apiClient.bezahlungBearbeiten(kontokorrentId, request);
        this.db.addAktionen(kontokorrentId, [aktion]);
        return aktion;
    }

    async bezahlungLoeschen(kontokorrentId: string, bezahlungId: string) {
        let aktion = await this.apiClient.bezahlungLoeschen(kontokorrentId, bezahlungId);
        this.db.addAktionen(kontokorrentId, [aktion]);
        return aktion;
    }
}

export function bezahlungenServiceFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("NeueBezahlungService",
        serviceLocator => new BezahlungenService(serviceLocator.apiClient,
            serviceLocator.db));
}