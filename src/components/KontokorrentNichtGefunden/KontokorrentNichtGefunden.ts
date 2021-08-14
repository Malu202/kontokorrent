import { OeffentlicherNameParam } from "../../routing/KontokorrentRouteResolver";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { Store } from "../../state/Store";
import { State } from "../../state/State";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import template from "./KontokorrentNichtGefunden.html";
import "./KontokorrentNichtGefunden.scss";
import { KontokorrentHinzufuegenActionCreator, kontokorrentHinzufuegenActionCreatorFactory } from "../../state/actions/KontokorrentHinzufuegenActionCreator";

export class KontokorrentNichtGefunden extends HTMLElement {
    private rendered = false;
    private store: Store;
    private routingActionCreator: RoutingActionCreator;
    private serviceLocator: ServiceLocator;
    private appBar: AppBar;
    private oeffentlicherKontokorrentLabel: HTMLSpanElement;
    private hinzufuegenBtn: HTMLButtonElement;
    private oeffentlicherName: string;
    private hinzufuegenClickListener: (e: MouseEvent) => void;
    private subscription: () => void;
    private kontokorrentHinzufuegenActionCreator: KontokorrentHinzufuegenActionCreator;
    private notFoundError: HTMLDivElement;
    private processing: HTMLDivElement;

    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.kontokorrentHinzufuegenActionCreator = kontokorrentHinzufuegenActionCreatorFactory(serviceLocator);
        this.serviceLocator = serviceLocator;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.oeffentlicherKontokorrentLabel = this.querySelector("#oeffentlicher-name");
            this.hinzufuegenBtn = this.querySelector("#hinzufuegen-btn");
            this.notFoundError = this.querySelector("#notFoundError");
            this.processing = this.querySelector("#hinzufuegen__progress");
            this.appBar = this.querySelector(AppBarTagName);
            this.appBar.addServices(this.serviceLocator);
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has(OeffentlicherNameParam)) {
                this.oeffentlicherName = searchParams.get(OeffentlicherNameParam).toLowerCase();
                this.oeffentlicherKontokorrentLabel.innerText = this.oeffentlicherName;
            }
        }
        this.appBar.addEventListener("gotokontokorrent", async (e: CustomEvent) => {
            await this.routingActionCreator.navigateKontokorrentById(e.detail);
        });
        this.hinzufuegenClickListener = () => this.hinzufuegen();
        this.hinzufuegenBtn.addEventListener("click", this.hinzufuegenClickListener);
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        this.kontokorrentHinzufuegenActionCreator.nichtGefundenPageGeoeffnet();
    }

    private async hinzufuegen() {
        let id = await this.kontokorrentHinzufuegenActionCreator.kontokorrentHinzufuegen(this.oeffentlicherName);
        if (id) {
            await this.routingActionCreator.navigateKontokorrentById(id);
        };
    }

    private applyStoreState(state: State) {
        this.notFoundError.style.display = !state.kontokorrents.hinzufuegen && state.kontokorrents.hinzufuegenFailed && state.kontokorrents.hinzufuegenFailed.kontokorrentNotFound ?
            "block" : "none";
        let processing = state.kontokorrents.hinzufuegen || state.account.accountCreating;
        this.processing.style.display = processing ? "flex" : "none";
        this.hinzufuegenBtn.style.display = !processing ? "inline-flex" : "none";
    }

    disconnectedCallback() {
        this.subscription();
        this.hinzufuegenBtn.removeEventListener("click", this.hinzufuegenClickListener);
    }
}

customElements.define("kontokorrent-nicht-gefunden", KontokorrentNichtGefunden);
