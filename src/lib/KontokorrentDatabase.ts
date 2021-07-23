import { openDB, IDBPDatabase, DBSchema, unwrap } from "idb";
import { KontokorrentDbModel } from "./KontokorrentDbModel";
import { sortByAlphabetically } from "../utils/sortBy";
import { Aktion } from "../api/Aktion";
import { AktionDbModel } from "./AktionDbModel";
import { AccountInfo } from "./AccountInfo";
import { NeueBezahlungDbModel } from "./NeueBezahlungDbModel";
import { BearbeitungsStatus } from "./BearbeitungsStatus";


const KontokorrentsStore = "KontokorrentsStore";
const AppStateStore = "AppStateStore";
const AktionenStore = "AktionenStore";
const NeueBezahlungenStore = "NeueBezahlungenStore";

interface AccessTokenInfo {
    timestamp: number;
    value: string;
    type: "google" | "anonymous";
}

interface AppSettings {
    id: number;
    zuletztGesehenerKontokorrentId: string
    accesstokens: AccessTokenInfo[];
    accountinfo: AccountInfo;
}

interface KontokorrentDbSchema extends DBSchema {
    KontokorrentsStore: {
        key: string;
        value: KontokorrentDbModel;
        indexes: { "oeffentlicherName": string };
    };
    AppStateStore: {
        value: AppSettings;
        key: number;
    };
    AktionenStore: {
        key: [number, string],
        value: AktionDbModel,
        indexes: { "kontokorrentId": string };
    };
    NeueBezahlungenStore: {
        key: string,
        value: NeueBezahlungDbModel,
        indexes: { "kontokorrentId": string };
    }
}


const initialSettings: (() => AppSettings) = () => { return { id: 0, zuletztGesehenerKontokorrentId: null, accesstokens: [], accountinfo: null } };
export class KontokorrentDatabase {

    private async withInitialized<T>(cb: (db: IDBPDatabase<KontokorrentDbSchema>) => Promise<T>) {
        let db = await openDB<KontokorrentDbSchema>("kontokorrent-db", 5, {
            upgrade(db, oldVersion: number, newVersion: number) {
                if (oldVersion < 1) {
                    let store = db.createObjectStore(KontokorrentsStore, { keyPath: "id" });
                    store.createIndex("oeffentlicherName", "oeffentlicherName");
                }
                if (oldVersion < 2) {
                    let store = db.createObjectStore(AppStateStore, { keyPath: "id" });
                    store.put(initialSettings());
                }
                if (oldVersion < 3) {
                    let store = db.createObjectStore(AktionenStore, { keyPath: ["laufendeNummer", "kontokorrentId"] });
                    store.createIndex("kontokorrentId", "kontokorrentId");
                }
                if (oldVersion < 5) {
                    if (db.objectStoreNames.contains(NeueBezahlungenStore)) {
                        db.deleteObjectStore(NeueBezahlungenStore)
                    }
                    let store = db.createObjectStore(NeueBezahlungenStore, { keyPath: "id" });
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
        let mapped = aktionen
            .map(v => {
                let a: AktionDbModel = {
                    ...v,
                    kontokorrentId: id
                };
                return a;
            });
        return await this.withInitialized(db => {
            const unwrapped = unwrap(<IDBPDatabase>db);
            return new Promise((resolve, reject) => {
                const tx = unwrapped.transaction(AktionenStore, "readwrite");
                tx.onerror = err => {
                    console.error("addAktionen failed", err, tx.error);
                    reject(tx.error);
                };
                tx.oncomplete = () => {
                    resolve();
                }
                for (let a of mapped) {
                    let request = tx.objectStore(AktionenStore).add(a);
                    request.onerror = ev => {
                        if (request.error.name == "ConstraintError") {
                            console.log(`Aktion ${a.laufendeNummer} für Kontokorrent ${id} bereits gespeichert.`, ev, request.error);
                            ev.preventDefault();
                            ev.stopPropagation();
                        } else {
                            console.error(`Aktion ${a.laufendeNummer} für Kontokorrent ${id} konnte nicht gespeichert werden.`, ev, request.error);
                        }
                    }
                }
            });
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

    async setKontokorrents(kontokorrents: {
        name: string, id: string, personen: { name: string, id: string }[],
        oeffentlicherName: string
    }[]): Promise<string[]> {
        return await this.withInitialized(async db => {
            let existing: KontokorrentDbModel[] = (await db.getAll(KontokorrentsStore));
            for (let v of existing.filter(e => !kontokorrents.some(d => e.id === d.id))) {
                await db.delete(KontokorrentsStore, v.id);
            }
            let newIds: string[] = [];
            for (let v of kontokorrents) {
                let ex = existing.find(d => d.id == v.id);
                if (!ex) {
                    newIds.push(v.id);
                }
                let combined = {
                    ...ex, name: v.name, personen: v.personen, id: v.id,
                    oeffentlicherName: v.oeffentlicherName
                };
                await db.put(KontokorrentsStore, combined);
            }
            return newIds;
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

    async getPerOeffentlichName(id: string): Promise<KontokorrentDbModel> {
        return await this.withInitialized(async db => {
            return <KontokorrentDbModel>await db.getFromIndex(KontokorrentsStore, "oeffentlicherName", id);
        });
    }

    async getAktionen(id: string): Promise<AktionDbModel[]> {
        return await this.withInitialized(async db => {
            return await db.getAllFromIndex(AktionenStore, "kontokorrentId", id);
        });
    }

    async clear() {
        return await this.withInitialized(async db => {
            await db.clear(AktionenStore);
            await db.clear(KontokorrentsStore);
            await db.put(AppStateStore, initialSettings());
        });
    }

    async getAccessToken(tokenType: "anonymous" | "google"): Promise<AccessTokenInfo> {
        return await this.withInitialized(async db => {
            let appState = await db.get(AppStateStore, 0);
            return (appState.accesstokens || []).find(t => t.type === tokenType);
        });
    }

    async updateAccessTokenIfNewer(tokenType: "anonymous" | "google", value: string, lastTimeStamp: number): Promise<boolean> {
        return await this.withInitialized(async db => {
            const tx = db.transaction(AppStateStore, "readwrite", { durability: "strict" });
            let appState = await tx.store.get(0);
            if (!appState.accesstokens) {
                appState.accesstokens = [];
            }
            let existing = appState.accesstokens.find(t => t.type === tokenType);
            if (!existing) {
                appState.accesstokens.push({
                    timestamp: 1,
                    type: tokenType,
                    value: value
                });
            } else if (existing.timestamp == lastTimeStamp) {
                existing.value = value;
                existing.timestamp++;
            }
            else {
                console.error(`The accesstoken of type ${tokenType} was already updated since reading.`);
                await tx.done;
                return false;
            }
            await tx.store.put(appState);
            await tx.done;
            return true;
        });
    }

    async setAccountInfo(accountInfo: AccountInfo): Promise<void> {
        return await this.withInitialized(async db => {
            const tx = db.transaction(AppStateStore, "readwrite");
            let appState = await tx.store.get(0);
            appState.accountinfo = accountInfo;
            await tx.store.put(appState);
            await tx.done;
        });
    }

    async getAccountInfo(): Promise<AccountInfo> {
        return await this.withInitialized(async db => {
            const tx = db.transaction(AppStateStore, "readonly");
            let appState = await tx.store.get(0);
            return appState?.accountinfo;
        });
    }

    async clearAccountInfo(): Promise<void> {
        return await this.withInitialized(async db => {
            const tx = db.transaction(AppStateStore, "readwrite");
            let appState = await tx.store.get(0);
            appState.accountinfo = null;
            appState.accesstokens = [];
            await tx.store.put(appState);
            await tx.done;
        });
    }

    async getZwischengespeicherteBezahlungen(): Promise<NeueBezahlungDbModel[]> {
        return await this.withInitialized(async db => {
            return (await db.getAll(NeueBezahlungenStore));
        });
    }

    async getBezahlungAktion(kontokorrentId: string, bezahlungId: string): Promise<AktionDbModel> {
        return await this.withInitialized(async db => {
            var aktionen = db.getAllFromIndex(AktionenStore, "kontokorrentId", kontokorrentId);
            return (await aktionen).find(a => a.bezahlung && a.bezahlung.id == bezahlungId);
        });
    }

    async getBearbeitungsStatus(kontokorrentId: string, bezahlungId: string): Promise<{ aktion: AktionDbModel, status: BearbeitungsStatus }> {
        return await this.withInitialized(async db => {
            let aktionen: AktionDbModel[] = await db.getAllFromIndex(AktionenStore, "kontokorrentId", kontokorrentId);
            let aktion = aktionen.find(a => a.bezahlung && a.bezahlung.id == bezahlungId);
            if (!aktion) {
                let neueBezahlungen: NeueBezahlungDbModel[] = await db.getAllFromIndex(NeueBezahlungenStore, "kontokorrentId", kontokorrentId);
                let neueBezahlung = neueBezahlungen.find(a => a.id == bezahlungId);
                if (neueBezahlung) {
                    return { aktion: null, status: BearbeitungsStatus.Zwischengespeichert };
                }
                return { aktion: null, status: BearbeitungsStatus.NichtGefunden };
            }
            let bearbeitendeAktion = aktionen.find(a => a.bearbeiteteBezahlungId == bezahlungId);
            if (null != bearbeitendeAktion) {
                return { aktion: aktion, status: BearbeitungsStatus.Bearbeitet };
            }
            let loeschendeAktion = aktionen.find(a => a.geloeschteBezahlungId == bezahlungId);
            if (null != loeschendeAktion) {
                return { aktion: aktion, status: BearbeitungsStatus.Geloescht };
            }
            return { aktion: aktion, status: BearbeitungsStatus.Bearbeitbar };
        });
    }

    async getZwischengespeicherteBezahlungenForKontokorrent(kontokorrentId: string): Promise<NeueBezahlungDbModel[]> {
        return await this.withInitialized(async db => {
            return await db.getAllFromIndex(NeueBezahlungenStore, "kontokorrentId", kontokorrentId);
        });
    }

    async bezahlungZwischenspeichern(m: NeueBezahlungDbModel) {
        return await this.withInitialized(async db => {
            db.add(NeueBezahlungenStore, m);
        });
    }

    async zwischengespeicherteBezahlungErledigt(id: string) {
        await this.withInitialized(async db => {
            db.delete(NeueBezahlungenStore, id);
        });
    }
}
