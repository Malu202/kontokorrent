import template from "./KontokorrentPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { KontokorrentState, State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "../BalanceAnzeige/BalanceAnzeigeElement";
import { BalanceAnzeige } from "../BalanceAnzeige/BalanceAnzeige";
import "../BalanceAnzeige/BalanceAnzeige";
import "../BezahlungenView/BezahlungenView";
import { BezahlungenView } from "../BezahlungenView/BezahlungenView";
import "./KontokorrentPage.scss";
import { KontokorrentActionCreator, kontokorrentActionCreatorFactory } from "../../state/actions/KontokorrentActionCreator";
import { KontokorrentListenActionCreator, kontokorrentListenActionCreatorFactory } from "../../state/actions/KontokorrentListenActionCreator";

export class KontokorrentPage extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private kontokorrentActionCreator: KontokorrentActionCreator;
    private appBar: AppBar;
    private balanceAnzeige: BalanceAnzeige;
    private bezahlungenView: BezahlungenView;
    private kontokorrentSpinner: HTMLSpanElement;
    private kontokorrent: KontokorrentState;
    private kontokorrentListenActionCreator: KontokorrentListenActionCreator;
    private bezahlungClickListener: (e: CustomEvent) => void;
    private oeffentlicherNameParameter: string;
    private rendered = false;
    private serviceLocator: ServiceLocator;

    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.kontokorrentActionCreator = kontokorrentActionCreatorFactory(serviceLocator);
        this.kontokorrentListenActionCreator = kontokorrentListenActionCreatorFactory(serviceLocator);
        this.serviceLocator = serviceLocator;
    }

    private bezahlungClick(id: string) {
        this.routingActionCreator.navigateBezahlung(this.kontokorrent.id, id);
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.appBar = this.querySelector(AppBarTagName);
            this.appBar.addServices(this.serviceLocator);
            this.balanceAnzeige = this.querySelector("#balance-anzeige");
            this.bezahlungenView = this.querySelector("#bezahlungen-view");
            this.kontokorrentSpinner = this.querySelector("#spinner");
        }
        if (!this.oeffentlicherNameParameter) {
            this.kontokorrentListenActionCreator.navigiereZuLetztGesehenem(true);
        }
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.appBar.addEventListener("gotokontokorrent", async (e: CustomEvent) => {
            await this.routingActionCreator.navigateKontokorrentById(e.detail);
        });
        convertLinks(this.querySelectorAll("#eintragen-desktop, #eintragen-mobile"), this.routingActionCreator);
        this.applyStoreState(this.store.state);
        this.bezahlungClickListener = e => this.bezahlungClick(e.detail);
        this.bezahlungenView.addEventListener("bezahlungclick", this.bezahlungClickListener);
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

    setRouteParameters(oeffentlicherName: string) {
        this.oeffentlicherNameParameter = oeffentlicherName;
        this.kontokorrentActionCreator.kontokorrentOeffnen(oeffentlicherName);
    }

    disconnectedCallback() {
        this.subscription();
        this.bezahlungenView.removeEventListener("bezahlungclick", this.bezahlungClickListener);
    }
}

customElements.define('kontokorrent-page', KontokorrentPage);
