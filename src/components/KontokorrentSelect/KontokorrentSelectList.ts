import template from "./KontokorrentSelectList.html";
import "./KontokorrentSelectList.scss";
import { KontokorrentState } from "../../state/State";
import { sortByAlphabetically } from "../../utils/sortBy";
import { ArrayToElementRenderer } from "../../utils/ArrayToElementRenderer";
import { KontokorrentSelectListEntry } from "./KontokorrentSelectListEntry";

export class KontokorrentSelectList extends HTMLElement {
    private list: HTMLOListElement;
    private _kontokorrents: KontokorrentState[];
    private _activeKontokorrentId: string;
    private kontokorrentsRenderer: ArrayToElementRenderer<KontokorrentState, HTMLLIElement, string>;
    private rendered = false;


    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.list = this.querySelector(`[data-ref="list"]`);
            this._kontokorrents = [];
            this.kontokorrentsRenderer = new ArrayToElementRenderer(this.list,
                (k: KontokorrentState) => k.id,
                () => {
                    let li = document.createElement("li");
                    li.appendChild(new KontokorrentSelectListEntry());
                    return li;
                });
            this.update();
        }
    }

    disconnectedCallback() {

    }

    private update() {
        if (this.rendered) {
            this.kontokorrentsRenderer.update(this._kontokorrents,
                (li, kontokorrent) => {
                    let x: KontokorrentSelectListEntry = <KontokorrentSelectListEntry>li.firstChild;
                    x.update(kontokorrent, this._activeKontokorrentId == kontokorrent.id);
                });
        }
    }

    set kontokorrents(kontokorrents: KontokorrentState[]) {
        this._kontokorrents = sortByAlphabetically(kontokorrents, k => k.name);
        this.update();
    }

    set activeKontokorrentId(id: string) {
        this._activeKontokorrentId = id;
        this.update();
    }
}
export const KontokorrentSelectListTagName = "kontokorrent-select-list";
customElements.define(KontokorrentSelectListTagName, KontokorrentSelectList);
