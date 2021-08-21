import { ServiceLocator } from "../../ServiceLocator";
import { WorkerService, workerServiceFactory } from "../../lib/WorkerService";
import { AusgleichRequest } from "../../lib/ausgleich/AusgleichRequest";
import { GeforderteZahlung } from "../../lib/ausgleich/GeforderteZahlung";
import { AusgleichOptions } from "../../lib/ausgleich/AusgleichOptions";

export class KontokorrentActionCreator {

    constructor(private workerService: WorkerService) {

    }

    kontokorrentOeffnen(oeffentlicherName: string) {
        this.workerService.kontokorrentOeffnen(oeffentlicherName);
    }

    ausgleichRechnen(oeffentlicherName:string, ausgleichOptions:AusgleichOptions) {
        this.workerService.ausgleichRechnen(oeffentlicherName, ausgleichOptions);
    }
}

export function kontokorrentActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("KontokorrentActionCreator",
        serviceLocator => new KontokorrentActionCreator(
            workerServiceFactory(serviceLocator)
        ));
}