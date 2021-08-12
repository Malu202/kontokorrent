import templateContent from "./BalanceAnzeigeElement.html";
import "./BalanceAnzeigeElement.scss";
import { formatCurrency } from "../../utils/formatCurrency";
import { ReuseableTemplate, TemplateInstance } from "../../utils/ReuseableTemplate";

export const PersonNameAttribute = "person-name";
export const BalanceAttribute = "balance";
export const BalanceRangeAttribute = "balance-range";

const template = new ReuseableTemplate(templateContent);

export class BalanceAnzeigeElement extends HTMLElement {
    private personName: string;
    private balance: number;
    private personNameElement: HTMLSpanElement;
    private balanceTextElement: HTMLSpanElement;
    private balanceRange: number;
    private barElement: HTMLDivElement;
    private balanceContainerElement: HTMLSpanElement;
    private templateInstance: TemplateInstance;

    constructor() {
        super();
        this.templateInstance = template.getInstance();
    }

    connectedCallback() {
        if (this.templateInstance.apply(this)) {
            this.personNameElement = this.querySelector(`[data-ref="person-name"]`);
            this.balanceTextElement = this.querySelector(`[data-ref="balance-text"]`);
            this.balanceContainerElement = this.querySelector(`[data-ref="balance-container"]`);
            this.barElement = this.querySelector(`[data-ref="bar"]`);
            this.updatesStyle();
        }
        requestAnimationFrame(() => {
            this.barElement.style.transform = `scaleY(0)`;
            this.updatesStyle();
        });
    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.personName = this.getAttribute(PersonNameAttribute);
        this.balance = parseFloat(this.getAttribute(BalanceAttribute));
        this.balanceRange = Math.max(2, parseFloat(this.getAttribute(BalanceRangeAttribute)));
        this.updatesStyle();
    }

    static get observedAttributes() {
        return [PersonNameAttribute, BalanceAttribute, BalanceRangeAttribute];
    }

    private updatesStyle() {
        if (this.templateInstance.isApplied()) {
            requestAnimationFrame(() => {
                this.personNameElement.innerText = this.personName;
                this.balanceTextElement.innerText = formatCurrency(this.balance);
                let scale = Math.sign(this.balance) * Math.abs(this.balance) / this.balanceRange;
                let balanceTransform = scale * 1.9;
                this.barElement.style.transform = `scaleY(${scale})`;
                this.balanceContainerElement.style.transform = Math.sign(this.balance) < 0 ? `translateY(calc(${balanceTransform}em - 150%))`
                    : `translateY(calc(${balanceTransform}em + 50%))`;
                if (scale > 0) {
                    this.barElement.classList.add("balance-anzeige-element__bar--negative");
                    this.barElement.classList.remove("balance-anzeige-element__bar--positive");
                }
                else {
                    this.barElement.classList.remove("balance-anzeige-element__bar--negative");
                    this.barElement.classList.add("balance-anzeige-element__bar--positive");
                }
            });
        }
    }

}
export const BalanceAnzeigeElementTagName = "balance-anzeige-element";
customElements.define(BalanceAnzeigeElementTagName, BalanceAnzeigeElement);
