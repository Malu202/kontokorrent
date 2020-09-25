import template from "./BezahlungEintragenPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "./BezahlungEintragenPage.scss";
import { BezahlungActionCreator } from "../../state/actions/BezahlungActionCreator";
import { State } from "../../state/State";
import { convertLinks } from "../convertLinks";

export class BezahlungEintragenPage extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private appBar: AppBar;
    private bezahlungActionCreator: BezahlungActionCreator;
    private zurueckLink: HTMLAnchorElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.zurueckLink = this.querySelector("#zurueck-zum-kontokorrent");
        this.appBar = this.querySelector(AppBarTagName);
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = serviceLocator.routingActionCreator;
        this.bezahlungActionCreator = serviceLocator.bezahlungActionCreator;
        this.appBar.addServices(serviceLocator);
    }

    connectedCallback() {
        this.subscription = this.store.subscribe("kontokorrents", s => this.applyStoreState(s));
        this.appBar.addEventListener("gotokontokorrent", (e: CustomEvent) => {
            this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail);
        });
        this.bezahlungActionCreator.bezahlungEintragenGeoeffnet();
        convertLinks([this.zurueckLink], this.routingActionCreator);
    }

    private applyStoreState(s: State) {
        this.zurueckLink.href = s.kontokorrents.activeKontokorrentId ? `kontokorrents/${s.kontokorrents.activeKontokorrentId}` : null;
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('bezahlung-eintragen-page', BezahlungEintragenPage);
