import template from "./info.html";

export class Info extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;
    }

    async connectedCallback() {
        let res = await fetch("index.licenses.txt");
        let text = await res.text();
        (<HTMLDivElement>this.querySelector("#third-party")).innerText = text;
    }
}

customElements.define('app-info', Info);