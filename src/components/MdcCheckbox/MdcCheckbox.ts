import { isThursday } from "date-fns";
import { ReuseableTemplate, TemplateInstance } from "../../utils/ReuseableTemplate";
import templateContent from "./MdcCheckbox.html";
import "./MdcCheckbox.scss";

const template = new ReuseableTemplate(templateContent);

export const CheckboxIdAttribute = "checkbox-id";
export const CheckboxNameAttribute = "checkbox-name";

export class MdcCheckbox extends HTMLElement {
    private nativeControl: HTMLInputElement;
    private templateInstance: TemplateInstance;

    constructor() {
        super();
        this.templateInstance = template.getInstance();
    }

    connectedCallback() {
        if (this.templateInstance.apply(this)) {
            this.nativeControl = this.querySelector(".mdc-checkbox__native-control");
            this.updateAttributes();
        }
    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        if (this.nativeControl) {
            this.nativeControl.id = this.getAttribute(CheckboxIdAttribute);
            this.nativeControl.name = this.getAttribute(CheckboxNameAttribute);
        }
    }

    static get observedAttributes() {
        return [CheckboxIdAttribute, CheckboxNameAttribute];
    }
}

customElements.define("mdc-checkbox", MdcCheckbox);
