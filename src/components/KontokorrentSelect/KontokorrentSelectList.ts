import template from "./KontokorrentSelectList.html";
import "./KontokorrentSelectList.scss";

export class KontokorrentSelectList extends HTMLElement {
    kontokorrentName: HTMLHeadingElement;


    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }
}
export const KontokorrentSelectListTagName = "kontokorrent-select-list";
customElements.define(KontokorrentSelectListTagName, KontokorrentSelectList);
