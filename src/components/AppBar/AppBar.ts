import template from "./AppBar.html";
import "./AppBar.scss";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";
import "../KontokorrentSelect/KontokorrentSelect";
import { KontokorrentSelectTagName, KontokorrentSelect } from "../KontokorrentSelect/KontokorrentSelect";

export class AppBar extends HTMLElement {
    readonly kontokorrentSelect: KontokorrentSelect;


    constructor() {
        super();
        this.innerHTML = template;
        this.kontokorrentSelect = this.querySelector(KontokorrentSelectTagName);
    }

    connectedCallback() {
        document.body.classList.add("body--app-bar");
        this.querySelector("#logout-button").addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("onlogout"));
        });
    }

    disconnectedCallback() {
        document.body.classList.remove("body--app-bar");
    }

    setRouter(routingActionCreator: RoutingActionCreator) {
        convertLinks(this.querySelectorAll("a"), routingActionCreator);
    }
}
export const AppBarTagName = "app-bar";
customElements.define(AppBarTagName, AppBar);
