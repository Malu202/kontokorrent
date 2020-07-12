import template from "./Login.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import { AccountActionCreator } from "../../state/actions/AccountActionCreator";
import { KontokorrentsActionCreator } from "../../state/actions/KontokorrentsActionCreator";

export class Login extends HTMLElement {
    store: Store;
    subscription: () => void;
    routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private eventInput: HTMLInputElement;
    private loginButton: HTMLButtonElement;
    private eventMissingError: HTMLDivElement;
    private accountCreationFailed: HTMLDivElement;
    private notFoundError: HTMLDivElement;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private processing: HTMLDivElement;

    constructor() {
        super();
        this.innerHTML = template;
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = serviceLocator.routingActionCreator;
        this.accountActionCreator = serviceLocator.accountActionCreator;
        this.kontokorrentsActionCreator = serviceLocator.kontokorrentsActionCreator;
    }

    connectedCallback() {
        let element = this;
        convertLinks(element.querySelectorAll("a"), this.routingActionCreator);
        this.eventInput = element.querySelector("#eventInput");
        this.loginButton = element.querySelector("#loginButton");
        this.eventMissingError = element.querySelector("#eventMissingError");
        this.accountCreationFailed = element.querySelector("#account-creation-failed");
        this.notFoundError = element.querySelector("#notFoundError");
        this.processing = element.querySelector("#processing");

        this.loginButton.addEventListener("click", this.loginFuerEvent.bind(this));

        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        this.accountActionCreator.initializeAccount();
    }

    async loginFuerEvent() {
        let event = this.eventInput.value;
        this.eventMissingError.style.display = event ? "none" : "block";
        if (event) {
            if (await this.accountActionCreator.ensureAccount()) {
                if (await this.kontokorrentsActionCreator.kontokorrentHinzufuegen(event)) {
                    this.routingActionCreator.navigateHome();
                };
            }
        }
    }

    private applyStoreState(state: State) {
        this.accountCreationFailed.style.display = !state.account.accountCreating && state.account.accountCreationFailed ?
            "block" : "none";
        this.notFoundError.style.display = !state.kontokorrents.hinzufuegen && state.kontokorrents.hinzufuegenFailed && state.kontokorrents.hinzufuegenFailed.kontokorrentNotFound ?
            "block" : "none";
        this.processing.style.display = state.kontokorrents.hinzufuegen || state.account.accountCreating ? "block" : "none";
    }

    disconnectedCallback() {

        this.subscription();
    }
}

customElements.define('app-login', Login);