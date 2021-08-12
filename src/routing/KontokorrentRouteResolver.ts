import { Router } from "route-it";
import { ServiceLocator } from "../ServiceLocator";
import "../components/FeaturesRequired/FeaturesRequired";
import { FeaturesRequired } from "../components/FeaturesRequired/FeaturesRequired";
import { Store } from "../state/Store";
import { AsyncRouteResolver } from "route-it/dist/router";


export enum Paths {
    Login = "login",
    Info = "info",
    Home = "",
    FeaturesRequired = "features-required",
    CreateEvent = "create-event",
    BezahlungEintragen = "eintragen",
    MultiBezahlungEintragen = "multi-eintragen",
    DatabaseDebug = "database-debug"
}

export class KontokorrentRouteResolver implements AsyncRouteResolver<HTMLElement> {
    constructor(private store: Store) {
    }

    serviceLocator: ServiceLocator;
    setServiceLocator(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
    }

    private async getKontokorrentPageComponent() {
        const { KontokorrentPage } = await import("../components/KontokorrentPage/KontokorrentPage");
        let component = new KontokorrentPage();
        component.addServices(this.serviceLocator);
        return component;
    }

    async resolve(lastRoute: string, currentRoute: string, router: Router<HTMLElement>) {
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
                const { Login } = await import("../components/Login/Login");
                let component = new Login();
                component.addServices(this.serviceLocator);
                return component;
            }
            case Paths.CreateEvent: {
                const { CreateKontokorrent } = await import("../components/CreateKontokorrent/CreateKontokorrent");
                let component = new CreateKontokorrent();
                component.addServices(this.serviceLocator);
                return component;
            }
        }
        if (!this.store.state.account.accountCreated) {
            router.navigate(Paths.Login, null, true);
            return false;
        }
        switch (currentRoute) {
            case Paths.BezahlungEintragen: {
                const { BezahlungEintragenPage } = await import("../components/BezahlungEintragenPage/BezahlungEintragenPage");
                let component = new BezahlungEintragenPage();
                component.addServices(this.serviceLocator);
                return component;
            }
            case Paths.MultiBezahlungEintragen: {
                const { MultiBezahlungEintragenPage } = await import("../components/MultiBezahlungEintragenPage/MultiBezahlungEintragenPage");
                let component = new MultiBezahlungEintragenPage();
                component.addServices(this.serviceLocator);
                return component;
            }
            case Paths.DatabaseDebug: {
                const { DatabaseDebug } = await import("../components/DatabaseDebug/DatabaseDebug");
                let component = new DatabaseDebug();
                component.addServices(this.serviceLocator);
                return component;
            }
        }
        let oeffentlicherKontokorrentRoute = /^kontokorrents\/o\/([a-zA-Z0-9\-]+)$/.exec(currentRoute);
        if (oeffentlicherKontokorrentRoute) {
            let oeffentlicherName: string = oeffentlicherKontokorrentRoute[1];
            let component = await this.getKontokorrentPageComponent();
            component.setRouteParameters(oeffentlicherName);
            return component;
        }
        let oeffentlicherKontokorrentBezahlungRoute = /^kontokorrents\/o\/([a-zA-Z0-9\-]+)\/bezahlungen\/([a-zA-Z0-9\-]+)$/.exec(currentRoute);
        if (oeffentlicherKontokorrentBezahlungRoute) {
            let oeffentlicherName = oeffentlicherKontokorrentBezahlungRoute[1];
            let bezahlungId = oeffentlicherKontokorrentBezahlungRoute[2];
            const { BezahlungPage } = await import("../components/BezahlungPage/BezahlungPage");
            let component = new BezahlungPage();
            component.addServices(this.serviceLocator);
            component.setRouteParameters(oeffentlicherName, bezahlungId);
            return component;
        }
        let component = await this.getKontokorrentPageComponent();
        component.addServices(this.serviceLocator);
        return component;
    }
}
