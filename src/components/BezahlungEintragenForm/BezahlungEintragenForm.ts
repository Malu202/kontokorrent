import { Person } from "../../state/State";
import template from "./BezahlungEintragenForm.html";
import "./BezahlungEintragenForm.scss";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BezahlendePersonRadioButton } from "../BezahlendePersonRadioButton/BezahlendePersonRadioButton";
import { EmpfaengerCheckbox } from "../EmpfaengerCheckbox/EmpfaengerCheckbox";

export class BezahlungEintragenForm extends HTMLElement {
    private zahlendePersonRenderer: ArrayToElementRenderer<Person, BezahlendePersonRadioButton, string>;
    private empfaengerRenderer: ArrayToElementRenderer<Person, EmpfaengerCheckbox, string>;

    constructor() {
        super();
        this.innerHTML = template;
        this.zahlendePersonRenderer = new ArrayToElementRenderer<Person, BezahlendePersonRadioButton, string>(
            this.querySelector("#zahlende-person-auswahl"),
            p => p.id,
            p => new BezahlendePersonRadioButton());
        this.empfaengerRenderer = new ArrayToElementRenderer<Person, EmpfaengerCheckbox, string>(
            this.querySelector("#empfaenger-auswahl"),
            p => p.id,
            p => new EmpfaengerCheckbox());
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
        this.empfaengerRenderer.update(value, (element, person) => {
            element.person = person;
        });
    }
}
export const BezahlungEintragenFormTagName = "bezahlung-eintragen-form";
customElements.define(BezahlungEintragenFormTagName, BezahlungEintragenForm);
