import template from "./AppBar.html";
import "./AppBar.scss";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";
import "../KontokorrentSelect/KontokorrentSelect";
import { KontokorrentSelectTagName, KontokorrentSelect } from "../KontokorrentSelect/KontokorrentSelect";
import { ServiceLocator } from "../../ServiceLocator";
import { AccountActionCreator } from "../../state/actions/AccountActionCreator";
import { Store } from "../../state/Store";
import { State } from "../../state/State";
import { Popup } from "../ui-components/popup/popup";

export class AppBar extends HTMLElement {
    private kontokorrentSelect: KontokorrentSelect;
    private store: Store;
    private routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private logoutDialog: Popup;
    private subscription: () => void;


    constructor() {
        super();
        this.innerHTML = template;
        this.kontokorrentSelect = this.querySelector(KontokorrentSelectTagName);
        this.logoutDialog = this.querySelector("#logout-dialog");
    }

    connectedCallback() {
        document.body.classList.add("body--app-bar");
        this.querySelector("#logout-button").addEventListener("click", (e: MouseEvent) => {
            this.logoutDialog.toggle();
            e.stopPropagation();
        });
        this.querySelector("#confirm-logout").addEventListener("click", async () => {
            await this.accountActionCreator.logout();
        });
        this.querySelector("#abort-logout").addEventListener("click", () => {
            this.logoutDialog.hide();
        });
        convertLinks(this.querySelectorAll("a"), this.routingActionCreator);
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        this.kontokorrentSelect.addEventListener("addkontokorrent", () => {
            this.routingActionCreator.navigateLogin();
        });
    }

    applyStoreState(state: State): void {
        this.kontokorrentSelect.kontokorrents = Object.values(state.kontokorrents.kontokorrents);
        this.kontokorrentSelect.setAttribute("active-kontokorrent-id", state.kontokorrents.activeKontokorrentId);
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = RoutingActionCreator.locate(serviceLocator);
        this.accountActionCreator = AccountActionCreator.locate(serviceLocator);
    }

    disconnectedCallback() {
        document.body.classList.remove("body--app-bar");
        this.subscription();
    }
}
export const AppBarTagName = "app-bar";
customElements.define(AppBarTagName, AppBar);
