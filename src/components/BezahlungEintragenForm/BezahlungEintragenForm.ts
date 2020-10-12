import { Person } from "../../state/State";
import template from "./BezahlungEintragenForm.html";
import "./BezahlungEintragenForm.scss";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BezahlendePersonRadioButton } from "../BezahlendePersonRadioButton/BezahlendePersonRadioButton";

export class BezahlungEintragenForm extends HTMLElement {
    private zahlendePersonRenderer: ArrayToElementRenderer<Person, BezahlendePersonRadioButton, string>;

    constructor() {
        super();
        this.innerHTML = template;
        this.zahlendePersonRenderer = new ArrayToElementRenderer<Person, BezahlendePersonRadioButton, string>(
            this.querySelector("#zahlende-person-auswahl"),
            p => p.id,
            p => new BezahlendePersonRadioButton());
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    set personen(value: Person[]) {
        this.zahlendePersonRenderer.update(value, (element, person) => {
            element.person = person;
            element.radioName = "bezahlende-person";
        });
    }
}
export const BezahlungEintragenFormTagName = "bezahlung-eintragen-form";
customElements.define(BezahlungEintragenFormTagName, BezahlungEintragenForm);
