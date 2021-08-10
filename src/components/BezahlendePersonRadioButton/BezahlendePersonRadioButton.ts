import { Person } from "../../state/State";
import { ReuseableTemplate, TemplateInstance } from "../../utils/ReuseableTemplate";
import template from "./BezahlendePersonRadioButton.html";
import "./BezahlendePersonRadioButton.scss";

const reuseableTemplate = new ReuseableTemplate(template);

export class BezahlendePersonRadioButton extends HTMLElement {
    private input: HTMLInputElement;
    private personLabel: HTMLLabelElement;
    private label: HTMLLabelElement;
    private templateInstance: TemplateInstance;
    private _radioName: string;
    private personName: string;
    private personId: string;

    constructor() {
        super();
        this.templateInstance = reuseableTemplate.getInstance();
    }

    connectedCallback() {
        if (this.templateInstance.apply(this)) {
            this.input = this.querySelector("input");
            this.personLabel = this.querySelector(`[data-ref="label"]`);
            this.label = this.querySelector("label");
            this.update();
        }
    }

    disconnectedCallback() {

    }

    set radioName(v: string) {
        this._radioName = v;
    }

    set person(value: Person) {
        this.personName = value.name;
        this.personId = value.id;
        this.update();
    }

    private update() {
        if (this.templateInstance.isApplied()) {
            this.input.value = this.personId;
            this.personLabel.innerText = this.personName;
            this.input.id = this.personId;
            this.label.setAttribute("for", this.personId);
            this.input.name = this._radioName;
        }
    }
}

customElements.define("bezahlende-person-radio-button", BezahlendePersonRadioButton);
