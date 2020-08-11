import { openDB, IDBPDatabase } from "idb";
import { StoredKontokorrent } from "./StoredKontokorrent";
import { sortBy } from "lodash";


const KontokorrentsStore = "KontokorrentsStore";
const AppStateStore = "AppStateStore";

export class KontokorrentDatabase {
    db: IDBPDatabase<unknown>;
    async initialize() {
        this.db = await openDB("kontokorrent-db", 2, {
            upgrade(db, oldVersion: number, newVersion: number) {
                if (oldVersion < 1) {
                    db.createObjectStore(KontokorrentsStore, { keyPath: "id" });
                }
                if (oldVersion < 2) {
                    let store = db.createObjectStore(AppStateStore, { keyPath: "id" });
                    store.put({ id: 0, zuletztGesehenerKontokorrentId: null });
                }
            },
        });
    }

    async getKontokorrents(): Promise<StoredKontokorrent[]> {
        return sortBy((await this.db.getAll(KontokorrentsStore)).map(v => { return { name: v.name, id: v.id } }), i => i.name);
    }

    async getZuletztGesehenerKontokorrentId(): Promise<string> {
        let appState = await this.db.get(AppStateStore, 0);
        if (appState.zuletztGesehenerKontokorrentId) {
            return appState.zuletztGesehenerKontokorrentId;
        }
        else {
            let kks = await (await this.getKontokorrents());
            if (kks.length) {
                return kks[0].id;
            }
            return null;
        }
    }

    async setZuletztGesehenerKontokorrentId(id: string): Promise<void> {
        let appState = await this.db.get(AppStateStore, 0);
        appState.zuletztGesehenerKontokorrentId = id;
        await this.db.put(AppStateStore, appState);
    }

    async setKontokorrents(kontokorrents: StoredKontokorrent[]): Promise<void> {
        let existing: StoredKontokorrent[] = (await this.db.getAll(KontokorrentsStore));
        for (let v of existing.filter(e => !kontokorrents.some(d => e.id === d.id))) {
            await this.db.delete(KontokorrentsStore, v.id);
        }
        for (let v of kontokorrents.filter(e => !existing.some(d => e.id === d.id))) {
            await this.db.add(KontokorrentsStore, v);
        }
    }

    async addKontokorrent(kk: StoredKontokorrent): Promise<void> {
        if (!await this.db.get(KontokorrentsStore, kk.id)) {
            await this.db.add(KontokorrentsStore, kk);
        }
    }

    close() {
        this.db.close();
    }
}

