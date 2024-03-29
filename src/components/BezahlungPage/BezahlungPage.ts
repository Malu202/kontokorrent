import template from "./BezahlungPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "./BezahlungPage.scss";
import { BezahlungActionCreator, bezahlungActionCreatorFactory } from "../../state/actions/BezahlungActionCreator";
import { RequestStatus, State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import "../BezahlungEintragenForm/BezahlungEintragenForm";
import { BezahlungEintragenForm, BezahlungEintragenFormTagName } from "../BezahlungEintragenForm/BezahlungEintragenForm";
import { Debouncer } from "../../utils/Debouncer";
import { BearbeitungsStatus } from "../../lib/BearbeitungsStatus";
import { Popup } from "../ui-components/popup/popup";
import "../Spinner/Spinner";

export class BezahlungPage extends HTMLElement {
    private store: Store;
    private kontokorrentsSubscription: () => void;
    private routingActionCreator: RoutingActionCreator;
    private appBar: AppBar;
    private bezahlungActionCreator: BezahlungActionCreator;
    private zurueckLink: HTMLAnchorElement;
    private bezahlungEintragenForm: BezahlungEintragenForm;
    private editingSection: HTMLDivElement;
    private updatingSection: HTMLDivElement;
    private deletingSection: HTMLDivElement;
    private formContainer: HTMLDivElement;
    private beschreibungVorschlagSubscription: () => void;
    private betreffVorschlagDebouncer = new Debouncer();
    private bezahlungIdParameter: string;
    private bezahlungNichtGefundenError: HTMLDivElement;
    private bezahlungZwischengespeichertError: HTMLDivElement;
    private bezahlungGeloeschtError: HTMLDivElement;
    private bezahlungBearbeitetError: HTMLDivElement;
    private updateButton: HTMLButtonElement;
    private deleteButton: HTMLButtonElement;
    private dataLoaded: boolean = false;
    private updateDialog: Popup;
    private deleteDialog: Popup;
    private updateError: HTMLDivElement;
    private deleteError: HTMLDivElement;
    private activeKontokorrentId: string;
    private rendered = false;
    private serviceLocator: ServiceLocator;

    constructor() {
        super();

    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.bezahlungActionCreator = bezahlungActionCreatorFactory(serviceLocator);
        this.serviceLocator = serviceLocator;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.zurueckLink = this.querySelector("#zurueck-zum-kontokorrent");
            this.appBar = this.querySelector(AppBarTagName);
            this.appBar.addServices(this.serviceLocator);
            this.bezahlungEintragenForm = this.querySelector(BezahlungEintragenFormTagName);
            this.bezahlungNichtGefundenError = this.querySelector("#bezahlung-nicht-gefunden-error");
            this.bezahlungZwischengespeichertError = this.querySelector("#bezahlung-zwischengespeichert-error");
            this.bezahlungGeloeschtError = this.querySelector("#bezahlung-geloescht-error");
            this.bezahlungBearbeitetError = this.querySelector("#bezahlung-bearbeitet-error");
            this.updateButton = this.querySelector("#bezahlung__update");
            this.deleteButton = this.querySelector("#bezahlung__delete");
            this.editingSection = this.querySelector("#bezahlung__edit");
            this.updatingSection = this.querySelector("#bezahlung__updating");
            this.deletingSection = this.querySelector("#bezahlung__deleting");
            this.updateError = this.querySelector("#update-error");
            this.deleteError = this.querySelector("#delete-error");
            this.formContainer = this.querySelector("#bezahlung__form-container");
        }
        this.kontokorrentsSubscription = this.store.subscribe("kontokorrents", s => this.applyStoreState(s));
        this.beschreibungVorschlagSubscription = this.store.subscribe("beschreibungVorschlaege", s => this.beschreibungVorschlaegeChanged(s));
        this.appBar.addEventListener("gotokontokorrent", async (e: CustomEvent) => {
            await this.routingActionCreator.navigateKontokorrentById(e.detail);
        });
        convertLinks([this.zurueckLink], this.routingActionCreator);
        this.beschreibungVorschlaegeChanged(this.store.state);
        this.bezahlungEintragenForm.addEventListener("betreffChanged", (ev: CustomEvent) => this.betreffChanged(ev.detail));
        this.updateDialog = this.querySelector("#update-dialog");
        this.deleteDialog = this.querySelector("#delete-dialog");
        this.querySelector("#bezahlung__update").addEventListener("click", (e: MouseEvent) => {
            if (this.bezahlungEintragenForm.validate()) {
                this.updateDialog.show();
            }
            else {
                this.formContainer.scroll({ top: 0, behavior: "smooth" });
            }
            e.stopPropagation();
        });
        this.querySelector("#confirm-update").addEventListener("click", async () => {
            this.updateDialog.hide();
            let data = this.bezahlungEintragenForm.getData();
            await this.bezahlungActionCreator.bezahlungBearbeiten(this.activeKontokorrentId, this.bezahlungIdParameter, data);
            await this.routingActionCreator.navigateKontokorrentById(this.activeKontokorrentId);
        });
        this.querySelector("#abort-update").addEventListener("click", () => {
            this.updateDialog.hide();
        });
        this.querySelector("#bezahlung__delete").addEventListener("click", (e: MouseEvent) => {
            this.deleteDialog.show();
            e.stopPropagation();
        });
        this.querySelector("#confirm-delete").addEventListener("click", async () => {
            this.deleteDialog.hide();
            await this.bezahlungActionCreator.bezahlungLoeschen(this.activeKontokorrentId, this.bezahlungIdParameter);
            await this.routingActionCreator.navigateKontokorrentById(this.activeKontokorrentId);
        });
        this.querySelector("#abort-delete").addEventListener("click", () => {
            this.deleteDialog.hide();
        });
    }
    private async betreffChanged(betreff: string) {
        try {
            await this.betreffVorschlagDebouncer.trigger(200);
        }
        catch (err) {
            //aborted
        }
        this.bezahlungActionCreator.getBeschreibungVorschlaege(this.activeKontokorrentId, betreff);
    }
    private beschreibungVorschlaegeChanged(s: State): void {
        if (s.beschreibungVorschlaege?.kontokorrentId == this.activeKontokorrentId) {
            this.bezahlungEintragenForm.beschreibungVorschlaege = s.beschreibungVorschlaege.vorschlaege.slice(0, 10);
        }
        else {
            this.bezahlungEintragenForm.beschreibungVorschlaege = [];
        }
    }

    private applyStoreState(s: State) {
        let editable = false;
        let updating = false;
        let deleting = false;
        let updateError = false;
        let deleteError = false;
        if (s.kontokorrents.activeKontokorrentId && this.bezahlungIdParameter) {
            this.activeKontokorrentId = s.kontokorrents.activeKontokorrentId;
            let kontokorrent = s.kontokorrents.kontokorrents[s.kontokorrents.activeKontokorrentId];
            if (kontokorrent) {
                this.bezahlungEintragenForm.personen = kontokorrent.personen;
                let angezeigteBezahlung = kontokorrent.angezeigteBezahlung[this.bezahlungIdParameter];
                if (angezeigteBezahlung) {
                    this.bezahlungNichtGefundenError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.NichtGefunden;
                    this.bezahlungZwischengespeichertError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.Zwischengespeichert;
                    this.bezahlungGeloeschtError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.Geloescht;
                    this.bezahlungBearbeitetError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.Bearbeitet;
                    editable = angezeigteBezahlung.bearbeitungsStatus == BearbeitungsStatus.Bearbeitbar;
                    updating = angezeigteBezahlung.updateStatus == RequestStatus.InProgress;
                    updateError = angezeigteBezahlung.updateStatus == RequestStatus.Failed;
                    deleting = angezeigteBezahlung.deleteStatus == RequestStatus.InProgress;
                    deleteError = angezeigteBezahlung.deleteStatus == RequestStatus.Failed;
                }
                let bezahlungData = kontokorrent.bezahlungen.find(b => b.id == this.bezahlungIdParameter);
                if (kontokorrent.personen && kontokorrent.personen.length > 0
                    && bezahlungData && !this.dataLoaded) {
                    this.dataLoaded = true;
                    this.bezahlungEintragenForm.setData(bezahlungData);
                }
            }
            this.zurueckLink.href = `kontokorrents/o/${kontokorrent.oeffentlicherName}`;
        }
        this.updateButton.style.visibility = editable ? "visible" : "collapse";
        this.deleteButton.style.visibility = editable ? "visible" : "collapse";
        this.updatingSection.style.display = updating ? "" : "none";
        this.deletingSection.style.display = deleting ? "" : "none";
        this.editingSection.style.display = (updating || deleting) ? "none" : "";
        this.bezahlungEintragenForm.style.display = editable ? "" : "none";
        this.updateError.hidden = !updateError;
        this.deleteError.hidden = !deleteError;
    }

    setRouteParameters(oeffentlicherName: string, bezahlungId: string) {
        this.bezahlungIdParameter = bezahlungId;
        this.bezahlungActionCreator.bezahlungGeoeffnet(oeffentlicherName, bezahlungId);
    }

    disconnectedCallback() {
        this.kontokorrentsSubscription();
        this.beschreibungVorschlagSubscription();
    }
}

customElements.define('bezahlung-page', BezahlungPage);
