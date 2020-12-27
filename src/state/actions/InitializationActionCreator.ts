import { Store } from "../Store";
import { RoutingActionCreator, routingActionCreatorFactory } from "./RoutingActionCreator";
import { testFeatures } from "../../lib/testFeatures";
import { AccountActionCreator, accountActionCreatorFactory } from "./AccountActionCreator";
import { Router } from "route-it/dist/router";
import { KontokorrentListenActionCreator, kontokorrentListenActionCreatorFactory } from "./KontokorrentListenActionCreator";
import { ServiceLocator } from "../../ServiceLocator";
import { Paths } from "../../routing/KontokorrentRouteResolver";

export class InitializationActionCreator {

    constructor(private store: Store,
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
        if (!initialized) {
            window.history.replaceState({}, document.title, Paths.Login);
        }
        this.router.run();
        if (initialized) {
            await this.kontokorrentsActionCreator.syncKontokorrentListe();
        }
    }
}

export function initializationActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("InitializationActionCreator",
        serviceLocator => new InitializationActionCreator(serviceLocator.store,
            routingActionCreatorFactory(serviceLocator),
            accountActionCreatorFactory(serviceLocator),
            kontokorrentListenActionCreatorFactory(serviceLocator),
            serviceLocator.router));
}