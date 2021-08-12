import templateContent from "./EmpfaengerCheckbox.html";
import "./EmpfaengerCheckbox.scss";
import "../MdcCheckbox/MdcCheckbox";
import { MdcCheckbox } from "../MdcCheckbox/MdcCheckbox";
import { Person } from "../../state/State";
import { ReuseableTemplate, TemplateInstance } from "../../utils/ReuseableTemplate";

const template = new ReuseableTemplate(templateContent);

export class EmpfaengerCheckbox extends HTMLElement {
    private mdcCheckBox: MdcCheckbox;
    private label: HTMLLabelElement;
    private templateInstance: TemplateInstance;

    private checkboxId:string;
    private personName:string;

    constructor() {
        super();
        this.templateInstance = template.getInstance();
    }

    set person(value: Person) {
        this.personName = value.name;
        this.checkboxId = `empfaenger-${value.id}`;
        this.update();
    }

    connectedCallback() {
        if (this.templateInstance.apply(this)) {
            this.mdcCheckBox = this.querySelector("mdc-checkbox");
            this.label = this.querySelector("label");
            this.update();
        }
    }

    disconnectedCallback() {

    }

    private update() {
        if (this.templateInstance.isApplied()) {
            this.label.innerText = this.personName;
            this.label.setAttribute("for", this.checkboxId);
            this.mdcCheckBox.setAttribute("checkbox-id", this.checkboxId);
            this.mdcCheckBox.setAttribute("checkbox-name", this.checkboxId);
        }
    }
}

customElements.define("empfaenger-checkbox", EmpfaengerCheckbox);
