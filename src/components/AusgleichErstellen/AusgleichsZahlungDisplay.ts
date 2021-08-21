import template from "./AusgleichsZahlungDisplay.html";

export const BezahlendePersonNameAttribute = "bezahlender";
export const EmpfaengerPersonNameAttribute = "empfaenger";
export const WertAttribute = "wert";

export class AusgleichsZahlungDisplay extends HTMLElement {
    private rendered = false;
    private bezahlendePersonName: string;
    private empfaengerPersonName: string;
    private wert: string;
    private bezahlendePersonDisplay: HTMLSpanElement;
    private empfaengerPersonDisplay: HTMLSpanElement;
    private zahlung: HTMLSpanElement;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.bezahlendePersonDisplay = this.querySelector("#bezahlende-person");
            this.empfaengerPersonDisplay = this.querySelector("#empfaenger-person");
            this.zahlung = this.querySelector("#zahlung");
            this.updateAttributes();
        }
    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.bezahlendePersonName = this.getAttribute(BezahlendePersonNameAttribute);
        this.empfaengerPersonName = this.getAttribute(EmpfaengerPersonNameAttribute);
        this.wert = this.getAttribute(WertAttribute);
        this.updatesStyle();
    }

    static get observedAttributes() {
        return [BezahlendePersonNameAttribute, EmpfaengerPersonNameAttribute, WertAttribute];
    }

    private updatesStyle() {
        if (this.rendered) {
            this.bezahlendePersonDisplay.innerText = this.bezahlendePersonName;
            this.empfaengerPersonDisplay.innerText = this.empfaengerPersonName;
            this.zahlung.innerText = `bezahlt ${this.wert} an`;
            this.zahlung.title = `bezahlt ${this.wert} an`;
        }
    }

}
export const AusgleichsZahlungDisplayTagName = 'ausgleichs-zahung-display';
customElements.define(AusgleichsZahlungDisplayTagName, AusgleichsZahlungDisplay);
