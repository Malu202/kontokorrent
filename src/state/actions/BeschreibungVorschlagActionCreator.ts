import { Store } from "../lib/Store";
import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { ActionNames } from "./ActionNames";
import { Action } from "../lib/Action";
import { groupBy } from "../../utils/groupBy";
import { markAsUntransferable } from "worker_threads";

export class BeschreibungsVorschlaege implements Action {
    readonly type = ActionNames.BeschreibungsVorschlaege;
    constructor(public kontokorrentId: string, public vorschlaege: string[]) {

    }
}

export type BeschreibungVorschlagActions =
    | BeschreibungsVorschlaege;

export class BeschreibungVorschlagActionCreator {
    private beschreibungenCache: { kontokorrentId: string, beschreibungen: { search: string, result: string, occurence: number }[] };
    constructor(private db: KontokorrentDatabase, private store: Store) {
        this.resetCache();
    }


    private formatSearchString(s: string) {
        return s.toLowerCase().replace(/\s|-/g, "");
    }

    private sameChars(s: string, d: string) {
        let i;
        for (i = 0; i < Math.min(s.length, d.length); i++) {
            if (s[i] != d[i]) {
                break;
            }
        }
        return i;
    }

    resetCache() {
        this.beschreibungenCache = { kontokorrentId: null, beschreibungen: [] };
    }

    async getVorschlaege(kontokorrentId: string, eingabe: string) {
        if (this.beschreibungenCache.kontokorrentId != kontokorrentId) {
            let aktionen = await this.db.getAktionen(kontokorrentId);
            let beschreibungen = aktionen.filter(a => null != a.bezahlung?.beschreibung).map(a => {
                return { search: this.formatSearchString(a.bezahlung.beschreibung), result: a.bezahlung.beschreibung.trim() }
            });
            this.beschreibungenCache.kontokorrentId = kontokorrentId;
            let map = groupBy(beschreibungen, "search");
            this.beschreibungenCache.beschreibungen = Array.from(map.entries()).map(([search, r]) => {

                return {
                    search,
                    result: r[0].result,
                    occurence: r.length
                };
            }).sort((a, b) => b.occurence - a.occurence);
        }
        if (eingabe) {
            let formatted = this.formatSearchString(eingabe);
            let vorschlaege = this.beschreibungenCache.beschreibungen
                .filter(({ search }) => search.indexOf(formatted) > -1)
                .map(({ search, result }) => {
                    return { result, score: this.sameChars(formatted, search) }
                }).sort((a, b) => b.score - a.score);
            this.store.dispatch(new BeschreibungsVorschlaege(kontokorrentId, vorschlaege.map(b => b.result)));
        }
        else {
            let vorschlaege = this.beschreibungenCache.beschreibungen.slice(0, 10).map(b => b.result);
            this.store.dispatch(new BeschreibungsVorschlaege(kontokorrentId, vorschlaege));
        }
    }
}