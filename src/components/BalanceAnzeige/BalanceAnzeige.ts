import template from "./BalanceAnzeige.html";
import { syncToList, syncToChildren } from "../../utils/syncToList";
import { BalanceAnzeigeElement, PersonNameAttribute, BalanceAttribute, BalanceRangeAttribute } from "./BalanceAnzeigeElement";
import { Person } from "../../state/State";

export class BalanceAnzeige extends HTMLElement {
    private balanceRange: number;
    private personen: Person[];

    constructor() {
        super();
        this.innerHTML = template;

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
        syncToChildren(this, this.personen,
            b => b.id,
            b => new BalanceAnzeigeElement(),
            (e, b) => {
                e.setAttribute(PersonNameAttribute, b.name);
                e.setAttribute(BalanceAttribute, "" + b.balance);
                e.setAttribute(BalanceRangeAttribute, "" + this.balanceRange);
            });
    }

}
export const BalanceAnzeigeTagName = "balance-anzeige";
customElements.define(BalanceAnzeigeTagName, BalanceAnzeige);
