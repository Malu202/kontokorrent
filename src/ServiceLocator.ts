import { Store } from "./state/Store";
import { Router } from "route-it";
import { ApiClient } from "./api/ApiClient";
import { KontokorrentDatabase } from "./lib/KontokorrentDatabase";
import { AccountInfoStore } from "./lib/AccountInfoStore";

export class ServiceLocator {
    constructor(public store: Store,
        public router: Router<HTMLElement>,
        public apiClient: ApiClient,
        public db: KontokorrentDatabase,
        public accountInfoStore: AccountInfoStore) {
    }
}


