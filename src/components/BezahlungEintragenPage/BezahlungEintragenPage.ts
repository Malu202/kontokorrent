import template from "./BezahlungEintragenPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "./BezahlungEintragenPage.scss";
import { BezahlungActionCreator, bezahlungActionCreatorFactory } from "../../state/actions/BezahlungActionCreator";
import { BezahlungAnlegenStatus, State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import "../BezahlungEintragenForm/BezahlungEintragenForm";
import { BezahlungEintragenForm, BezahlungEintragenFormTagName } from "../BezahlungEintragenForm/BezahlungEintragenForm";
import { th } from "date-fns/locale";

export class BezahlungEintragenPage extends HTMLElement {
    private store: Store;
    private subscription: () => void;
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
    private formContainer : HTMLDivElement;
    constructor() {
        super();
        this.innerHTML = template;
        this.zurueckLink = this.querySelector("#zurueck-zum-kontokorrent");
        this.appBar = this.querySelector(AppBarTagName);
        this.bezahlungEintragenForm = this.querySelector(BezahlungEintragenFormTagName);
        this.saveButton = this.querySelector("#bezahlung-eintragen__save");
        this.editingSection = this.querySelector("#bezahlung-eintragen__edit");
        this.savingSection = this.querySelector("#bezahlung-eintragen__saving");
        this.saveError = this.querySelector("#save-error");
        this.formContainer = this.querySelector("#bezahlung-eintragen__form-container");
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.bezahlungActionCreator = bezahlungActionCreatorFactory(serviceLocator);
        this.appBar.addServices(serviceLocator);
    }

    connectedCallback() {
        this.subscription = this.store.subscribe("kontokorrents", s => this.applyStoreState(s));
        this.appBar.addEventListener("gotokontokorrent", (e: CustomEvent) => {
            this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail);
        });
        this.bezahlungActionCreator.bezahlungEintragenGeoeffnet();
        convertLinks([this.zurueckLink], this.routingActionCreator);
        this.applyStoreState(this.store.state);
        this.saveEventListener = () => this.save();
        this.saveButton.addEventListener("click", this.saveEventListener);
    }

    async save() {
        if (this.bezahlungEintragenForm.validate()) {
            let data = this.bezahlungEintragenForm.getData();
            await this.bezahlungActionCreator.bezahlungHinzufuegen(this.kontokorrentId, data);
            this.routingActionCreator.navigateKontokorrent(this.kontokorrentId, true);
        }
        else {
            this.formContainer.scrollTop = 0;
        }
    }

    private applyStoreState(s: State) {
        this.zurueckLink.href = s.kontokorrents.activeKontokorrentId ? `kontokorrents/${s.kontokorrents.activeKontokorrentId}` : null;
        if (s.kontokorrents.activeKontokorrentId) {
            this.bezahlungEintragenForm.personen = s.kontokorrents.kontokorrents[s.kontokorrents.activeKontokorrentId].personen;
            this.editingSection.style.display = s.kontokorrents.kontokorrents[s.kontokorrents.activeKontokorrentId].bezahlungAnlegen == BezahlungAnlegenStatus.Anlegen ? "none" : "flex";
            this.savingSection.style.display = s.kontokorrents.kontokorrents[s.kontokorrents.activeKontokorrentId].bezahlungAnlegen != BezahlungAnlegenStatus.Anlegen ? "none" : "flex";
            this.saveError.hidden = s.kontokorrents.kontokorrents[s.kontokorrents.activeKontokorrentId].bezahlungAnlegen != BezahlungAnlegenStatus.Failed;
        }
        this.kontokorrentId = s.kontokorrents.activeKontokorrentId;
    }

    disconnectedCallback() {
        this.subscription();
        this.saveButton.removeEventListener("click", this.saveEventListener);
    }
}

customElements.define('bezahlung-eintragen-page', BezahlungEintragenPage);
