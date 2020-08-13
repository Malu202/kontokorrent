import template from "./AppBar.html";
import "./AppBar.scss";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";
import "../KontokorrentSelect/KontokorrentSelect";
import { KontokorrentSelectTagName, KontokorrentSelect } from "../KontokorrentSelect/KontokorrentSelect";
import { ServiceLocator } from "../../ServiceLocator";
import { AccountActionCreator } from "../../state/actions/AccountActionCreator";
import { KontokorrentsActionCreator } from "../../state/actions/KontokorrentsActionCreator";
import { Store } from "../../state/Store";
import { State } from "../../state/State";
import { stat } from "fs";

export class AppBar extends HTMLElement {
    private kontokorrentSelect: KontokorrentSelect;
    private store: Store;
    private routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private subscription: () => void;


    constructor() {
        super();
        this.innerHTML = template;
        this.kontokorrentSelect = this.querySelector(KontokorrentSelectTagName);
    }

    connectedCallback() {
        document.body.classList.add("body--app-bar");
        this.querySelector("#logout-button").addEventListener("click", async () => {
            await this.accountActionCreator.logout();
        });
        convertLinks(this.querySelectorAll("a"), this.routingActionCreator);
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        this.kontokorrentSelect.addEventListener("addkontokorrent", () => {
            this.routingActionCreator.navigateLogin();
        });
        this.kontokorrentSelect.addEventListener("gotokontokorrent", (e: CustomEvent) => {
            this.routingActionCreator.navigateKontokorrent(e.detail);
        });
    }

    applyStoreState(state: State): void {
        this.kontokorrentSelect.kontokorrents = Object.values(state.kontokorrents.kontokorrents);
        this.kontokorrentSelect.setAttribute("active-kontokorrent-id", state.kontokorrents.activeKontokorrentId);
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = serviceLocator.routingActionCreator;
        this.accountActionCreator = serviceLocator.accountActionCreator;
        this.kontokorrentsActionCreator = serviceLocator.kontokorrentsActionCreator;
    }

    disconnectedCallback() {
        document.body.classList.remove("body--app-bar");
        this.subscription();
    }
}
export const AppBarTagName = "app-bar";
customElements.define(AppBarTagName, AppBar);
