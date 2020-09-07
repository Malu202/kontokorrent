import template from "./KontokorrentSelectListEntry.html";
import { KontokorrentState } from "../../state/State";


export class KontokorrentSelectListEntry extends HTMLElement {
    private name: HTMLSpanElement;
    private link: HTMLAnchorElement;
    private kontokorrent: KontokorrentState;

    constructor() {
        super();
        this.innerHTML = template;
        this.name = this.querySelector(`[data-ref="name"]`);
        this.link = this.querySelector(`[data-ref="link"]`);
        this.clickEvent = this.clickEvent.bind(this);
    }

    connectedCallback() {
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
        this.name.innerText = kontokorrent.name;
        this.link.href = `kontokorrents/${kontokorrent.id}`;
        this.link.classList.toggle("kontokorrent-select-list__entry--active", isActive);
    }
}
export const KontokorrentSelectListEntryTagName = "kontokorrent-select-list-entry";
customElements.define(KontokorrentSelectListEntryTagName, KontokorrentSelectListEntry);
