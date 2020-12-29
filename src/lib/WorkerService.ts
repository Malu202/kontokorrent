type KontokorrentWorkerApi = import("../worker/KontokorrentWorker").KontokorrentWorkerApi;
import { wrap } from "comlink";
import { ServiceLocator } from "../ServiceLocator";
import { Store } from "../state/Store";

export class WorkerService {
    constructor(private store: Store) {

    }
    private workerApi: KontokorrentWorkerApi;

    async getWorker() {
        if (this.workerApi) {
            return this.workerApi;
        }
        const worker = new Worker(new URL("../worker/KontokorrentWorker", import.meta.url));
        worker.addEventListener("message", ev => {
            if (ev.data?.type == "statedispatch") {
                let msg = ev.data.msg;
                this.store.dispatch(msg);
            }
        })
        this.workerApi = wrap<KontokorrentWorkerApi>(worker);
        return this.workerApi;
    }
}

export function workerServiceFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("WorkerService",
        serviceLocator => new WorkerService(serviceLocator.store));
}