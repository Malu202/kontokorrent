import templateContent from "./BezahlungCard.html";
import "./BezahlungCard.scss";
import { formatCurrency } from "../../utils/formatCurrency";
import { ReuseableTemplate, TemplateInstance } from "../../utils/ReuseableTemplate";
import { BezahlungStatus } from "../../state/State";

export const BeschreibungAttribute = "beschreibung";
export const WertAttribute = "wert";
export const BezahlendePersonAttribute = "bezahlende-person";
export const EmpfaengerAttribute = "empfaenger";
export const StatusAttribute = "status";
export const BezahlungIdAttribute = "bezahlung-id";

interface AttributeStore {
    bezahlendePerson: string;
    beschreibung: string;
    wert: number;
    empfaenger: string;
    status: string;
}

const template = new ReuseableTemplate(templateContent);

export class BezahlungCard extends HTMLElement {
    private attributeStore: AttributeStore;
    private wertElement: HTMLSpanElement;
    private empfaengerElement: HTMLSpanElement;
    private bezahlendePersonElement: HTMLSpanElement;
    private beschreibungElement: HTMLDivElement;
    private doneElement: HTMLSpanElement;
    private doneAllElement: HTMLSpanElement;
    private syncElement: HTMLSpanElement;
    private clickListener: (e: MouseEvent) => void;
    private templateInstance: TemplateInstance;

    constructor() {
        super();
        this.attributeStore = {
            beschreibung: null,
            bezahlendePerson: null,
            empfaenger: null,
            wert: null,
            status: null
        };
        this.templateInstance = template.getInstance();
    }

    private onClick(e: MouseEvent) {
        this.dispatchEvent(new CustomEvent("bezahlungclick", { detail: this.getAttribute(BezahlungIdAttribute), bubbles: true }));
    }

    connectedCallback() {
        if (this.templateInstance.apply(this)) {
            this.beschreibungElement = this.querySelector(`[data-ref="beschreibung"]`);
            this.bezahlendePersonElement = this.querySelector(`[data-ref="bezahlende-person"]`);
            this.empfaengerElement = this.querySelector(`[data-ref="empfaenger"]`);
            this.wertElement = this.querySelector(`[data-ref="wert"]`);
            this.doneElement = this.querySelector(`[data-ref="icon-done"]`);
            this.doneAllElement = this.querySelector(`[data-ref="icon-done-all"]`);
            this.syncElement = this.querySelector(`[data-ref="icon-sync"]`);
            this.updatesStyle();
        }
        this.clickListener = e => this.onClick(e);
        this.addEventListener("click", this.clickListener);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.clickListener);
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
            this.checkChanged("empfaenger", () => this.getAttribute(EmpfaengerAttribute)),
            this.checkChanged("status", () => this.getAttribute(StatusAttribute))
        ].some(v => v);
        if (changed) {
            this.updatesStyle();
        }
    }

    static get observedAttributes() {
        return [BeschreibungAttribute, BezahlendePersonAttribute, WertAttribute, EmpfaengerAttribute, StatusAttribute];
    }

    private updatesStyle() {
        if (this.templateInstance.isApplied()) {
            this.beschreibungElement.innerText = this.attributeStore.beschreibung;
            this.bezahlendePersonElement.innerText = this.attributeStore.bezahlendePerson;
            this.wertElement.innerText = formatCurrency(this.attributeStore.wert);
            this.empfaengerElement.innerText = this.attributeStore.empfaenger;
            this.doneAllElement.style.display = this.attributeStore.status == BezahlungStatus.Gespeichert ? "inline" : "none";
            this.doneElement.style.display = this.attributeStore.status == BezahlungStatus.Zwischengespeichert ? "inline" : "none";
            this.syncElement.style.display = this.attributeStore.status == BezahlungStatus.Speichern ? "inline" : "none";
        }
    }

}
export const BezahlungCardTagName = "bezahlung-card";
customElements.define(BezahlungCardTagName, BezahlungCard);
