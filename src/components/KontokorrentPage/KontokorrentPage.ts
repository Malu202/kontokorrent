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

export class KontokorrentPage extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private appBar: AppBar;
    private balanceAnzeige: BalanceAnzeige;
    private bezahlungenView: BezahlungenView;
    private showMoreButton: HTMLButtonElement;
    private kontokorrent: KontokorrentState;

    constructor() {
        super();
        this.innerHTML = template;
        this.appBar = this.querySelector(AppBarTagName);
        this.balanceAnzeige = this.querySelector("#balance-anzeige");
        this.bezahlungenView = this.querySelector("#bezahlungen-view");
        this.showMoreButton = this.querySelector("#show-more");
        this.showMoreClick = this.showMoreClick.bind(this);
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = serviceLocator.routingActionCreator;
        this.accountActionCreator = serviceLocator.accountActionCreator;
        this.kontokorrentsActionCreator = serviceLocator.kontokorrentsActionCreator;
        this.appBar.addServices(serviceLocator);
    }


    showMoreClick() {
        this.bezahlungenView.anzahlEintraege += 20;
        this.setShowMoreButtonDisplay();
    }

    connectedCallback() {
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        this.showMoreButton.addEventListener("click", this.showMoreClick);
    }
    private setShowMoreButtonDisplay() {
        if (this.kontokorrent && this.kontokorrent.bezahlungen) {
        this.showMoreButton.style.display = this.kontokorrent.bezahlungen.length > this.bezahlungenView.anzahlEintraege ? "inline" : "none";
        }
    }

    private applyStoreState(state: State) {
        this.kontokorrent = state.kontokorrents.kontokorrents[state.kontokorrents.activeKontokorrentId];
        if (this.kontokorrent) {
            (<HTMLSpanElement>(this.querySelector("#laden"))).style.display = this.kontokorrent.synchronisieren ? "inline" : "none";
            document.title = `${this.kontokorrent.name} - Kontokorrent`;
            if (this.kontokorrent.personen) {
                this.balanceAnzeige.setBalance(this.kontokorrent.personen);
                this.bezahlungenView.setBezahlungen(this.kontokorrent.bezahlungen, this.kontokorrent.personen);
            }
            this.setShowMoreButtonDisplay();
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
