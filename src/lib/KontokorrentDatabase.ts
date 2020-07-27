import { openDB, IDBPDatabase } from "idb";
import { StoredKontokorrent } from "./StoredKontokorrent";


const KontokorrentsStore = "KontokorrentsStore";

export class KontokorrentDatabase {
    db: IDBPDatabase<unknown>;
    async initialize() {
        this.db = await openDB("kontokorrent-db", 1, {
            upgrade(db, oldVersion: number, newVersion: number) {
                // db.createObjectStore(AccountInfoStore);
                db.createObjectStore(KontokorrentsStore, { keyPath: "id" });
            },
        });
    }

    async getKontokorrents(): Promise<StoredKontokorrent[]> {
        return (await this.db.getAll(KontokorrentsStore)).map(v => { return { name: v.name, id: v.id } });
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

    async close() {
        this.db.close();
    }
}

