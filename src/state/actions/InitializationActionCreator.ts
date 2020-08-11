import { Store } from "../Store";
import { RoutingActionCreator } from "./RoutingActionCreator";
import { testFeatures } from "../../lib/testFeatures";
import { AccountActionCreator } from "./AccountActionCreator";
import {  Router } from "route-it/dist/router";
import { KontokorrentsActionCreator } from "./KontokorrentsActionCreator";

export class InitializationActionCreator {

    constructor(private store: Store,
        private routingActionCreator: RoutingActionCreator,
        private accountActionCreator: AccountActionCreator,
        private kontokorrentsActionCreator : KontokorrentsActionCreator,
        private router : Router<unknown>) {

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