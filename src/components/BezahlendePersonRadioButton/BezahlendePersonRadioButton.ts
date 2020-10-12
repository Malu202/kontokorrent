import { Person } from "../../state/State";
import template from "./BezahlendePersonRadioButton.html";
import "./BezahlendePersonRadioButton.scss";

export class BezahlendePersonRadioButton extends HTMLElement {
    private input: HTMLInputElement;
    private personLabel: HTMLLabelElement;
    private label: HTMLLabelElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.input = this.querySelector("input");
        this.personLabel = this.querySelector(`[data-ref="label"]`);
        this.label = this.querySelector("label");
    }

    connectedCallback() {


    }

    disconnectedCallback() {

    }

    set radioName(v: string) {
        this.input.name = v;
    }

    set person(value: Person) {
        this.input.value = value.id;
        this.personLabel.innerText = value.name;
        this.input.id = value.id;
        this.label.setAttribute("for", value.id);
    }
}

customElements.define("bezahlende-person-radio-button", BezahlendePersonRadioButton);
