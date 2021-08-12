import template from "./KontokorrentSelectListEntry.html";
import { KontokorrentState } from "../../state/State";


export class KontokorrentSelectListEntry extends HTMLElement {
    private name: HTMLSpanElement;
    private link: HTMLAnchorElement;
    private kontokorrent: KontokorrentState;
    private rendered = false;
    private isActive: boolean = false;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.name = this.querySelector(`[data-ref="name"]`);
            this.link = this.querySelector(`[data-ref="link"]`);
            this.updateStyle();
        }
        this.clickEvent = this.clickEvent.bind(this);
        this.link.addEventListener("click", this.clickEvent);
    }

    private clickEvent(e: MouseEvent): void {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("gotokontokorrent", { detail: this.kontokorrent.id, bubbles: true }));
    }

    disconnectedCallback() {
        this.link.removeEventListener("click", this.clickEvent);
    }

    update(kontokorrent: KontokorrentState, isActive: boolean) {
        this.kontokorrent = kontokorrent;
        this.isActive = isActive;
        this.updateStyle();
    }

    private updateStyle() {
        if (this.rendered && this.kontokorrent) {
            this.name.innerText = this.kontokorrent.name;
            this.link.href = `kontokorrents/${this.kontokorrent.id}`;
            this.link.classList.toggle("kontokorrent-select-list__entry--active", this.isActive);
        }
    }
}
export const KontokorrentSelectListEntryTagName = "kontokorrent-select-list-entry";
customElements.define(KontokorrentSelectListEntryTagName, KontokorrentSelectListEntry);
