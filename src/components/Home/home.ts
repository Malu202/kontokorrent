import template from "./home.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { State } from "../../state/State";
import { KontokorrentsActionCreator } from "../../state/actions/KontokorrentsActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";

export class Home extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private loginExpired: HTMLDivElement;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private appBar: AppBar;

    constructor() {
        super();
        this.innerHTML = template;
        this.appBar = this.querySelector(AppBarTagName);
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.kontokorrentsActionCreator = KontokorrentsActionCreator.locate(serviceLocator);
        this.appBar.addServices(serviceLocator);
    }

    connectedCallback() {
        let element = this;
        this.loginExpired = element.querySelector("#login-expired");

        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);

        this.kontokorrentsActionCreator.navigiereZuLetztGesehenem(true);
    }

    private applyStoreState(state: State) {
        this.loginExpired.style.display = state.account.loginExpired ? "block" : "none";
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('app-home', Home);
