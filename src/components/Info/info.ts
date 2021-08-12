import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";
import template from "./info.html";

export class Info extends HTMLElement {
    private routingActionCreator: RoutingActionCreator;

    constructor() {
        super();

    }
    addServices(serviceLocator: ServiceLocator) {
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
    }

    async connectedCallback() {
        this.innerHTML = template;
        let res = await fetch("licenses.txt");
        let text = await res.text();
        (<HTMLDivElement>this.querySelector("#third-party")).innerText = text;
        convertLinks(this.querySelectorAll("a[data-internal]"), this.routingActionCreator);
    }
}

customElements.define('app-info', Info);