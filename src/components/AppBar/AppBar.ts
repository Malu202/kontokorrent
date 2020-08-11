import template from "./AppBar.html";
import "./AppBar.scss";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { convertLinks } from "../convertLinks";

export class AppBar extends HTMLElement {


    constructor() {
        super();
        this.innerHTML = template;
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
