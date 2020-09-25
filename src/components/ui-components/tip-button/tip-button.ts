import { Popup } from "../popup/popup";

export const PopupIdAttribute = "popup-id";

export class TipButton extends HTMLElement {
    private popupId: string;
    constructor() {
        super();
        this.clickListener = this.clickListener.bind(this);
    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.popupId = this.getAttribute(PopupIdAttribute);

    }

    static get observedAttributes() {
        return [PopupIdAttribute];
    }

    connectedCallback() {
        this.addEventListener("click", this.clickListener);
    }

    private clickListener(ev: MouseEvent) {
        let popup: Popup = document.querySelector(`#${this.popupId}`);
        popup.toggle();
        ev.stopPropagation();
    }


    disconnectedCallback() {
        this.removeEventListener("click", this.clickListener);
    }
}
customElements.define("tip-button", TipButton);
