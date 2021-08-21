import template from "./AppBar.html";
import "./AppBar.scss";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import "../KontokorrentSelect/KontokorrentSelect";
import { KontokorrentSelectTagName, KontokorrentSelect } from "../KontokorrentSelect/KontokorrentSelect";
import { ServiceLocator } from "../../ServiceLocator";
import { AccountActionCreator, accountActionCreatorFactory } from "../../state/actions/AccountActionCreator";
import { Store } from "../../state/Store";
import { State } from "../../state/State";
import { Popup } from "../ui-components/popup/popup";
import { ShareDialog, ShareDialogTagName, ShareKontokorrentDisplay, ShareKontokorrentOeffentlicherName } from "../ShareDialog/ShareDialog";

export class AppBar extends HTMLElement {
    private kontokorrentSelect: KontokorrentSelect;
    private store: Store;
    private routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private logoutDialog: Popup;
    private subscription: () => void;
    private rendered: boolean = false;
    private menuPopup: Popup;
    private openMenuButton: HTMLButtonElement;
    private openMenuButtonListener: (e: MouseEvent) => void;
    private shareButton: HTMLButtonElement;
    private shareDialog: Popup;
    private shareListener: (e: MouseEvent) => void;
    private ausgleichButton: HTMLAnchorElement;


    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.kontokorrentSelect = this.querySelector(KontokorrentSelectTagName);
            this.logoutDialog = this.querySelector("#logout-dialog");
            this.menuPopup = this.querySelector("#appbar-menu");
            this.shareDialog = this.querySelector("#share-dialog");
            this.shareButton = this.querySelector("#share-button");
            this.ausgleichButton = this.querySelector("#ausgleich-button");
            this.openMenuButton = this.querySelector("#open-menu-button");
            if (this.store) {
                this.applyStoreState(this.store.state);
            }
        }
        this.querySelector("#logout-button").addEventListener("click", (e: MouseEvent) => {
            this.logoutDialog.toggle();
            this.menuPopup.hide();
            e.stopPropagation();
        });
        this.querySelector("#confirm-logout").addEventListener("click", async () => {
            await this.accountActionCreator.logout();
        });
        this.querySelector("#abort-logout").addEventListener("click", () => {
            this.logoutDialog.hide();
        });
        this.openMenuButtonListener = (e: MouseEvent) => {
            this.menuPopup.toggle();
            e.stopPropagation();
        };
        this.shareListener = (e: MouseEvent) => {
            this.shareDialog.show();
            e.stopPropagation();
            if (!this.shareDialog.querySelector(ShareDialogTagName)) {
                let dialog = new ShareDialog();
                dialog.addEventListener("sharedone", () => {
                    this.shareDialog.hide();
                });
                this.shareDialog.appendChild(dialog);
                this.applyStoreStateToShareDialog(this.store.state);
            }
        };
        this.shareButton.addEventListener("click", this.shareListener);
        this.openMenuButton.addEventListener("click", this.openMenuButtonListener);
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
            this.shareButton.disabled = !state.kontokorrents.activeKontokorrentId;
            this.ausgleichButton.style.display = state.kontokorrents.activeKontokorrentId ? "" : "none";
            this.applyStoreStateToShareDialog(state);
            let kontokorrent = state.kontokorrents.kontokorrents[state.kontokorrents.activeKontokorrentId];
            if (kontokorrent) {
                this.ausgleichButton.href = `kontokorrents/o/${kontokorrent.oeffentlicherName}/ausgleich-erstellen`;
            } else {
                this.ausgleichButton.href = "";
            }
        }
    }

    private applyStoreStateToShareDialog(state: State) {
        let dialog = this.shareDialog.querySelector(ShareDialogTagName);
        let kontokorrent = state.kontokorrents.kontokorrents[state.kontokorrents.activeKontokorrentId];
        if (dialog && kontokorrent) {
            dialog.setAttribute(ShareKontokorrentDisplay, kontokorrent.name);
            dialog.setAttribute(ShareKontokorrentOeffentlicherName, kontokorrent.oeffentlicherName);
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
        this.openMenuButton.removeEventListener("click", this.openMenuButtonListener);
        this.shareButton.removeEventListener("click", this.shareListener);
    }
}
export const AppBarTagName = "app-bar";
customElements.define(AppBarTagName, AppBar);
