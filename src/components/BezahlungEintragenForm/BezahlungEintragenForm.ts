import { Person } from "../../state/State";
import template from "./BezahlungEintragenForm.html";
import "./BezahlungEintragenForm.scss";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BezahlendePersonRadioButton } from "../BezahlendePersonRadioButton/BezahlendePersonRadioButton";
import { EmpfaengerCheckbox } from "../EmpfaengerCheckbox/EmpfaengerCheckbox";
import { toDateInputValue } from "../../utils/toDateInputValue";
import { isSameDay, startOfDay } from "date-fns";

export class BezahlungEintragenForm extends HTMLElement {
    private zahlendePersonRenderer: ArrayToElementRenderer<Person, BezahlendePersonRadioButton, string>;
    private empfaengerRenderer: ArrayToElementRenderer<Person, EmpfaengerCheckbox, string>;
    private datum: HTMLInputElement;
    private betreff: HTMLInputElement;
    private betrag: HTMLInputElement;
    private zahlendePersonMissingError: HTMLSpanElement;
    private betreffMissingError: HTMLDivElement;
    private betragMissingError: HTMLDivElement;
    private empfaengerMissingError: HTMLDivElement;
    private validationRequested: boolean = false;
    private form: HTMLFormElement;
    private formInputListener: () => void;
    private betragInvalidError: HTMLDivElement;
    private empfaengerAuswahl: HTMLDivElement;
    private _personen: Person[];

    constructor() {
        super();
        this.innerHTML = template;
        this.empfaengerAuswahl = this.querySelector("#empfaenger-auswahl");
        this.zahlendePersonRenderer = new ArrayToElementRenderer<Person, BezahlendePersonRadioButton, string>(
            this.querySelector("#zahlende-person-auswahl"),
            p => p.id,
            p => new BezahlendePersonRadioButton());
        this.empfaengerRenderer = new ArrayToElementRenderer<Person, EmpfaengerCheckbox, string>(
            this.empfaengerAuswahl,
            p => p.id,
            p => new EmpfaengerCheckbox());
        this.datum = this.querySelector("#datum");
        this.datum.value = toDateInputValue(new Date());
        this.betrag = this.querySelector("#betrag");
        this.betreff = this.querySelector("#betreff");
        this.zahlendePersonMissingError = this.querySelector("#zahlende-person-missing-error");
        this.betreffMissingError = this.querySelector("#betreff-missing-error");
        this.betragMissingError = this.querySelector("#betrag-missing-error");
        this.betragInvalidError = this.querySelector("#betrag-invalid-error");
        this.empfaengerMissingError = this.querySelector("#empfaenger-missing-error");
        this.form = this.querySelector("#bezahlung-eintragen-form");
    }

    connectedCallback() {
        this.formInputListener = () => this.onFormInput();
        this.form.addEventListener("input", this.formInputListener);
        this.betrag.focus();
    }

    disconnectedCallback() {
        this.form.removeEventListener("input", this.formInputListener);
    }

    onFormInput() {
        this.validateWhileManipulating();
    }

    validate() {
        this.validationRequested = true;
        let betrag = this.parseBetrag();
        let betragValid = betrag.valid;
        this.betragInvalidError.hidden = betrag.valid || betrag.empty;
        let valid = this.validateWhileManipulating() && betragValid;
        return valid;
    }

    private getDatum() {
        let d = this.datum.valueAsDate;
        if (!d || isSameDay(d, new Date())) {
            return new Date();
        }
        return startOfDay(d);
    }

    getData() {
        return {
            betrag: this.parseBetrag().value,
            betreff: this.betreff.value,
            empfaenger: this.selectedEmpfaenger,
            bezahlendePerson: this.bezahlendePerson.value,
            datum: this.getDatum()
        }
    }

    private parseBetrag() {
        this.betrag.setAttribute("type", "text");
        let betrag = this.betrag.value;
        if (betrag == "") {
            return { valid: false, empty: true };
        }
        this.betrag.setAttribute("type", "number");
        betrag = betrag.replace(",", ".");
        betrag = betrag.replace(/ /g, "");
        let betragFloat = parseFloat(betrag);
        if (isNaN(betragFloat)) {
            return { valid: false, empty: false };
        }
        return { valid: true, value: betragFloat };
    }

    private get bezahlendePerson(): HTMLInputElement {
        return this.form["bezahlende-person"];
    }

    private get selectedEmpfaenger(): string[] {
        return this._personen.filter(p => (this.form["empfaenger-" + p.id] as HTMLInputElement).checked)
            .map(p => p.id);
    }

    private validateWhileManipulating() {
        let validity = {
            betragValid: !!this.betrag.value,
            betreffValid: !!this.betreff.value,
            zahlendePersonValid: !!this.bezahlendePerson.value,
            empfaengerValid: this.selectedEmpfaenger.length > 0
        };
        this.betragMissingError.hidden = !this.validationRequested || validity.betragValid;
        this.betreffMissingError.hidden = !this.validationRequested || validity.betreffValid;
        this.zahlendePersonMissingError.hidden = !this.validationRequested || validity.zahlendePersonValid;
        this.empfaengerMissingError.hidden = !this.validationRequested || validity.empfaengerValid;
        return !Object.values(validity).some(v => v == false);
    }

    set personen(value: Person[]) {
        this._personen = value;
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
