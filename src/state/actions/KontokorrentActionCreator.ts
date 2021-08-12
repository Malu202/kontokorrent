import { ServiceLocator } from "../../ServiceLocator";
import { WorkerService, workerServiceFactory } from "../../lib/WorkerService";

export class KontokorrentActionCreator {

    constructor(private workerService: WorkerService) {

    }

    kontokorrentOeffnen(oeffentlicherName: string) {
        this.workerService.kontokorrentOeffnen(oeffentlicherName);
    }
}

export function kontokorrentActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("KontokorrentActionCreator",
        serviceLocator => new KontokorrentActionCreator(
            workerServiceFactory(serviceLocator)
        ));
}