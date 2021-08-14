import { Router } from "route-it";
import { ServiceLocator } from "../ServiceLocator";
import "../components/FeaturesRequired/FeaturesRequired";
import { FeaturesRequired } from "../components/FeaturesRequired/FeaturesRequired";
import { Store } from "../state/Store";
import { AsyncRouteResolver } from "route-it/dist/router";

export const OeffentlicherNameParam = "oeffentlicherName";


export enum Paths {
    Login = "login",
    Info = "info",
    Home = "",
    FeaturesRequired = "features-required",
    CreateEvent = "create-event",
    BezahlungEintragen = "eintragen",
    MultiBezahlungEintragen = "multi-eintragen",
    DatabaseDebug = "database-debug",
    NichtGefunden = "nicht-gefunden"
}

function matchOeffentlicherKontokorrentRoute(route: string) {
    let oeffentlicherKontokorrentRoute = /^kontokorrents\/o\/([a-zA-Z0-9\-]+)$/.exec(route);
    if (oeffentlicherKontokorrentRoute) {
        let oeffentlicherName: string = oeffentlicherKontokorrentRoute[1];
        return {
            oeffentlicherName: oeffentlicherName
        };
    }
    return null;
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
            let oeffentlicher = matchOeffentlicherKontokorrentRoute(currentRoute);
            if (oeffentlicher) {
                let p = new URLSearchParams();
                p.set(OeffentlicherNameParam, oeffentlicher.oeffentlicherName);
                router.navigate(`${Paths.Login}?${p}`, null, true);
            }
            else {
                router.navigate(`${Paths.Login}`, null, true);
            }
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
        if (currentRoute.startsWith(Paths.NichtGefunden)) {
            const { KontokorrentNichtGefunden } = await import("../components/KontokorrentNichtGefunden/KontokorrentNichtGefunden");
            let component = new KontokorrentNichtGefunden();
            component.addServices(this.serviceLocator);
            return component;
        }
        let routeMatch = matchOeffentlicherKontokorrentRoute(currentRoute);
        if (routeMatch) {
            let component = await this.getKontokorrentPageComponent();
            component.setRouteParameters(routeMatch.oeffentlicherName);
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
