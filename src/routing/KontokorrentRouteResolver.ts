import { Router } from "route-it";
import { Home } from "../components/Home/home";
import { ServiceLocator } from "../ServiceLocator";
import { FeaturesRequired } from "../components/FeaturesRequired/FeaturesRequired";
import { Login } from "../components/Login/Login";
import { Store } from "../state/Store";
import { CreateKontokorrent } from "../components/CreateKontokorrent/CreateKontokorrent";
import { AsyncRouteResolver } from "route-it/dist/router";
import { KontokorrentPage } from "../components/KontokorrentPage/KontokorrentPage";

export enum Paths {
    Login = "login",
    Info = "info",
    Home = "",
    FeaturesRequired = "features-required",
    Kontokorrents = "kontokorrents",
    CreateEvent = "create-event"
}

export class KontokorrentRouteResolver extends EventTarget implements AsyncRouteResolver<HTMLElement> {
    constructor(private store: Store) {
        super();
    }

    serviceLocator: ServiceLocator;
    setServiceLocator(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
    }

    async resolve(lastRoute: string, currentRoute: string, router: Router<HTMLElement>) {
        if (currentRoute in Paths) {
            this.dispatchEvent(new CustomEvent("routedTo", { detail: { currentRoute } }));
        }
        switch (currentRoute) {
            case Paths.Info:
                const { Info } = await import("../components/Info/info");
                let component = new Info();
                component.addServices(this.serviceLocator);
                return component;
            case Paths.FeaturesRequired: {
                let component = new FeaturesRequired();
                component.addServices(this.serviceLocator);
                return component;
            }
            case Paths.Login: {
                let component = new Login();
                component.addServices(this.serviceLocator);
                return component;
            }
            case Paths.CreateEvent: {
                let component = new CreateKontokorrent();
                component.addServices(this.serviceLocator);
                return component;
            }
        }
        if (!this.store.state.account.accountCreated) {
            return false;
        }
        let kontokorrentsRoute = /^kontokorrents\/([a-zA-Z0-9\-]+)$/.exec(currentRoute);
        if (kontokorrentsRoute) {
            let id: string = kontokorrentsRoute[1];
            let component = new KontokorrentPage();
            component.addServices(this.serviceLocator);
            component.setKontokorrentId(id);
            return component;
        }
        let component = new Home();
        component.addServices(this.serviceLocator);
        return component;
    }
}
