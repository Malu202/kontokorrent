import { ServiceLocator } from "../../ServiceLocator";
import { KontokorrentActionCreator, kontokorrentActionCreatorFactory } from "../../state/actions/KontokorrentActionCreator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { Store } from "../../state/Store";
import { Person, State } from "../../state/State";
import { AppBar, AppBarTagName } from "../AppBar/AppBar";
import template from "./AusgleichErstellen.html";
import "./AusgleichErstellen.scss";
import { AusgleichsZahlung } from "../../lib/ausgleich/AusgleichsZahlung";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { AusgleichsZahlungDisplay, BezahlendePersonNameAttribute, EmpfaengerPersonNameAttribute, WertAttribute } from "./AusgleichsZahlungDisplay";
import { convertLinks } from "../convertLinks";
import { AusgleichOptions } from "../../lib/ausgleich/AusgleichOptions";

export class AusgleichErstellen extends HTMLElement {
    private rendered = false;
    private store: Store;
    private routingActionCreator: RoutingActionCreator;
    private kontokorrentActionCreator: KontokorrentActionCreator;
    private serviceLocator: ServiceLocator;
    private appBar: AppBar;
    private subscription: () => void;
    private oeffentlicherNameParameter: string;
    private ausgleichProgress: HTMLDivElement;
    private ausgleichProgressLabel: HTMLSpanElement;
    private navigiertZuNichtGefunden = false;
    private zahlungen: HTMLOListElement;
    private zahlungenRenderer: ArrayToElementRenderer<AusgleichsZahlung, HTMLLIElement, string>;
    private bezahlenderRenderer: ArrayToElementRenderer<Person, HTMLOptionElement, string>;
    private empfaengerRenderer: ArrayToElementRenderer<Person, HTMLOptionElement, string>;
    private zurueckLink: HTMLAnchorElement;
    private optionenForm: HTMLFormElement;
    private optionen: AusgleichOptions;
    private optionenDisplay: HTMLDivElement;
    private umrechnungskurs: HTMLInputElement;
    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.store = serviceLocator.store;
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
        this.kontokorrentActionCreator = kontokorrentActionCreatorFactory(serviceLocator);
        this.serviceLocator = serviceLocator;
        this.optionen = {
            geforderteZahlungen: [],
            mussZahlungen: []
        };
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.appBar = this.querySelector(AppBarTagName);
            this.appBar.addServices(this.serviceLocator);
            this.ausgleichProgress = this.querySelector("#ausgleich-progress");
            this.ausgleichProgressLabel = this.querySelector("#progress-label");
            this.zahlungen = this.querySelector("#zahlungen");
            this.zahlungenRenderer = new ArrayToElementRenderer(this.zahlungen,
                (b) => `${b.bezahlendePersonId}-${b.empfaengerPersonId}`,
                b => {
                    let liElement = document.createElement("li");
                    let e = new AusgleichsZahlungDisplay();
                    liElement.appendChild(e);
                    return liElement;
                });
            this.bezahlenderRenderer = new ArrayToElementRenderer(this.querySelector("#bezahlender"), b => b.id, b => document.createElement("option"));
            this.empfaengerRenderer = new ArrayToElementRenderer(this.querySelector("#empfaenger"), b => b.id, b => document.createElement("option"));
            this.zurueckLink = this.querySelector("#zurueck-zum-kontokorrent");
            this.optionenForm = this.querySelector("#optionen-form");
            this.optionenDisplay = this.querySelector("#optionen");
            this.umrechnungskurs = this.querySelector("#umrechnungskurs");
        }
        convertLinks([this.zurueckLink], this.routingActionCreator);
        this.subscription = this.store.subscribe(null, state => this.applyStoreState(state));
        this.appBar.addEventListener("gotokontokorrent", async (e: CustomEvent) => {
            await this.routingActionCreator.navigateKontokorrentById(e.detail);
        });
        this.umrechnungskurs.addEventListener("input", (e: Event) => {
            this.kontokorrentActionCreator.ausgleichRechnen(this.oeffentlicherNameParameter, this.optionen);
        });
        this.optionenForm.addEventListener("submit", e => {
            e.preventDefault();
            let data = new FormData(this.optionenForm);
            if (data.get("typ") == "muss") {
                this.optionen.mussZahlungen.push({
                    bezahlendePersonId: data.get("bezahlender") as string,
                    empfaengerPersonId: data.get("empfaenger") as string,
                });
            } else {
                this.optionen.geforderteZahlungen.push({
                    bezahlendePersonId: data.get("bezahlender") as string,
                    empfaengerPersonId: data.get("empfaenger") as string,
                });
            }
            this.kontokorrentActionCreator.ausgleichRechnen(this.oeffentlicherNameParameter, this.optionen);
        });
        this.applyStoreState(this.store.state);
    }

    private applyStoreState(state: State) {
        let ausgleichProgress = false;
        let kontokorrent = state.kontokorrents.kontokorrents[state.kontokorrents.activeKontokorrentId];
        if (kontokorrent) {
            document.title = `${kontokorrent.name} - Ausgleich`;
            ausgleichProgress = kontokorrent.ausgleichBerechnen;
            this.ausgleichProgressLabel.innerText = kontokorrent.synchronisieren ? `${kontokorrent.name} wird synchronisiert` : "Ausgleich wird berechnet";
            if (kontokorrent.ausgleich) {
                this.zahlungenRenderer.update(kontokorrent.ausgleich.ausgleichZahlungen, (li, a) => {
                    let e: AusgleichsZahlungDisplay = <AusgleichsZahlungDisplay>li.children[0];
                    e.setAttribute(BezahlendePersonNameAttribute, kontokorrent.personen.find(x => x.id == a.bezahlendePersonId).name);
                    e.setAttribute(EmpfaengerPersonNameAttribute, kontokorrent.personen.find(x => x.id == a.empfaengerPersonId).name);
                    e.setAttribute(WertAttribute, `${a.wert / (parseFloat(this.umrechnungskurs.value) || 1)}`);
                });
            }

            this.zurueckLink.href = `kontokorrents/o/${kontokorrent.oeffentlicherName}`;
            this.bezahlenderRenderer.update(kontokorrent.personen, (option, p) => {
                option.value = p.id;
                option.innerText = p.name;
            });
            this.empfaengerRenderer.update(kontokorrent.personen, (option, p) => {
                option.value = p.id;
                option.innerText = p.name;
            });
            this.optionenDisplay.innerHTML = "";
            for (let o of this.optionen.mussZahlungen) {
                let div = document.createElement("div");
                div.innerText = `${kontokorrent.personen.find(p => p.id == o.bezahlendePersonId).name} muss an ${kontokorrent.personen.find(p => p.id == o.empfaengerPersonId).name} zahlen`;
                this.optionenDisplay.appendChild(div);
            }
            for (let o of this.optionen.geforderteZahlungen) {
                let div = document.createElement("div");
                div.innerText = `Bevorzugte Zahlungen zwsichen ${kontokorrent.personen.find(p => p.id == o.bezahlendePersonId).name} und ${kontokorrent.personen.find(p => p.id == o.empfaengerPersonId).name}`;
                this.optionenDisplay.appendChild(div);
            }
        }
        if (state.kontokorrents.nichtGefunden && !this.navigiertZuNichtGefunden) {
            this.navigiertZuNichtGefunden = true;
            this.routingActionCreator.navigateNichtGefunden(state.kontokorrents.nichtGefunden.oeffentlicherName);
        }
        this.ausgleichProgress.style.display = ausgleichProgress ? "" : "none";

    }

    setRouteParameters(oeffentlicherName: string) {
        this.oeffentlicherNameParameter = oeffentlicherName;
        this.kontokorrentActionCreator.ausgleichRechnen(oeffentlicherName, this.optionen);
    }

    disconnectedCallback() {
        this.subscription();
    }
}

customElements.define("ausgleich-erstellen", AusgleichErstellen);
