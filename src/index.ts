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
import "./styles.scss";
import "./favicons";
import "../favicons/site.webmanifest";
import { AsyncRouteResolver } from "route-it/dist/router";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import { KontokorrentDatabase } from "./lib/KontokorrentDatabase";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            let registration = await runtime.register();
        } catch (err) {
            console.error('ServiceWorker registration failed: ', err);
        };
    });
}

async function run() {
    const store = new Store(() => {
        return {
            account: {
                accountCreated: false,
                accountCreating: false,
                accountCreationFailed: false,
                loginExpired: false,
                accountInfo: null
            },
            kontokorrents: {
                hinzufuegen: false,
                hinzufuegenFailed: null,
                creating: false,
                creationFailed: null,
                kontokorrents: {},
                listeLaden: false,
                activeKontokorrentId: null
            }
        }
    });
    const routeResolver = new KontokorrentRouteResolver(store);
    const router = new Router(routeResolver as AsyncRouteResolver<HTMLElement>, new BodyChildRouteRenderer());

    store.addReducer("account", new AccountReducer());
    store.addReducer("kontokorrents", new KontokorrentsReducer());


    const routingActionCreator = new RoutingActionCreator(router);

    const accountInfoStore = new AccountInfoStore();
    const apiClient = new ApiClient(accountInfoStore);
    const accountActionCreator = new AccountActionCreator(store, apiClient, accountInfoStore, routingActionCreator);
    const db = new KontokorrentDatabase();
    const kontokorrentsActionCreator = new KontokorrentsActionCreator(store, apiClient, routingActionCreator, db);
    const initializationActionCreator = new InitializationActionCreator(store,
        routingActionCreator,
        accountActionCreator, kontokorrentsActionCreator,
        router);

    const serviceLocator = new ServiceLocator(store,
        routingActionCreator,
        accountActionCreator,
        kontokorrentsActionCreator);
    routeResolver.setServiceLocator(serviceLocator);

    await initializationActionCreator.initializeApplication();
}

run().catch(err => console.error(err));