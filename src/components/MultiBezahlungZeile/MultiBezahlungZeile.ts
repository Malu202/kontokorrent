import { formatCurrency } from "../../utils/formatCurrency";
import template from "./MultiBezahlungZeile.html";
import "./MultiBezahlungZeile.scss";

export class MultiBezahlungZeile extends HTMLElement {
    private datumText: HTMLSpanElement;
    private betreff: HTMLInputElement;
    private betragText: HTMLSpanElement;
    private removeBtn: HTMLButtonElement;
    private removeClickListener: () => void;
    private status: HTMLSpanElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.datumText = this.querySelector(`[data-ref="datum"]`);
        this.betreff = this.querySelector(`[data-ref="betreff"]`);
        this.betragText = this.querySelector(`[data-ref="betrag"]`);
        this.removeBtn = this.querySelector(`[data-ref="remove"]`);
        this.status = this.querySelector(`[data-ref="status"]`);
    }

    connectedCallback() {
        this.removeClickListener = () => this.removeClick();
        this.removeBtn.addEventListener("click", this.removeClickListener);
    }

    removeClick() {
        this.dispatchEvent(new CustomEvent("removebezahlung"));
    }

    disconnectedCallback() {
        this.removeBtn.removeEventListener("click", this.removeClickListener);
    }

    setData(d: { betreff?: string; betrag?: number; datum?: Date; done: boolean, error: boolean }) {
        this.betragText.innerText = formatCurrency(d.betrag);
        this.datumText.innerText = new Intl.DateTimeFormat().format(d.datum);
        this.betreff.value = d.betreff;
        this.status.innerText = d.error ? "Fehler" : (d.done ? "gespeichert" : "");
    }

    getData() {
        return { betreff: this.betreff.value };
    }
}

customElements.define("multi-bezahlung-zeile", MultiBezahlungZeile);
