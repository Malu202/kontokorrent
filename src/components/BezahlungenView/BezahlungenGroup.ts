import template from "./BezahlungenGroup.html";
import "../BezahlungCard/BezahlungCard";
import { BezahlungViewModel } from "./BezahlungViewModel";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BeschreibungAttribute, BezahlendePersonAttribute, BezahlungCard, EmpfaengerAttribute, WertAttribute } from "../BezahlungCard/BezahlungCard";

export class BezahlungenGroup extends HTMLElement {
    private container: HTMLDivElement;
    private titleElement: HTMLHeadingElement;
    private bezahlungenRenderer: ArrayToElementRenderer<BezahlungViewModel, BezahlungCard, string>;


    constructor() {
        super();
        this.innerHTML = template;
        this.container = this.querySelector(`[data-ref="container"]`);
        this.titleElement = this.querySelector(`[data-ref="title"]`);
        this.bezahlungenRenderer = new ArrayToElementRenderer(this.container,
            (b: BezahlungViewModel) => b.id,
            b => new BezahlungCard());
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }


    setBezahlungen(bezahlungen: BezahlungViewModel[]) {
        this.bezahlungenRenderer.update(bezahlungen, (e, b) => {
            e.setAttribute(BeschreibungAttribute, b.beschreibung);
            e.setAttribute(WertAttribute, "" + b.wert);
            e.setAttribute(BezahlendePersonAttribute, b.bezahlendePersonName);
            e.setAttribute(EmpfaengerAttribute, b.empfaenger);
        });
    }

    set title(t: string) {
        this.titleElement.innerText = t;
    }

}
export const BezahlungenGroupTagName = "bezahlungen-group";
customElements.define(BezahlungenGroupTagName, BezahlungenGroup);
