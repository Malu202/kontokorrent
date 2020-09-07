import template from "./KontokorrentSelect.html";
import "./KontokorrentSelect.scss";
import "./KontokorrentSelectList";
import { KontokorrentState } from "../../state/State";
import { KontokorrentSelectListTagName, KontokorrentSelectList } from "./KontokorrentSelectList";
import { Popup } from "../../utils/Popup";
import "../../utils/Popup";

export class KontokorrentSelect extends HTMLElement {
    private kontokorrentName: HTMLHeadingElement;
    private popup: Popup;
    private kontokorrentSelectList: KontokorrentSelectList;
    private addButton: HTMLButtonElement;
    private activeKontokorrentId: string;
    private _kontokorrents: KontokorrentState[];

    constructor() {
        super();
        this.innerHTML = template;
        this.kontokorrentName = this.querySelector(`[data-ref="kontokorrent-name"]`);
        this.kontokorrentSelectList = this.querySelector(KontokorrentSelectListTagName);
        this.addButton = this.querySelector(`#add-kontokorrent`);
        this._kontokorrents = null;
    }

    connectedCallback() {
        this.popup = this.querySelector(`app-popup`);
        this.updateAttributes();
        this.addEventListener("click", e => {
            if (!this.popup.contains(<Element>(event.target))) {
                this.popup.toggle();
                e.stopPropagation();
            }
        });
        this.addButton.addEventListener("click", e => {
            this.dispatchEvent(new CustomEvent("addkontokorrent"));
        });
        this.kontokorrentSelectList.addEventListener("gotokontokorrent", () => {
            this.popup.hide();
        })
    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.activeKontokorrentId = this.getAttribute("active-kontokorrent-id");
        this.kontokorrentSelectList.activeKontokorrentId = this.activeKontokorrentId;
        this.updatesStyle();
    }

    static get observedAttributes() {
        return ["active-kontokorrent-id"];
    }

    set kontokorrents(kontokorrents: KontokorrentState[]) {
        this.kontokorrentSelectList.kontokorrents = kontokorrents;
        this._kontokorrents = kontokorrents;
        this.updatesStyle();
    }

    private updatesStyle() {
        if (this._kontokorrents && this._kontokorrents.length) {
            let activeKontokorrent = this._kontokorrents.find(k => k.id == this.activeKontokorrentId);
            if (activeKontokorrent) {
                this.kontokorrentName.innerText = activeKontokorrent.name;
            }
            else {
                this.kontokorrentName.innerText = "(Kontokorrent wählen)";
            }
        }
    }

}
export const KontokorrentSelectTagName = "kontokorrent-select";
customElements.define(KontokorrentSelectTagName, KontokorrentSelect);
