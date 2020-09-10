import template from "./KontokorrentPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import { AccountActionCreator } from "../../state/actions/AccountActionCreator";
import { KontokorrentsActionCreator } from "../../state/actions/KontokorrentsActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";

export class KontokorrentPage extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private appBar: AppBar;

    constructor() {
        super();
        this.innerHTML = template;
        this.appBar = this.querySelector(AppBarTagName);
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = serviceLocator.routingActionCreator;
        this.accountActionCreator = serviceLocator.accountActionCreator;
        this.kontokorrentsActionCreator = serviceLocator.kontokorrentsActionCreator;
        this.appBar.addServices(serviceLocator);
    }

    connectedCallback() {
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);

    }

    private applyStoreState(state: State) {
        let kontokorrent = state.kontokorrents.kontokorrents[state.kontokorrents.activeKontokorrentId];
        if (kontokorrent) {
            (<HTMLSpanElement>(this.querySelector("#laden"))).style.display = kontokorrent.synchronisieren ? "inline" : "none";
            document.title = `${kontokorrent.name} - Kontokorrent`;
            this.querySelector("#bezahlungen-debug").innerHTML = JSON.stringify(kontokorrent.personen, null, 2);
        }
    }

    setKontokorrentId(id: string) {
        this.kontokorrentsActionCreator.kontokorrentOeffnen(id);
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('kontokorrent-page', KontokorrentPage);
