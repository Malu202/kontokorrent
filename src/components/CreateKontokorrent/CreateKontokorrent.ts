import template from "./CreateKontokorrent.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { State } from "../../state/State";
import { AccountActionCreator, accountActionCreatorFactory } from "../../state/actions/AccountActionCreator";
import "../PersonenListe/PersonenListe";
import { PersonenListe } from "../PersonenListe/PersonenListe";
import { v4 as uuid } from "uuid";
import "./CreateKontokorrent.scss";
import { KontokorrentHinzufuegenActionCreator, kontokorrentHinzufuegenActionCreatorFactory } from "../../state/actions/KontokorrentHinzufuegenActionCreator";
import "../ui-components/popup/popup";
import "../ui-components/tip-button/tip-button";
import { convertLinks } from "../convertLinks";
import "../Spinner/Spinner";

export class CreateKontokorrent extends HTMLElement {
    store: Store;
    subscription: () => void;
    routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;


    private personenListe: PersonenListe;
    private emptyNameError: HTMLDivElement;
    private eventCreateError: HTMLDivElement;
    private personCountError: HTMLDivElement;
    private eventNameRequiredError: HTMLDivElement;
    private createButton: HTMLButtonElement;
    private eventName: HTMLInputElement;
    private readonly kontokorrentId: string;
    private creating: HTMLDivElement;
    private eventNameDuplicate: HTMLDivElement;
    private kontokorrentHinzufuegenActionCreator: KontokorrentHinzufuegenActionCreator;
    private accountCreationFailed: HTMLDivElement;
    private personNameDuplicateError: HTMLDivElement;
    private rendered = false;
    private eventNameError: HTMLDivElement;

    constructor() {
        super();
        this.kontokorrentId = uuid();
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
            this.personenListe = this.querySelector("#personen-liste");
            this.emptyNameError = this.querySelector("#empty-name-error");
            this.eventCreateError = this.querySelector("#event-create-error");
            this.personCountError = this.querySelector("#person-count-error");
            this.eventNameRequiredError = this.querySelector("#event-name-required-error");
            this.eventNameError = this.querySelector("#event-name-error");
            this.createButton = this.querySelector("#create-button");
            this.eventName = this.querySelector("#event-name");
            this.creating = this.querySelector("#creating");
            this.eventNameDuplicate = this.querySelector("#event-name-duplicate");
            this.accountCreationFailed = this.querySelector("#account-creation-failed");
            this.personNameDuplicateError = this.querySelector("#person-name-duplicate-error");
        }

        this.createButton.addEventListener("click", this.createEvent.bind(this));
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        convertLinks(this.querySelectorAll("a"), this.routingActionCreator);
    }

    private async createEvent() {
        let eventName = this.eventName.value;
        let personNames = this.personenListe.personen;
        this.eventNameRequiredError.style.display = eventName ? "none" : "block";
        let personCountOk = personNames.length >= 2;
        this.personCountError.style.display = personCountOk ? "none" : "block";
        let personNameError = personNames.some(v => !v);
        this.emptyNameError.style.display = personNameError ? "block" : "none";
        let oeffentlicherName = (this.eventName.value || "").toLowerCase();
        let nameError = (oeffentlicherName && !/^[a-z0-9]+$/.test(oeffentlicherName));
        this.eventNameError.style.display = nameError ? "block" : "none";
        let personNameDuplicateError = (personNames.some((item, index) => personNames.indexOf(item) != index));
        this.personNameDuplicateError.style.display = personNameDuplicateError ? "block" : "none";
        if (eventName && personCountOk && !personNameError && !nameError && !personNameDuplicateError) {
            if (await this.accountActionCreator.ensureAccount()) {
                if (await this.kontokorrentHinzufuegenActionCreator.kontokorrentErstellen(this.kontokorrentId, this.eventName.value, oeffentlicherName, personNames)) {
                    await this.routingActionCreator.navigateKontokorrentById(this.kontokorrentId);
                };
            }
        } else {
            document.scrollingElement.scroll({ top: 0, behavior: "smooth" });
        }
    }

    private applyStoreState(state: State) {
        this.creating.style.display = state.kontokorrents.creating || state.account.accountCreating ? "flex" : "none";
        this.eventCreateError.style.display = state.kontokorrents.creationFailed ? "block" : "none";
        this.eventNameDuplicate.style.display = state.kontokorrents.creationFailed && state.kontokorrents.creationFailed.exists ? "block" : "none";
        this.accountCreationFailed.style.display = !state.account.accountCreating && state.account.accountCreationFailed ?
            "block" : "none";
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define('app-create-event', CreateKontokorrent);