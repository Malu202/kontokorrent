import template from "./home.html";
import { Store } from "../state/Store";
import { ServiceLocator } from "../ServiceLocator";
import { RoutingActionCreator } from "../state/actions/RoutingActionCreator";
import { State } from "../state/State";
import { convertLinks } from "./convertLinks";
import { AccountActionCreator } from "../state/actions/AccountActionCreator";
import { KontokorrentsActionCreator } from "../state/actions/KontokorrentsActionCreator";

export class Home extends HTMLElement {
    private store: Store;
    private subscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;
    private logoutButton: HTMLButtonElement;
    private loginExpired: HTMLDivElement;
    private kontokorrentsActionCreator: KontokorrentsActionCreator;
    private kontokorrentListe: HTMLUListElement;

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
        this.logoutButton = element.querySelector("#logout-button");
        this.kontokorrentListe = element.querySelector("#kontokorrent-liste");
        this.loginExpired = element.querySelector("#login-expired");

        this.logoutButton.addEventListener("click", this.logout.bind(this));
        convertLinks(element.querySelectorAll("a"), this.routingActionCreator);

        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);

        this.kontokorrentsActionCreator.syncKontokorrentListe();
    }

    private applyStoreState(state: State) {
        this.loginExpired.style.display = state.account.loginExpired ? "block" : "none";
        this.kontokorrentListe.innerHTML = "";
        Object.keys(state.kontokorrents.kontokorrents).forEach(id => {
            let li = document.createElement("li");
            li.innerText = state.kontokorrents.kontokorrents[id].name;
            this.kontokorrentListe.appendChild(li);
        })
    }

    logout() {
        this.accountActionCreator.logout();
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('app-home', Home);
