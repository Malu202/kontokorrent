import template from "./KontokorrentPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { KontokorrentState, State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import { KontokorrentsActionCreator, kontokorrentsActionCreatorFactory } from "../../state/actions/KontokorrentsActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "../BalanceAnzeige/BalanceAnzeigeElement";
import { BalanceAnzeige } from "../BalanceAnzeige/BalanceAnzeige";
import "../BalanceAnzeige/BalanceAnzeige";
import "../BezahlungenView/BezahlungenView";
import { BezahlungenView } from "../BezahlungenView/BezahlungenView";
import "./KontokorrentPage.scss";

export class KontokorrentPage extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private appBar: AppBar;
    private balanceAnzeige: BalanceAnzeige;
    private bezahlungenView: BezahlungenView;
    private kontokorrentSpinner: HTMLSpanElement;
    private kontokorrent: KontokorrentState;
    private kontokorrentIdParameter: string;

    constructor() {
        super();
        this.innerHTML = template;
        this.appBar = this.querySelector(AppBarTagName);
        this.balanceAnzeige = this.querySelector("#balance-anzeige");
        this.bezahlungenView = this.querySelector("#bezahlungen-view");
        this.kontokorrentSpinner = this.querySelector("#spinner");
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.kontokorrentsActionCreator = kontokorrentsActionCreatorFactory(serviceLocator);
        this.appBar.addServices(serviceLocator);
    }

    connectedCallback() {
        if (!this.kontokorrentIdParameter) {
            this.kontokorrentsActionCreator.navigiereZuLetztGesehenem(true);
        }
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.appBar.addEventListener("gotokontokorrent", (e: CustomEvent) => {
            this.routingActionCreator.navigateKontokorrent(e.detail);
        });
        convertLinks(this.querySelectorAll("#eintragen-desktop, #eintragen-mobile"), this.routingActionCreator);
        this.applyStoreState(this.store.state);
    }

    private applyStoreState(state: State) {
        this.kontokorrent = state.kontokorrents.kontokorrents[state.kontokorrents.activeKontokorrentId];
        if (this.kontokorrent) {
            document.title = `${this.kontokorrent.name} - Kontokorrent`;
            if (this.kontokorrent.personen) {
                this.balanceAnzeige.setBalance(this.kontokorrent.personen);
                this.bezahlungenView.setBezahlungen(this.kontokorrent.bezahlungen, this.kontokorrent.personen);
            }
            this.kontokorrentSpinner.style.display = this.kontokorrent.synchronisieren ? "flex" : "none";
        }
    }

    setRouteParameters(id: string) {
        this.kontokorrentsActionCreator.kontokorrentOeffnen(id);
        this.kontokorrentIdParameter = id;
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('kontokorrent-page', KontokorrentPage);
