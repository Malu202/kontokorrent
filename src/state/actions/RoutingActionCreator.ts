import { Router } from "route-it";
import { Paths } from "../../routing/KontokorrentRouteResolver";
export class RoutingActionCreator {
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
    navigateKontokorrent(id: string) {
        this.router.navigate(`${Paths.Kontokorrents}/${id}`, null);
    }
}
