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
import { KontokorrentListenActionCreator, kontokorrentListenActionCreatorFactory } from "../../state/actions/KontokorrentListenActionCreator";
import { KontokorrentHinzufuegenActionCreator, kontokorrentHinzufuegenActionCreatorFactory } from "../../state/actions/KontokorrentHinzufuegenActionCreator";
import "../ui-components/popup/popup";
import "../ui-components/tip-button/tip-button";
import { convertLinks } from "../convertLinks";

export class CreateKontokorrent extends HTMLElement {
    store: Store;
    subscription: () => void;
    routingActionCreator: RoutingActionCreator;
    private accountActionCreator: AccountActionCreator;


    private personenListe: PersonenListe;
    private emptyNameError: HTMLDivElement;
    private eventCreateError: HTMLDivElement;
    private personCountError: HTMLDivElement;
    private eventNameError: HTMLDivElement;
    private createButton: HTMLButtonElement;
    private eventName: HTMLInputElement;
    private readonly kontokorrentId: string;
    private creating: HTMLDivElement;
    private oeffentlicherName: HTMLInputElement;
    private oeffentlich: HTMLInputElement;
    private oeffentlichBox: HTMLDivElement;
    private oeffentlicherNameManuell: boolean;
    private oeffentlicherNameError: HTMLDivElement;
    private eventNameDuplicate: HTMLDivElement;
    private kontokorrentHinzufuegenActionCreator: KontokorrentHinzufuegenActionCreator;
    private accountCreationFailed: HTMLDivElement;
    private personNameDuplicateError: HTMLDivElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.kontokorrentId = uuid();
        this.oeffentlicherNameManuell = false;
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.accountActionCreator = accountActionCreatorFactory(serviceLocator);
        this.kontokorrentHinzufuegenActionCreator = kontokorrentHinzufuegenActionCreatorFactory(serviceLocator);
    }

    connectedCallback() {
        let element = this;
        this.personenListe = element.querySelector("#personen-liste");
        this.emptyNameError = element.querySelector("#empty-name-error");
        this.eventCreateError = element.querySelector("#event-create-error");
        this.personCountError = element.querySelector("#person-count-error");
        this.eventNameError = element.querySelector("#event-name-error");
        this.createButton = element.querySelector("#create-button");
        this.eventName = element.querySelector("#event-name");
        this.creating = element.querySelector("#creating");
        this.oeffentlicherName = element.querySelector("#oeffentlicher-name");
        this.oeffentlich = element.querySelector("#oeffentlich");
        this.oeffentlichBox = element.querySelector("#oeffentlich-box");
        this.oeffentlicherNameError = element.querySelector("#oeffentlicher-name-error");
        this.eventNameDuplicate = element.querySelector("#event-name-duplicate");
        this.accountCreationFailed = element.querySelector("#account-creation-failed");
        this.personNameDuplicateError = element.querySelector("#person-name-duplicate-error");


        this.createButton.addEventListener("click", this.createEvent.bind(this));

        this.oeffentlich.addEventListener("change", () => {
            this.oeffentlichBox.style.display = this.oeffentlich.checked ? "block" : "none";
        });

        this.eventName.addEventListener("change", () => {
            if (!this.oeffentlicherNameManuell) {
                this.oeffentlicherName.value = (this.eventName.value || "").toLowerCase();
            }
        });

        this.oeffentlicherName.addEventListener("change", () => {
            this.oeffentlicherNameManuell = true;
        });

        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.applyStoreState(this.store.state);
        convertLinks(element.querySelectorAll("a"), this.routingActionCreator);
    }

    async createEvent() {
        let eventName = this.eventName.value;
        let personNames = this.personenListe.personen;
        this.eventNameError.style.display = eventName ? "none" : "block";
        let personCountOk = personNames.length >= 2;
        this.personCountError.style.display = personCountOk ? "none" : "block";
        let personNameError = personNames.some(v => !v);
        this.emptyNameError.style.display = personNameError ? "block" : "none";
        let oeffentlicherNameError = this.oeffentlich.checked && (!this.oeffentlicherName.value || !/^[a-z0-9]+$/.test(this.oeffentlicherName.value));
        this.oeffentlicherNameError.style.display = oeffentlicherNameError ? "block" : "none";
        let personNameDuplicateError = (personNames.some((item, index) => personNames.indexOf(item) != index));
        this.personNameDuplicateError.style.display = personNameDuplicateError ? "block" : "none";
        if (eventName && personCountOk && !personNameError && !oeffentlicherNameError && !personNameDuplicateError) {
            if (await this.accountActionCreator.ensureAccount()) {
                if (await this.kontokorrentHinzufuegenActionCreator.kontokorrentErstellen(this.kontokorrentId, this.eventName.value, this.oeffentlich.checked ? this.oeffentlicherName.value : null, personNames)) {
                    await this.routingActionCreator.navigateKontokorrentById(this.kontokorrentId);
                };
            }
        } else {
            document.scrollingElement.scroll({ top: 0, behavior: "smooth" });
        }
    }

    private applyStoreState(state: State) {
        this.creating.style.display = state.kontokorrents.creating || state.account.accountCreating ? "block" : "none";
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