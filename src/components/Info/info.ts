import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";
import template from "./info.html";

export class Info extends HTMLElement {
    private routingActionCreator: RoutingActionCreator;

    constructor() {
        super();
        this.innerHTML = template;
    }
    addServices(serviceLocator: ServiceLocator) {
        this.routingActionCreator = RoutingActionCreator.locate(serviceLocator);
    }

    async connectedCallback() {
        let res = await fetch("licenses.txt");
        let text = await res.text();
        (<HTMLDivElement>this.querySelector("#third-party")).innerText = text;
        convertLinks(this.querySelectorAll("a[data-internal]"), this.routingActionCreator);
    }
}

customElements.define('app-info', Info);