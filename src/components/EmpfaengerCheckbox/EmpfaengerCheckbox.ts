import templateContent from "./EmpfaengerCheckbox.html";
import "./EmpfaengerCheckbox.scss";
import "../MdcCheckbox/MdcCheckbox";
import { MdcCheckbox } from "../MdcCheckbox/MdcCheckbox";
import { Person } from "../../state/State";
import { ReuseableTemplate } from "../../utils/ReuseableTemplate";

const template = new ReuseableTemplate(templateContent);

export class EmpfaengerCheckbox extends HTMLElement {
    private mdcCheckBox: MdcCheckbox;
    private label: HTMLLabelElement;

    constructor() {
        super();
        this.appendChild(template.get());
        this.mdcCheckBox = this.querySelector("mdc-checkbox");
        this.label = this.querySelector("label");
    }

    set person(value: Person) {
        this.label.innerText = value.name;
        const id = `empfaenger-${value.id}`;
        this.label.setAttribute("for", id);
        this.mdcCheckBox.checkboxId = id;
        this.mdcCheckBox.checkboxName = id;
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }
}

customElements.define("empfaenger-checkbox", EmpfaengerCheckbox);
