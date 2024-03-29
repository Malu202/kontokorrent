import { Router, BodyChildRouteRenderer } from "route-it";
import { KontokorrentRouteResolver } from "./routing/KontokorrentRouteResolver";
import { Store } from "./state/Store";
import { ServiceLocator } from "./ServiceLocator";
import { AccountInfoStore } from "./lib/AccountInfoStore";
import { ApiClient } from "./api/ApiClient";
import { AccountReducer } from "./state/reducers/AccountReducer";
import { KontokorrentsReducer } from "./state/reducers/KontokorrentsReducer";
import "./styles.scss";
import { AsyncRouteResolver } from "route-it/dist/router";
import { KontokorrentDatabase } from "./lib/KontokorrentDatabase";
import { initializationActionCreatorFactory } from "./state/actions/InitializationActionCreator";
import { ServiceWorkerActions } from "./state/actions/ServiceWorkerActions";
import { BeschreibungVorschlagReducer } from "./state/reducers/BeschreibungVorschlaegeReducer";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        navigator.serviceWorker.register("./sw.js").then(registration => {
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
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
                activeKontokorrentId: null,
                nichtGefunden: null
            },
            beschreibungVorschlaege: {
                vorschlaege: [],
                kontokorrentId: null
            }
        }
    });
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("message", ev => {
            if (ev.data?.type == "statedispatch") {
                let msg = ev.data.msg as ServiceWorkerActions;
                store.dispatch(msg);
            }
        });
    }
    const routeResolver = new KontokorrentRouteResolver(store);
    const router = new Router(routeResolver as AsyncRouteResolver<HTMLElement>, new BodyChildRouteRenderer());
    const db = new KontokorrentDatabase();
    store.addReducer("account", new AccountReducer());
    store.addReducer("kontokorrents", new KontokorrentsReducer());
    store.addReducer("beschreibungVorschlaege", new BeschreibungVorschlagReducer());

    const accountInfoStore = new AccountInfoStore(db);
    const apiClient = new ApiClient(accountInfoStore);

    const serviceLocator = new ServiceLocator(store,
        router,
        apiClient,
        db,
        accountInfoStore);
    routeResolver.setServiceLocator(serviceLocator);

    await initializationActionCreatorFactory(serviceLocator).initializeApplication();
}

run().catch(err => console.error(err));