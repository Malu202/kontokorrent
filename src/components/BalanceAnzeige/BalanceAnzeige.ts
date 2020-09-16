import template from "./BalanceAnzeige.html";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BalanceAnzeigeElement, PersonNameAttribute, BalanceAttribute, BalanceRangeAttribute } from "./BalanceAnzeigeElement";
import { Person } from "../../state/State";

export class BalanceAnzeige extends HTMLElement {
    private balanceRange: number;
    private personen: Person[];
    private personenRenderer: ArrayToElementRenderer<Person, HTMLElement, string>;

    constructor() {
        super();
        this.innerHTML = template;
        this.personenRenderer = new ArrayToElementRenderer(this,
            (b: Person) => b.id,
            b => new BalanceAnzeigeElement());
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    setBalance(personen: Person[]) {
        this.personen = personen;
        this.balanceRange = Math.max(...Object.values(personen).map(v => Math.abs(v.balance)));
        this.updatesStyle();
    }

    private updatesStyle() {
        this.personenRenderer.update(this.personen,
            (e, b) => {
                e.setAttribute(PersonNameAttribute, b.name);
                e.setAttribute(BalanceAttribute, "" + b.balance);
                e.setAttribute(BalanceRangeAttribute, "" + this.balanceRange);
            });
    }

}
export const BalanceAnzeigeTagName = "balance-anzeige";
customElements.define(BalanceAnzeigeTagName, BalanceAnzeige);
