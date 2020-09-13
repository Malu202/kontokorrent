import template from "./KontokorrentPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { KontokorrentState, State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import { AccountActionCreator } from "../../state/actions/AccountActionCreator";
import { KontokorrentsActionCreator } from "../../state/actions/KontokorrentsActionCreator";
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
    private accountActionCreator: AccountActionCreator;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private appBar: AppBar;
    private balanceAnzeige: BalanceAnzeige;
    private bezahlungenView: BezahlungenView;
    private kontokorrentSpinner: HTMLSpanElement;
    private kontokorrent: KontokorrentState;

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

    setKontokorrentId(id: string) {
        this.kontokorrentsActionCreator.kontokorrentOeffnen(id);
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('kontokorrent-page', KontokorrentPage);
