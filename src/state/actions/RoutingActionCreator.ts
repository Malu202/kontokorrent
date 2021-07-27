import { Router } from "route-it";
import { Paths } from "../../routing/KontokorrentRouteResolver";
import { ServiceLocator } from "../../ServiceLocator";
export class RoutingActionCreator {
    constructor(private router: Router<HTMLElement>) {
    }
    navigateHome() {
        this.router.navigate(Paths.Home, null);
    }
    navigateLogin(replace?: boolean) {
        this.router.navigate(Paths.Login, null, replace);
    }
    navigateFeaturesRequired() {
        this.router.navigate(Paths.FeaturesRequired, null);
    }
    navigate(path: string) {
        this.router.navigate(path, null);
    }
    navigateKontokorrent(id: string, replace?: boolean) {
        this.router.navigate(`${Paths.Kontokorrents}/${id}`, null, replace);
    }
    navigateBezahlung(kontokorrentId: string, id: string, replace?: boolean) {
        this.router.navigate(`kontokorrents/${kontokorrentId}/bezahlungen/${id}`, null, replace);
    }
}

export function routingActionCreatorFactory(serviceLocator: ServiceLocator) {
    return serviceLocator.get("RoutingActionCreator",
        serviceLocator => new RoutingActionCreator(serviceLocator.router));
}
