import { Router } from "route-it";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { OeffentlicherNameParam, Paths } from "../../routing/KontokorrentRouteResolver";
import { ServiceLocator } from "../../ServiceLocator";
import { Store } from "../Store";
export class RoutingActionCreator {
    constructor(private router: Router<HTMLElement>, private db: KontokorrentDatabase,
        private store: Store) {
    }

    navigateHomeWithPageRefresh() {
        this.router.destroy();
        window.location.href = "";
    }

    navigateHome() {
        this.router.navigate(Paths.Home, null);
    }
    navigateLogin(replace?: boolean) {
        this.router.navigate(Paths.Login, null, replace);
    }
    navigateNichtGefunden(oeffentlicherName: string) {
        let p = new URLSearchParams();
        p.set(OeffentlicherNameParam, oeffentlicherName);
        this.router.navigate(`${Paths.NichtGefunden}?${p}`, null, true);
    }
    navigateFeaturesRequired() {
        this.router.navigate(Paths.FeaturesRequired, null);
    }
    navigate(path: string) {
        this.router.navigate(path, null);
    }
    async navigateKontokorrentById(id: string, replace?: boolean) {
        let kk = await this.db.getKontokorrent(id);
        if (kk.oeffentlicherName) {
            this.navigateKontokorrentByOeffentlicherName(kk.oeffentlicherName, replace);
            return;
        }
        throw new Error("Cannot navigate to private Kontokorrent: not yet implemented");
    }

    navigateKontokorrentByOeffentlicherName(oeffentlicherName: string, replace?: boolean) {
        this.router.navigate(`kontokorrents/o/${oeffentlicherName}`, null, replace);
    }

    navigateBezahlung(kontokorrentId: string, id: string, replace?: boolean) {
        let kk = this.store.state.kontokorrents.kontokorrents[kontokorrentId];
        if (kk.oeffentlicherName) {
            this.router.navigate(`kontokorrents/o/${kk.oeffentlicherName}/bezahlungen/${id}`, null, replace);
            return;
        }
        throw new Error("Cannot navigate to private Kontokorrent Bezahlung: not yet implemented");
    }
}

export function routingActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("RoutingActionCreator",
        serviceLocator => new RoutingActionCreator(serviceLocator.router, serviceLocator.db, serviceLocator.store));
}
