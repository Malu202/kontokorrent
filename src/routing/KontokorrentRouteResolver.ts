import { Router } from "route-it";
import { Home } from "../components/home";
import { ServiceLocator } from "../ServiceLocator";
import { OpenSourceInfo } from "../components/open-source-info";
import { FeaturesRequired } from "../components/FeaturesRequired/FeaturesRequired";
import { Login } from "../components/login/login";
import { Store } from "../state/Store";
import { CreateKontokorrent } from "../components/CreateKontokorrent/CreateKontokorrent";

export enum Paths {
    Login = "login",
    OpenSourceInfo = "open-source-info",
    Home = "",
    FeaturesRequired = "features-required",
    CreateEvent = "create-event"
}

export class KontokorrentRouteResolver extends EventTarget {
    constructor(private store: Store) {
        super();
    }

    serviceLocator: ServiceLocator;
    setServiceLocator(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
    }

    resolve(lastRoute: string, currentRoute: string, router: Router<HTMLElement>) {
        if (currentRoute in Paths) {
            this.dispatchEvent(new CustomEvent("routedTo", { detail: { currentRoute } }));
        }
        switch (currentRoute) {
            case Paths.OpenSourceInfo:
                return new OpenSourceInfo();
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
        switch (currentRoute) {
            default:
                let component = new Home();
                component.addServices(this.serviceLocator);
                return component;
        }        
    }
}
