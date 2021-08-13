import template from "./Login.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import { AccountActionCreator, accountActionCreatorFactory } from "../../state/actions/AccountActionCreator";
import "./Login.scss";
import "../ui-components/popup/popup";
import "../ui-components/tip-button/tip-button";
import { KontokorrentHinzufuegenActionCreator, kontokorrentHinzufuegenActionCreatorFactory } from "../../state/actions/KontokorrentHinzufuegenActionCreator";
import { OeffentlicherNameParam } from "../../routing/KontokorrentRouteResolver";

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
    private kontokorrentHinzufuegenActionCreator: KontokorrentHinzufuegenActionCreator;
    private processing: HTMLDivElement;
    private homeButton: HTMLButtonElement;
    private loginBox: HTMLDivElement;
    private rendered = false;

    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.accountActionCreator = accountActionCreatorFactory(serviceLocator);
        this.kontokorrentHinzufuegenActionCreator = kontokorrentHinzufuegenActionCreatorFactory(serviceLocator);
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.loginButton = this.querySelector("#loginButton");
            this.homeButton = this.querySelector("#home-button");
            this.loginBox = this.querySelector("#login-box");
            this.eventMissingError = this.querySelector("#eventMissingError");
            this.accountCreationFailed = this.querySelector("#account-creation-failed");
            this.notFoundError = this.querySelector("#notFoundError");
            this.processing = this.querySelector("#processing");
            this.eventInput = this.querySelector("#eventInput");
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has(OeffentlicherNameParam)) {
                this.eventInput.value = searchParams.get(OeffentlicherNameParam);
            }
            convertLinks(this.querySelectorAll("a"), this.routingActionCreator);
        }
        this.loginButton.addEventListener("click", this.loginFuerEvent.bind(this));
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        this.accountActionCreator.initializeAccount();
        this.kontokorrentHinzufuegenActionCreator.loginPageGeoeffnet();
    }

    private async loginFuerEvent() {
        let event = this.eventInput.value;
        this.eventMissingError.style.display = event ? "none" : "block";
        if (event) {
            if (await this.accountActionCreator.ensureAccount()) {
                let id = await this.kontokorrentHinzufuegenActionCreator.kontokorrentHinzufuegen(event);
                if (id) {
                    await this.routingActionCreator.navigateKontokorrentById(id);
                };
            }
        }
    }

    private applyStoreState(state: State) {
        this.accountCreationFailed.style.display = !state.account.accountCreating && state.account.accountCreationFailed ?
            "block" : "none";
        this.notFoundError.style.display = !state.kontokorrents.hinzufuegen && state.kontokorrents.hinzufuegenFailed && state.kontokorrents.hinzufuegenFailed.kontokorrentNotFound ?
            "block" : "none";
        let processing = state.kontokorrents.hinzufuegen || state.account.accountCreating;
        this.processing.style.display = processing ? "flex" : "none";
        this.homeButton.style.visibility = state.account.accountCreated &&
            Object.keys(state.kontokorrents.kontokorrents).length ? "visible" : "hidden";
        this.loginButton.style.display = !processing ? "inline-flex" : "none";
    }

    disconnectedCallback() {

        this.subscription();
    }
}

customElements.define('app-login', Login);