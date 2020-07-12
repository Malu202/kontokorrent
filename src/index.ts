import { Router, BodyChildRouteRenderer } from "route-it";
import { KontokorrentRouteResolver } from "./routing/KontokorrentRouteResolver";
import { Store } from "./state/Store";
import { InitializationActionCreator } from "./state/actions/InitializationActionCreator";
import { RoutingActionCreator } from "./state/actions/RoutingActionCreator";
import { ServiceLocator } from "./ServiceLocator";
import { AccountInfoStore } from "./lib/AccountInfoStore";
import { ApiClient } from "./api/ApiClient";
import { AccountActionCreator } from "./state/actions/AccountActionCreator";
import { AccountReducer } from "./state/reducers/AccountReducer";
import { KontokorrentsActionCreator } from "./state/actions/KontokorrentsActionCreator";
import { KontokorrentsReducer } from "./state/reducers/KontokorrentsReducer";

async function run() {
    const store = new Store(() => {
        return {
            account: {
                accountCreated: false,
                accountCreating: false,
                accountCreationFailed: false
            },
            kontokorrents: {
                hinzufuegen: false,
                hinzufuegenFailed: null,
                creating: false,
                creationFailed: null,
                kontokorrents: {}
            }
        }
    });
    const routeResolver = new KontokorrentRouteResolver(store);
    const router = new Router(routeResolver, new BodyChildRouteRenderer());

    store.addReducer("account", new AccountReducer());
    store.addReducer("kontokorrents", new KontokorrentsReducer());


    const routingActionCreator = new RoutingActionCreator(router);

    const accountInfoStore = new AccountInfoStore();
    const apiClient = new ApiClient(accountInfoStore);
    const accountActionCreator = new AccountActionCreator(store, apiClient, accountInfoStore, routingActionCreator);
    const kontokorrentsActionCreator = new KontokorrentsActionCreator(store, apiClient);
    const initializationActionCreator = new InitializationActionCreator(store, routingActionCreator, accountActionCreator, router);

    const serviceLocator = new ServiceLocator(store,
        routingActionCreator,
        accountActionCreator,
        kontokorrentsActionCreator);
    routeResolver.setServiceLocator(serviceLocator);

    await initializationActionCreator.initializeApplication();
}

run().catch(err => console.error(err));