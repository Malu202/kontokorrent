import { ReuseableTemplate } from "../../utils/ReuseableTemplate";
import templateContent from "./MdcCheckbox.html";
import "./MdcCheckbox.scss";

const template = new ReuseableTemplate(templateContent);

export const CheckboxIdAttribute = "checkbox-id";
export const CheckboxNameAttribute = "checkbox-name";

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

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.nativeControl.id = this.getAttribute(CheckboxIdAttribute);
        this.nativeControl.name = this.getAttribute(CheckboxNameAttribute);
    }

    static get observedAttributes() {
        return [CheckboxIdAttribute, CheckboxNameAttribute];
    }
}

customElements.define("mdc-checkbox", MdcCheckbox);
