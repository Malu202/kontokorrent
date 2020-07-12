import { openDB, IDBPDatabase } from "idb";


export class KontokorrentDatabase {
    db: IDBPDatabase<unknown>;
    async initialize() {
        this.db = await openDB("kontokorrent-db", 1, {
            upgrade(db, oldVersion: number, newVersion: number) {
                // db.createObjectStore(AccountInfoStore);
            },
        });
    }
    // async getAccountInformation(): Promise<AccountInfo> {
    //     return this.db.get(AccountInfoStore, "info");
    // }
    // async setAccountInformation(info: AccountInfo) {
    //     await this.db.put(AccountInfoStore, info, "info");
    // }
    async close() {
        this.db.close();
    }
}

