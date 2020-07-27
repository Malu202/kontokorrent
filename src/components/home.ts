import template from "./home.html";
import { Store } from "../state/Store";
import { ServiceLocator } from "../ServiceLocator";
import { RoutingActionCreator } from "../state/actions/RoutingActionCreator";
import { State } from "../state/State";
import { convertLinks } from "./convertLinks";
import { AccountActionCreator } from "../state/actions/AccountActionCreator";

export class Home extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private logoutButton: HTMLButtonElement;
    private loginExpired: HTMLDivElement;

    constructor() {
        super();
        this.innerHTML = template;
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = serviceLocator.routingActionCreator;
        this.accountActionCreator = serviceLocator.accountActionCreator;
    }

    connectedCallback() {
        let element = this;
        this.logoutButton = element.querySelector("#logout-button");
        this.loginExpired = element.querySelector("#login-expired");

        this.logoutButton.addEventListener("click", this.logout.bind(this));
        convertLinks(element.querySelectorAll("a"), this.routingActionCreator);

        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
    }

    private applyStoreState(state: State) {
        this.loginExpired.style.display = state.account.loginExpired ? "block" : "none";
    }

    logout() {
        this.accountActionCreator.logout();
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('app-home', Home);
