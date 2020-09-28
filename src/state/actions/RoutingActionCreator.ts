import { Router } from "route-it";
import { Paths } from "../../routing/KontokorrentRouteResolver";
import { ServiceLocator } from "../../ServiceLocator";
export class RoutingActionCreator {
    static locate(serviceLocator: ServiceLocator): RoutingActionCreator {
        return new RoutingActionCreator(serviceLocator.router);
    }
    constructor(private router: Router<HTMLElement>) {
    }
    navigateHome() {
        this.router.navigate(Paths.Home, null);
    }
    navigateLogin() {
        this.router.navigate(Paths.Login, null);
    }
    navigateFeaturesRequired() {
        this.router.navigate(Paths.FeaturesRequired, null);
    }
    navigate(path: string) {
        this.router.navigate(path, null);
    }
    navigateKontokorrent(id: string, redirect?: boolean) {
        this.router.navigate(`${Paths.Kontokorrents}/${id}`, null, redirect);
    }
}
