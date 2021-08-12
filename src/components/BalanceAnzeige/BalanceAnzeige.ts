import template from "./BalanceAnzeige.html";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BalanceAnzeigeElement, PersonNameAttribute, BalanceAttribute, BalanceRangeAttribute } from "./BalanceAnzeigeElement";
import { Person } from "../../state/State";

export class BalanceAnzeige extends HTMLElement {
    private balanceRange: number;
    private personen: Person[] = [];
    private personenRenderer: ArrayToElementRenderer<Person, HTMLElement, string>;
    private rendered = false;

    constructor() {
        super();
        this.personenRenderer = new ArrayToElementRenderer(this,
            (b: Person) => b.id,
            b => new BalanceAnzeigeElement());
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.updatesStyle();
        }
    }

    disconnectedCallback() {

    }

    setBalance(personen: Person[]) {
        this.personen = personen;
        this.balanceRange = Math.max(...Object.values(personen).map(v => Math.abs(v.balance)));
        this.updatesStyle();
    }

    private updatesStyle() {
        if (this.rendered) {
            this.personenRenderer.update(this.personen,
                (e, b) => {
                    e.setAttribute(PersonNameAttribute, b.name);
                    e.setAttribute(BalanceAttribute, "" + b.balance);
                    e.setAttribute(BalanceRangeAttribute, "" + this.balanceRange);
                });
        }
    }

}
export const BalanceAnzeigeTagName = "balance-anzeige";
customElements.define(BalanceAnzeigeTagName, BalanceAnzeige);
