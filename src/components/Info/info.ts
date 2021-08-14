import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";
import template from "./info.html";

export class Info extends HTMLElement {
    private routingActionCreator: RoutingActionCreator;
    private buildDateLabel: HTMLSpanElement;

    constructor() {
        super();

    }
    addServices(serviceLocator: ServiceLocator) {
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
    }

    async connectedCallback() {
        this.innerHTML = template;
        this.buildDateLabel = this.querySelector("#build-date");
        this.buildDateLabel.innerText = new Intl.DateTimeFormat([], {
            hour: "numeric", minute: "numeric", second: "numeric",
            day: "numeric", "month": "numeric", year: "numeric",
            timeZoneName: "short"
        }).format(new Date(__BUILD_DATE));;
        let res = await fetch("licenses.txt");
        let text = await res.text();
        (<HTMLDivElement>this.querySelector("#third-party")).innerText = text;
        convertLinks(this.querySelectorAll("a[data-internal]"), this.routingActionCreator);
    }
}

customElements.define('app-info', Info);