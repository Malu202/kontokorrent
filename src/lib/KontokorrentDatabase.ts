import { openDB, IDBPDatabase, DBSchema } from "idb";
import { KontokorrentDbModel } from "./KontokorrentDbModel";
import { sortByAlphabetically } from "../utils/sortBy";
import { Store } from "../state/Store";
import { Aktion } from "../api/Aktion";
import { AktionDbModel } from "./AktionDbModel";


const KontokorrentsStore = "KontokorrentsStore";
const AppStateStore = "AppStateStore";
const AktionenStore = "AktionenStore";

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
    };
    AktionenStore: {
        key: [number, string],
        value: AktionDbModel,
        indexes: { "kontokorrentId": string };
    };
}


export class KontokorrentDatabase {


    private async withInitialized<T>(cb: (db: IDBPDatabase<KontokorrentDbSchema>) => Promise<T>) {
        let db = await openDB<KontokorrentDbSchema>("kontokorrent-db", 3, {
            upgrade(db, oldVersion: number, newVersion: number) {
                if (oldVersion < 1) {
                    db.createObjectStore(KontokorrentsStore, { keyPath: "id" });
                }
                if (oldVersion < 2) {
                    let store = db.createObjectStore(AppStateStore, { keyPath: "id" });
                    store.put({ id: 0, zuletztGesehenerKontokorrentId: null });
                }
                if (oldVersion < 3) {
                    let store = db.createObjectStore(AktionenStore, { keyPath: ["laufendeNummer", "kontokorrentId"] });
                    store.createIndex("kontokorrentId", "kontokorrentId");
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

    async addAktionen(id: string, aktionen: Aktion[]): Promise<void> {
        if (!aktionen.length) {
            return;
        }
        return await this.withInitialized(async db => {
            const tx = db.transaction(AktionenStore, "readwrite");
            let tasks = aktionen.map(v => {
                let a: AktionDbModel = {
                    ...v,
                    kontokorrentId: id
                };
                return a;
            }).map(a => tx.store.add(a));
            await Promise.all(tasks);
            await tx.done;
            const tx2 = db.transaction(KontokorrentsStore, "readwrite");
            let kk = await tx2.store.get(id);
            let max = Math.max(...aktionen.map(v => v.laufendeNummer));
            kk.laufendeNummer = max;
            await tx2.store.put(kk);
            await tx2.done;
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
                let combined = { ...ex, name: v.name, personen: v.personen, id: v.id };
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

    async getAktionen(id: string): Promise<AktionDbModel[]> {
        return await this.withInitialized(async db => {
            return await db.getAllFromIndex(AktionenStore, "kontokorrentId", id);
        });
    }
}

