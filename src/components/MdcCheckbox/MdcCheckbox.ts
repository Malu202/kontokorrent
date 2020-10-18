import { ReuseableTemplate } from "../../utils/ReuseableTemplate";
import templateContent from "./MdcCheckbox.html";
import "./MdcCheckbox.scss";

const template = new ReuseableTemplate(templateContent);

export class MdcCheckbox extends HTMLElement {
    private nativeControl: HTMLInputElement;

    constructor() {
        super();
        this.appendChild(template.get());
        this.nativeControl = this.querySelector(".mdc-checkbox__native-control");
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    set checkboxId(value: string) {
        this.nativeControl.id = value;
    }

    set checkboxName(value: string) {
        this.nativeControl.name = value;
    }
}

customElements.define("mdc-checkbox", MdcCheckbox);
