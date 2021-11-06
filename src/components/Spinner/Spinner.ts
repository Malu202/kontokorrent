import template from "./Spinner.html";

export class Spinner extends HTMLElement {

    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = template;
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }
}

customElements.define("app-spinner", Spinner);
