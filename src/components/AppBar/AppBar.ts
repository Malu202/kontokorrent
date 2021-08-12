import template from "./AppBar.html";
import "./AppBar.scss";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";
import "../KontokorrentSelect/KontokorrentSelect";
import { KontokorrentSelectTagName, KontokorrentSelect } from "../KontokorrentSelect/KontokorrentSelect";
import { ServiceLocator } from "../../ServiceLocator";
import { AccountActionCreator, accountActionCreatorFactory } from "../../state/actions/AccountActionCreator";
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
    private rendered: boolean = false;



    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.kontokorrentSelect = this.querySelector(KontokorrentSelectTagName);
            this.logoutDialog = this.querySelector("#logout-dialog");
            if (this.store) {
                this.applyStoreState(this.store.state);
            }
        }
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
        this.querySelectorAll("a").forEach((e: HTMLAnchorElement) => {
            e.addEventListener("click", ev => {
                ev.preventDefault();
                this.routingActionCreator.navigate(e.getAttribute("href"));
            });
        });

        this.kontokorrentSelect.addEventListener("addkontokorrent", () => {
            this.routingActionCreator.navigateLogin();
        });
    }

    private applyStoreState(state: State): void {
        if (this.rendered) {
            this.kontokorrentSelect.kontokorrents = Object.values(state.kontokorrents.kontokorrents);
            this.kontokorrentSelect.setAttribute("active-kontokorrent-id", state.kontokorrents.activeKontokorrentId);
        }
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.accountActionCreator = accountActionCreatorFactory(serviceLocator);
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
    }

    disconnectedCallback() {
        if (this.subscription) {
            this.subscription();
            this.subscription = null;
        }

    }
}
export const AppBarTagName = "app-bar";
customElements.define(AppBarTagName, AppBar);
