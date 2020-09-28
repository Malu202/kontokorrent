import { Store } from "../Store";
import { RoutingActionCreator } from "./RoutingActionCreator";
import { testFeatures } from "../../lib/testFeatures";
import { AccountActionCreator } from "./AccountActionCreator";
import { Router } from "route-it/dist/router";
import { KontokorrentsActionCreator } from "./KontokorrentsActionCreator";
import { ServiceLocator } from "../../ServiceLocator";

export class InitializationActionCreator {

    constructor(private store: Store,
        private routingActionCreator: RoutingActionCreator,
        private accountActionCreator: AccountActionCreator,
        private kontokorrentsActionCreator: KontokorrentsActionCreator,
        private router: Router<unknown>) {

    }

    static locate(serviceLocator: ServiceLocator): InitializationActionCreator {
        return new InitializationActionCreator(serviceLocator.store,
            RoutingActionCreator.locate(serviceLocator),
            AccountActionCreator.locate(serviceLocator),
            KontokorrentsActionCreator.locate(serviceLocator),
            serviceLocator.router);
    }

    async initializeApplication() {
        if (!testFeatures().allPassed) {
            this.router.run();
            this.routingActionCreator.navigateFeaturesRequired();
            return;
        }
        let initialized = await this.accountActionCreator.initializeAccount();
        this.router.run();
        if (!initialized) {
            this.routingActionCreator.navigateLogin();
        }
        else {
            await this.kontokorrentsActionCreator.syncKontokorrentListe();
        }
    }
}