import { Store } from "./state/Store";
import { Router } from "route-it";
import { ApiClient } from "./api/ApiClient";
import { KontokorrentDatabase } from "./lib/KontokorrentDatabase";
import { AccountInfoStore } from "./lib/AccountInfoStore";

export class ServiceLocator {
    private services: { [name: string]: any };
    constructor(public store: Store,
        public router: Router<HTMLElement>,
        public apiClient: ApiClient,
        public db: KontokorrentDatabase,
        public accountInfoStore: AccountInfoStore) {
        this.services = {};
    }

    get<T>(name: string, factoryFunction: (serviceLocator: ServiceLocator) => T) {
        if (!this.services[name]) {
            this.services[name] = factoryFunction(this);
        }
        return this.services[name];
    }
}


