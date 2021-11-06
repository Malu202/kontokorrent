import template from "./BezahlungEintragenPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "./BezahlungEintragenPage.scss";
import { BezahlungActionCreator, bezahlungActionCreatorFactory } from "../../state/actions/BezahlungActionCreator";
import { RequestStatus, State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import "../BezahlungEintragenForm/BezahlungEintragenForm";
import { BezahlungEintragenForm, BezahlungEintragenFormTagName } from "../BezahlungEintragenForm/BezahlungEintragenForm";
import { Debouncer } from "../../utils/Debouncer";
import "../Spinner/Spinner";

export class BezahlungEintragenPage extends HTMLElement {
    private store: Store;
    private kontokorrentsSubscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private appBar: AppBar;
    private bezahlungActionCreator: BezahlungActionCreator;
    private zurueckLink: HTMLAnchorElement;
    private bezahlungEintragenForm: BezahlungEintragenForm;
    private saveButton: HTMLButtonElement;
    private saveEventListener: () => void;
    private kontokorrentId: string;
    private editingSection: HTMLDivElement;
    private savingSection: HTMLDivElement;
    private saveError: HTMLDivElement;
    private formContainer: HTMLDivElement;
    private beschreibungVorschlagSubscription: () => void;
    private betreffVorschlagDebouncer = new Debouncer();
    private rendered = false;
    private serviceLocator: ServiceLocator;

    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.bezahlungActionCreator = bezahlungActionCreatorFactory(serviceLocator);
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.zurueckLink = this.querySelector("#zurueck-zum-kontokorrent");
            this.appBar = this.querySelector(AppBarTagName);
            this.appBar.addServices(this.serviceLocator);
            this.bezahlungEintragenForm = this.querySelector(BezahlungEintragenFormTagName);
            this.saveButton = this.querySelector("#bezahlung-eintragen__save");
            this.editingSection = this.querySelector("#bezahlung-eintragen__edit");
            this.savingSection = this.querySelector("#bezahlung-eintragen__saving");
            this.saveError = this.querySelector("#save-error");
            this.formContainer = this.querySelector("#bezahlung-eintragen__form-container");
        }
        this.kontokorrentsSubscription = this.store.subscribe("kontokorrents", s => this.applyStoreState(s));
        this.beschreibungVorschlagSubscription = this.store.subscribe("beschreibungVorschlaege", s => this.beschreibungVorschlaegeChanged(s));
        this.appBar.addEventListener("gotokontokorrent", (e: CustomEvent) => {
            this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail);
        });
        this.bezahlungActionCreator.bezahlungEintragenGeoeffnet();
        convertLinks([this.zurueckLink], this.routingActionCreator);
        this.applyStoreState(this.store.state);
        this.saveEventListener = () => this.save();
        this.saveButton.addEventListener("click", this.saveEventListener);
        this.bezahlungEintragenForm.addEventListener("betreffChanged", (ev: CustomEvent) => this.betreffChanged(ev.detail));
    }

    private async betreffChanged(betreff: string) {
        try {
            await this.betreffVorschlagDebouncer.trigger(200);
        }
        catch (err) {
            //aborted
        }
        this.bezahlungActionCreator.getBeschreibungVorschlaege(this.kontokorrentId, betreff);
    }
    private beschreibungVorschlaegeChanged(s: State): void {
        if (s.beschreibungVorschlaege?.kontokorrentId == this.kontokorrentId) {
            this.bezahlungEintragenForm.beschreibungVorschlaege = s.beschreibungVorschlaege.vorschlaege.slice(0, 10);
        }
        else {
            this.bezahlungEintragenForm.beschreibungVorschlaege = [];
        }
    }

    private async save() {
        if (this.bezahlungEintragenForm.validate()) {
            let data = this.bezahlungEintragenForm.getData();
            await this.bezahlungActionCreator.bezahlungHinzufuegen(this.kontokorrentId, data);
            await this.routingActionCreator.navigateKontokorrentById(this.kontokorrentId, true);
        }
        else {
            this.formContainer.scroll({ top: 0, behavior: "smooth" });
        }
    }

    private applyStoreState(s: State) {
        if (s.kontokorrents.activeKontokorrentId) {
            let kk = s.kontokorrents.kontokorrents[s.kontokorrents.activeKontokorrentId];
            this.zurueckLink.href = s.kontokorrents.activeKontokorrentId ? `kontokorrents/o/${kk.oeffentlicherName}` : null;
            this.bezahlungEintragenForm.personen = kk.personen;
            this.editingSection.style.display = kk.bezahlungAnlegen == RequestStatus.InProgress ? "none" : "flex";
            this.savingSection.style.display = kk.bezahlungAnlegen != RequestStatus.InProgress ? "none" : "flex";
            this.saveError.hidden = kk.bezahlungAnlegen != RequestStatus.Failed;
        }
        this.kontokorrentId = s.kontokorrents.activeKontokorrentId;
    }

    disconnectedCallback() {
        this.kontokorrentsSubscription();
        this.beschreibungVorschlagSubscription();
        this.saveButton.removeEventListener("click", this.saveEventListener);
    }
}

customElements.define('bezahlung-eintragen-page', BezahlungEintragenPage);
