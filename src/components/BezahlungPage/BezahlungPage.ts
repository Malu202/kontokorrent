import template from "./BezahlungPage.html";
import { Store } from "../../state/Store";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import "./BezahlungPage.scss";
import { BezahlungActionCreator, bezahlungActionCreatorFactory } from "../../state/actions/BezahlungActionCreator";
import { BezahlungAnlegenStatus, State } from "../../state/State";
import { convertLinks } from "../convertLinks";
import "../BezahlungEintragenForm/BezahlungEintragenForm";
import { BezahlungEintragenForm, BezahlungEintragenFormTagName } from "../BezahlungEintragenForm/BezahlungEintragenForm";
import { Debouncer } from "../../utils/Debouncer";
import { BearbeitungsStatus } from "../../lib/BearbeitungsStatus";

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
    private saveError: HTMLDivElement;
    private formContainer: HTMLDivElement;
    private beschreibungVorschlagSubscription: () => void;
    private betreffVorschlagDebouncer = new Debouncer();
    private kontokorrentIdParameter: string;
    private bezahlungIdParameter: string;
    private bezahlungNichtGefundenError: HTMLDivElement;
    private bezahlungZwischengespeichertError: HTMLDivElement;
    private bezahlungGeloeschtError: HTMLDivElement;
    private bezahlungBearbeitetError: HTMLDivElement;
    private updateButton: HTMLButtonElement;
    private deleteButton: HTMLButtonElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.zurueckLink = this.querySelector("#zurueck-zum-kontokorrent");
        this.appBar = this.querySelector(AppBarTagName);
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
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.bezahlungActionCreator = bezahlungActionCreatorFactory(serviceLocator);
        this.appBar.addServices(serviceLocator);
    }

    connectedCallback() {
        this.kontokorrentsSubscription = this.store.subscribe("kontokorrents", s => this.applyStoreState(s));
        this.beschreibungVorschlagSubscription = this.store.subscribe("beschreibungVorschlaege", s => this.beschreibungVorschlaegeChanged(s));
        this.appBar.addEventListener("gotokontokorrent", (e: CustomEvent) => {
            this.routingActionCreator.navigateKontokorrent(e.detail);
        });
        convertLinks([this.zurueckLink], this.routingActionCreator);
        this.beschreibungVorschlaegeChanged(this.store.state);
        this.bezahlungEintragenForm.addEventListener("betreffChanged", (ev: CustomEvent) => this.betreffChanged(ev.detail));
    }
    async betreffChanged(betreff: string) {
        try {
            await this.betreffVorschlagDebouncer.trigger(200);
        }
        catch {
            //aborted
        }
        await this.bezahlungActionCreator.getBeschreibungVorschlaege(this.kontokorrentIdParameter, betreff);
    }
    private beschreibungVorschlaegeChanged(s: State): void {
        if (s.beschreibungVorschlaege?.kontokorrentId == this.kontokorrentIdParameter) {
            this.bezahlungEintragenForm.beschreibungVorschlaege = s.beschreibungVorschlaege.vorschlaege.slice(0, 10);
        }
        else {
            this.bezahlungEintragenForm.beschreibungVorschlaege = [];
        }
    }

    private applyStoreState(s: State) {
        let editable = false;
        if (this.kontokorrentIdParameter && this.bezahlungIdParameter) {
            let kontokorrent = s.kontokorrents.kontokorrents[this.kontokorrentIdParameter];
            if (kontokorrent) {
                this.bezahlungEintragenForm.personen = kontokorrent.personen;
                let angezeigteBezahlung = kontokorrent.angezeigteBezahlung[this.bezahlungIdParameter];
                if (angezeigteBezahlung) {
                    this.bezahlungNichtGefundenError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.NichtGefunden;
                    this.bezahlungZwischengespeichertError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.Zwischengespeichert;
                    this.bezahlungGeloeschtError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.Geloescht;
                    this.bezahlungBearbeitetError.hidden = angezeigteBezahlung.bearbeitungsStatus != BearbeitungsStatus.Bearbeitet;
                    editable = angezeigteBezahlung.bearbeitungsStatus == BearbeitungsStatus.Bearbeitbar;
                }
            }
        }
        this.updateButton.style.visibility = editable ? "visible" : "collapse";
        this.deleteButton.style.visibility = editable ? "visible" : "collapse";
        this.bezahlungEintragenForm.style.display = editable ? "" : "none";
    }

    setRouteParameters(kontokorrentId: string, bezahlungId: string) {
        this.kontokorrentIdParameter = kontokorrentId;
        this.bezahlungIdParameter = bezahlungId;
        this.zurueckLink.href = `kontokorrents/${kontokorrentId}`;
        this.bezahlungActionCreator.bezahlungGeoeffnet(kontokorrentId, bezahlungId);
    }

    disconnectedCallback() {
        this.kontokorrentsSubscription();
        this.beschreibungVorschlagSubscription();
    }
}

customElements.define('bezahlung-page', BezahlungPage);
