import { ServiceLocator } from "../ServiceLocator";
import { Store } from "../state/Store";
import { GetBeschreibungVorschlaegeMessage, KontokorrentOeffnenMessage, ResetBeschreibungenCacheMessage, WorkerMessageType } from "../worker/KontokorrentWorker";

export class WorkerService {
    constructor(private store: Store) {

    }
    private worker: Worker;

    private getWorker() {
        if (!this.worker) {
            this.worker = new Worker(new URL("../worker/KontokorrentWorker", import.meta.url));
            this.worker.addEventListener("message", ev => {
                if (ev.data?.type == "statedispatch") {
                    let msg = ev.data.msg;
                    this.store.dispatch(msg);
                }
            });
        }
        return this.worker;
    }

    getBeschreibungVorschlaege(kontokorrentId: string, eingabe: string) {
        let msg: GetBeschreibungVorschlaegeMessage = {
            kontokorrentId: kontokorrentId,
            type: WorkerMessageType.GetBeschreibungVorschlaege,
            eingabe: eingabe
        };
        this.getWorker().postMessage(msg);
    }

    resetBeschreibungenCache() {
        let msg: ResetBeschreibungenCacheMessage = {
            type: WorkerMessageType.ResetBeschreibungenCache,
        };
        this.getWorker().postMessage(msg);
    }

    kontokorrentOeffnen(oeffentlicherName: string) {
        let msg: KontokorrentOeffnenMessage = {
            type: WorkerMessageType.KontokorrentOeffnen,
            oeffentlicherName: oeffentlicherName
        };
        this.getWorker().postMessage(msg);
    }
}

export function workerServiceFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("WorkerService",
        serviceLocator => new WorkerService(serviceLocator.store));
}