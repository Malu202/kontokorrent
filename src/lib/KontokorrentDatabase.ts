import { openDB, IDBPDatabase, DBSchema } from "idb";
import { KontokorrentDbModel } from "./KontokorrentDbModel";
import { sortByAlphabetically } from "../utils/sortBy";
import { Store } from "../state/Store";


const KontokorrentsStore = "KontokorrentsStore";
const AppStateStore = "AppStateStore";

interface KontokorrentDbSchema extends DBSchema {
    KontokorrentsStore: {
        key: string;
        value: KontokorrentDbModel;
    };
    AppStateStore: {
        value: {
            id: number;
            zuletztGesehenerKontokorrentId: string
        };
        key: number;
        indexes: { 'by-price': number };
    };
}


export class KontokorrentDatabase {

    private async withInitialized<T>(cb: (db: IDBPDatabase<KontokorrentDbSchema>) => Promise<T>) {
        let db = await openDB<KontokorrentDbSchema>("kontokorrent-db", 2, {
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

    async getKontokorrents(): Promise<KontokorrentDbModel[]> {
        return await this.withInitialized(async db => {
            return sortByAlphabetically((await db.getAll(KontokorrentsStore)), k => k.name);
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

    async setKontokorrents(kontokorrents: { name: string, id: string, personen: { name: string, id: string }[] }[]): Promise<void> {
        return await this.withInitialized(async db => {
            let existing: KontokorrentDbModel[] = (await db.getAll(KontokorrentsStore));
            for (let v of existing.filter(e => !kontokorrents.some(d => e.id === d.id))) {
                await db.delete(KontokorrentsStore, v.id);
            }
            for (let v of kontokorrents) {
                let ex = existing.find(d => d.id == v.id);
                let combined = { ...ex, ...v };
                await db.put(KontokorrentsStore, combined);
            }
        });
    }

    async addKontokorrent(kk: KontokorrentDbModel): Promise<void> {
        return await this.withInitialized(async db => {
            if (!await db.get(KontokorrentsStore, kk.id)) {
                await db.add(KontokorrentsStore, kk);
            }
        });
    }

    async getKontokorrent(id: string): Promise<KontokorrentDbModel> {
        return await this.withInitialized(async db => {
            return <KontokorrentDbModel>await db.get(KontokorrentsStore, id);
        });
    }
}

