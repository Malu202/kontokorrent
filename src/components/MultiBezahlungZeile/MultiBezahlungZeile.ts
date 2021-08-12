import { formatCurrency } from "../../utils/formatCurrency";
import template from "./MultiBezahlungZeile.html";
import "./MultiBezahlungZeile.scss";

export class MultiBezahlungZeile extends HTMLElement {
    private datumText: HTMLSpanElement;
    private betreffInput: HTMLInputElement;
    private betragText: HTMLSpanElement;
    private removeBtn: HTMLButtonElement;
    private removeClickListener: () => void;
    private status: HTMLSpanElement;
    private rendered = false;
    private betrag: number;
    private betreff: string;
    private datum: Date;
    private done: boolean;
    private error: boolean;
    private pendingdata = false;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.datumText = this.querySelector(`[data-ref="datum"]`);
            this.betreffInput = this.querySelector(`[data-ref="betreff"]`);
            this.betragText = this.querySelector(`[data-ref="betrag"]`);
            this.removeBtn = this.querySelector(`[data-ref="remove"]`);
            this.status = this.querySelector(`[data-ref="status"]`);
            this.updateStyle();
        }
        this.removeClickListener = () => this.removeClick();
        this.removeBtn.addEventListener("click", this.removeClickListener);
    }

    private removeClick() {
        this.dispatchEvent(new CustomEvent("removebezahlung"));
    }

    disconnectedCallback() {
        this.removeBtn.removeEventListener("click", this.removeClickListener);
    }

    setData(d: { betreff?: string; betrag?: number; datum?: Date; done: boolean, error: boolean }) {
        this.betrag = d.betrag;
        this.betreff = d.betreff;
        this.datum = d.datum;
        this.done = d.done;
        this.error = d.error;
        this.pendingdata = true;
        this.updateStyle();
    }

    private updateStyle() {
        if (this.rendered && this.pendingdata) {
            this.pendingdata = false;
            this.betragText.innerText = formatCurrency(this.betrag);
            this.datumText.innerText = new Intl.DateTimeFormat().format(this.datum);
            this.betreffInput.value = this.betreff;
            this.status.innerText = this.error ? "Fehler" : (this.done ? "gespeichert" : "");
        }
    }

    getData() {
        return { betreff: this.betreffInput.value };
    }
}

customElements.define("multi-bezahlung-zeile", MultiBezahlungZeile);
