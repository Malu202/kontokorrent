import template from "./KontokorrentSelect.html";
import "./KontokorrentSelect.scss";
import "./KontokorrentSelectList";
import { KontokorrentState } from "../../state/State";
import { KontokorrentSelectListTagName, KontokorrentSelectList } from "./KontokorrentSelectList";

export class KontokorrentSelect extends HTMLElement {
    private kontokorrentName: HTMLHeadingElement;
    private popupShown: boolean = false;
    private popup: HTMLDivElement;
    private kontokorrentSelectList: KontokorrentSelectList;
    private addButton: HTMLButtonElement;
    private activeKontokorrentId: string;
    private _kontokorrents: KontokorrentState[];

    constructor() {
        super();
        this.innerHTML = template;
        this.keyListener = this.keyListener.bind(this);
        this.touchListener = this.touchListener.bind(this);
        this.kontokorrentName = this.querySelector(`[data-ref="kontokorrent-name"]`);
        this.kontokorrentSelectList = this.querySelector(KontokorrentSelectListTagName);
        this.addButton = this.querySelector(`#add-kontokorrent`);
        this._kontokorrents = null;
    }

    connectedCallback() {
        this.popup = this.querySelector(`[data-ref="popup"]`);
        this.updateAttributes();
        this.addEventListener("click", e => {
            if (!this.popup.contains(<Element>(event.target))) {
                this.togglePopup();
            }
        });
        this.addButton.addEventListener("click", e => {
            this.dispatchEvent(new CustomEvent("addkontokorrent"));
        });
        this.kontokorrentSelectList.addEventListener("gotokontokorrent", () => {
            this.togglePopup();
        })
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
