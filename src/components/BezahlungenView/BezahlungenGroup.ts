import template from "./BezahlungenGroup.html";
import "../BezahlungCard/BezahlungCard";
import { BezahlungViewModel } from "./BezahlungViewModel";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { BeschreibungAttribute, BezahlendePersonAttribute, BezahlungCard, BezahlungIdAttribute, EmpfaengerAttribute, StatusAttribute, WertAttribute } from "../BezahlungCard/BezahlungCard";

export class BezahlungenGroup extends HTMLElement {
    private container: HTMLDivElement;
    private titleElement: HTMLHeadingElement;
    private bezahlungenRenderer: ArrayToElementRenderer<BezahlungViewModel, BezahlungCard, string>;
    private rendered = false;
    private bezahlungen: BezahlungViewModel[] = [];
    private _title: string = "";


    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.container = this.querySelector(`[data-ref="container"]`);
            this.titleElement = this.querySelector(`[data-ref="title"]`);
            this.bezahlungenRenderer = new ArrayToElementRenderer(this.container,
                (b: BezahlungViewModel) => b.id,
                b => new BezahlungCard());
            this.update();
        }
    }

    disconnectedCallback() {

    }


    setBezahlungen(bezahlungen: BezahlungViewModel[]) {
        this.bezahlungen = bezahlungen;
        this.update();
    }

    set title(t: string) {
        this._title = t;
        this.update();
    }

    private update() {
        if (this.rendered) {
            this.bezahlungenRenderer.update(this.bezahlungen, (e, b) => {
                e.setAttribute(BeschreibungAttribute, b.beschreibung);
                e.setAttribute(WertAttribute, "" + b.wert);
                e.setAttribute(BezahlendePersonAttribute, b.bezahlendePersonName);
                e.setAttribute(EmpfaengerAttribute, b.empfaenger);
                e.setAttribute(StatusAttribute, b.status);
                e.setAttribute(BezahlungIdAttribute, b.id);
            });
            this.titleElement.innerText = this._title;
        }
    }

}
export const BezahlungenGroupTagName = "bezahlungen-group";
customElements.define(BezahlungenGroupTagName, BezahlungenGroup);
