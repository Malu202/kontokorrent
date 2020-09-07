import { openDB, IDBPDatabase } from "idb";
import { StoredKontokorrent } from "./StoredKontokorrent";
import { sortByAlphabetically } from "../utils/sortBy";


const KontokorrentsStore = "KontokorrentsStore";
const AppStateStore = "AppStateStore";

export class KontokorrentDatabase {

    private async withInitialized<T>(cb: (db: IDBPDatabase<unknown>) => Promise<T>) {
        let db = await openDB("kontokorrent-db", 2, {
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
        try {
            return await cb(db);
        }
        finally {
            db.close();
        }
    }

    async getKontokorrents(): Promise<StoredKontokorrent[]> {
        return await this.withInitialized(async db => {
            return sortByAlphabetically((await db.getAll(KontokorrentsStore)).map(v => { return { name: v.name, id: v.id } }), k => k.name);
        });
    }

    async getZuletztGesehenerKontokorrentId(): Promise<string> {
        return await this.withInitialized(async db => {
            let appState = await db.get(AppStateStore, 0);
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
        });
    }

    async setZuletztGesehenerKontokorrentId(id: string): Promise<void> {
        return await this.withInitialized(async db => {
            let appState = await db.get(AppStateStore, 0);
            appState.zuletztGesehenerKontokorrentId = id;
            await db.put(AppStateStore, appState);
        });
    }

    async setKontokorrents(kontokorrents: StoredKontokorrent[]): Promise<void> {
        return await this.withInitialized(async db => {
            let existing: StoredKontokorrent[] = (await db.getAll(KontokorrentsStore));
            for (let v of existing.filter(e => !kontokorrents.some(d => e.id === d.id))) {
                await db.delete(KontokorrentsStore, v.id);
            }
            for (let v of kontokorrents.filter(e => !existing.some(d => e.id === d.id))) {
                await db.add(KontokorrentsStore, v);
            }
        });
    }

    async addKontokorrent(kk: StoredKontokorrent): Promise<void> {
        return await this.withInitialized(async db => {
            if (!await db.get(KontokorrentsStore, kk.id)) {
                await db.add(KontokorrentsStore, kk);
            }
        });
    }
}

