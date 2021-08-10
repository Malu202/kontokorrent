import { ServiceLocator } from "../../ServiceLocator";
import { WorkerService, workerServiceFactory } from "../../lib/WorkerService";

export class KontokorrentActionCreator {

    constructor(private workerService: WorkerService) {

    }

    kontokorrentOeffnen(id: string) {
        this.workerService.kontokorrentOeffnen(id);
    }
}

export function kontokorrentActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("KontokorrentActionCreator",
        serviceLocator => new KontokorrentActionCreator(
            workerServiceFactory(serviceLocator)
        ));
}