import template from "./KontokorrentSelectList.html";
import "./KontokorrentSelectList.scss";
import { KontokorrentState } from "../../state/State";
import { sortByAlphabetically } from "../../utils/sortBy";
import { syncToList } from "../../utils/syncToList";
import { KontokorrentSelectListEntry } from "./KontokorrentSelectListEntry";

export class KontokorrentSelectList extends HTMLElement {
    private list: HTMLOListElement;
    private _kontokorrents: KontokorrentState[];
    private _activeKontokorrentId: string;


    constructor() {
        super();
        this.innerHTML = template;
        this.list = this.querySelector(`[data-ref="list"]`);
        this._kontokorrents = [];
    }

    connectedCallback() {
    }

    disconnectedCallback() {

    }

    private update() {
        syncToList(this.list,
            this._kontokorrents,
            k => k.id,
            () => new KontokorrentSelectListEntry(),
            (e, kontokorrent) => e.update(kontokorrent, this._activeKontokorrentId == kontokorrent.id));
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
