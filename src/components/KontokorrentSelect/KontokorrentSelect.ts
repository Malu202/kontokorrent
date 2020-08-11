import template from "./KontokorrentSelect.html";
import "./KontokorrentSelect.scss";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import "./KontokorrentSelectList";

export class KontokorrentSelect extends HTMLElement {
    private kontokorrentName: HTMLHeadingElement;
    private popupShown: boolean = false;
    private popup: HTMLDivElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.keyListener = this.keyListener.bind(this);
        this.touchListener = this.touchListener.bind(this);
        this.kontokorrentName = this.querySelector(`[data-ref="kontokorrent-name"]`);
    }

    connectedCallback() {
        this.popup = this.querySelector(`[data-ref="popup"]`);
        this.updateAttributes();
        this.addEventListener("click", e => {
            if (!this.popup.contains(<Element>(event.target))) {
                this.togglePopup();
            }
        });

    }

    private keyListener(ev: KeyboardEvent) {
        if (ev.key == "Escape") {
            this.togglePopup();
        }
    }

    private touchListener(ev: MouseEvent | TouchEvent) {
        if (!this.contains(<Element>(event.target))) {
            this.togglePopup();
        }
    }

    togglePopup() {
        if (!this.popupShown) {
            document.addEventListener("keydown", this.keyListener);
            document.addEventListener("mousedown", this.touchListener);
            document.addEventListener("touchend", this.touchListener);
        }
        else {
            document.removeEventListener("keydown", this.keyListener);
            document.removeEventListener("mousedown", this.touchListener);
            document.removeEventListener("touchend", this.touchListener);
        }
        this.popupShown = !this.popupShown;
        this.popup.style.display = this.popupShown ? "block" : "none";
    }

    disconnectedCallback() {

    }

    setRouter(routingActionCreator: RoutingActionCreator) {

    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.kontokorrentName.innerText = this.getAttribute("kontokorrent-name");
    }

    static get observedAttributes() {
        return ["kontokorrent-name"];
    }

}
export const KontokorrentSelectTagName = "kontokorrent-select";
customElements.define(KontokorrentSelectTagName, KontokorrentSelect);
