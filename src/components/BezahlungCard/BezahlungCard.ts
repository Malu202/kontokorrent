import template from "./BezahlungCard.html";
import "./BezahlungCard.scss";
import { formatCurrency } from "../../utils/formatCurrency";

export const BeschreibungAttribute = "beschreibung";
export const WertAttribute = "wert";
export const BezahlendePersonAttribute = "bezahlende-person";
export const EmpfaengerAttribute = "empfaenger";

interface AttributeStore {
    bezahlendePerson: string;
    beschreibung: string;
    wert: number;
    empfaenger: string;
}

export class BezahlungCard extends HTMLElement {
    private attributeStore: AttributeStore;
    private wertElement: HTMLSpanElement;
    private empfaengerElement: HTMLSpanElement;
    private bezahlendePersonElement: HTMLSpanElement;
    private beschreibungElement: HTMLDivElement;

    constructor() {
        super();
        this.attributeStore = {
            beschreibung: null,
            bezahlendePerson: null,
            empfaenger: null,
            wert: null
        };
        this.innerHTML = template;
        this.beschreibungElement = this.querySelector(`[data-ref="beschreibung"]`);
        this.bezahlendePersonElement = this.querySelector(`[data-ref="bezahlende-person"]`);
        this.empfaengerElement = this.querySelector(`[data-ref="empfaenger"]`);
        this.wertElement = this.querySelector(`[data-ref="wert"]`);
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private checkChanged<K extends keyof AttributeStore>(prop: K, getAtt: () => AttributeStore[K]) {
        let att = getAtt();
        if (this.attributeStore[prop] != att) {
            this.attributeStore[prop] = att;
            return true;
        }
        return false;
    }

    private updateAttributes() {
        let changed = [
            this.checkChanged("bezahlendePerson", () => this.getAttribute(BezahlendePersonAttribute)),
            this.checkChanged("beschreibung", () => this.getAttribute(BeschreibungAttribute)),
            this.checkChanged("wert", () => parseFloat(this.getAttribute(WertAttribute))),
            this.checkChanged("empfaenger", () => this.getAttribute(EmpfaengerAttribute))
        ].some(v => v);
        if (changed) {
            this.updatesStyle();
        }
    }

    static get observedAttributes() {
        return [BeschreibungAttribute, BezahlendePersonAttribute, WertAttribute, EmpfaengerAttribute];
    }

    private updatesStyle() {
        this.beschreibungElement.innerText = this.attributeStore.beschreibung;
        this.bezahlendePersonElement.innerText = this.attributeStore.bezahlendePerson;
        this.wertElement.innerText = formatCurrency(this.attributeStore.wert);
        this.empfaengerElement.innerText = this.attributeStore.empfaenger;
    }

}
export const BezahlungCardTagName = "bezahlung-card";
customElements.define(BezahlungCardTagName, BezahlungCard);
