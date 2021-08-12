import { Store } from "../Store";
import { RoutingActionCreator, routingActionCreatorFactory } from "./RoutingActionCreator";
import { testFeatures } from "../../lib/testFeatures";
import { AccountActionCreator, accountActionCreatorFactory } from "./AccountActionCreator";
import { Router } from "route-it/dist/router";
import { KontokorrentListenActionCreator, kontokorrentListenActionCreatorFactory } from "./KontokorrentListenActionCreator";
import { ServiceLocator } from "../../ServiceLocator";
import { Paths } from "../../routing/KontokorrentRouteResolver";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { NeueBezahlungBackgroundSyncTag } from "../../sw.constants";

export class InitializationActionCreator {

    constructor(private store: Store,
        private db: KontokorrentDatabase,
        private routingActionCreator: RoutingActionCreator,
        private accountActionCreator: AccountActionCreator,
        private kontokorrentsActionCreator: KontokorrentListenActionCreator,
        private router: Router<unknown>) {

    }

    async initializeApplication() {
        if (!(await testFeatures()).allPassed) {
            this.router.run();
            this.routingActionCreator.navigateFeaturesRequired();
            return;
        }
        let initialized = await this.accountActionCreator.initializeAccount();
        this.router.run();
        if (initialized) {
            await this.kontokorrentsActionCreator.syncKontokorrentListe();
            if ("requestIdleCallback" in window) {
                window.requestIdleCallback(() => {
                    this.zwischengespeicherteSynchronisieren();
                });
            }
            else {
                this.zwischengespeicherteSynchronisieren();
            }
        }
    }

    private async zwischengespeicherteSynchronisierenAsync(): Promise<void> {
        if ("serviceWorker" in navigator && "SyncManager" in window) {
            let reg = await navigator.serviceWorker.ready;
            if ((await this.db.getZwischengespeicherteBezahlungen()).length) {
                await reg.sync.register(NeueBezahlungBackgroundSyncTag);
                console.log("background sync scheduled");
            }
        }
    }

    private zwischengespeicherteSynchronisieren() {
        this.zwischengespeicherteSynchronisierenAsync()
            .catch(err => console.error(err));
    }
}

export function initializationActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("InitializationActionCreator",
        serviceLocator => new InitializationActionCreator(serviceLocator.store,
            serviceLocator.db,
            routingActionCreatorFactory(serviceLocator),
            accountActionCreatorFactory(serviceLocator),
            kontokorrentListenActionCreatorFactory(serviceLocator),
            serviceLocator.router));
}