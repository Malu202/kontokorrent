import { ApiClient } from "./api/ApiClient";
import { AccountInfoStore } from "./lib/AccountInfoStore";
import { KontokorrentDatabase } from "./lib/KontokorrentDatabase";
import { NeueBezahlungService } from "./lib/NeueBezahlungService";
import { ServiceWorkerActions, ServiceWorkerBezahlungAngelegt, ServiceWorkerBezahlungAnlegen } from "./state/actions/ServiceWorkerActions";
import { NeueBezahlungBackgroundSyncTag } from "./sw.constants";

export default null;
declare var self: ServiceWorkerGlobalScope;
declare global {
    interface WorkerGlobalScope {
        __WB_MANIFEST: Array<{ revision: null, url: string }>;
    }
}

const cacheName = "v9";

self.addEventListener("install", function (event) {
    const cacheAssets = [
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap",
        "index.html"];
    for (let asset of self.__WB_MANIFEST.map(v => v.url)) {
        cacheAssets.push(asset);
    }
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(cacheAssets);
            })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCacheName) {
                if (thisCacheName !== cacheName) {
                    return caches.delete(thisCacheName);
                }
            }));
        }));
})


self.addEventListener("fetch", function (event) {
    if (event.request.mode === "navigate") {
        if (event.request.method !== "GET") {
            return;
        }
        event.respondWith(caches.match("index.html", { cacheName: cacheName }).then(response => {
            return response || fetch(event.request);
        }));
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

async function dispatchToClients(msg: ServiceWorkerActions) {
    const clients = await self.clients.matchAll();
    for (const client of clients) {
        client.postMessage({ type: "statedispatch", msg });
    }
}

class BackgroundSyncService {
    constructor(private db: KontokorrentDatabase, private neueBezahlungenService: NeueBezahlungService) {

    }

    async zwischengespeicherteZahlungenAnlegen() {
        let zwischengespeicherte = await this.db.getZwischengespeicherteBezahlungen();
        for (let z of zwischengespeicherte) {
            await dispatchToClients(new ServiceWorkerBezahlungAnlegen(z.kontokorrentId, z.id));
            try {
                let res = await this.neueBezahlungenService.bezahlungAnlegen(z.kontokorrentId, z);
                await this.db.zwischengespeicherteBezahlungErledigt(res.bezahlung.id, {
                    ...res,
                    kontokorrentId: z.kontokorrentId
                });
                await dispatchToClients(new ServiceWorkerBezahlungAngelegt(z.kontokorrentId, z.id));
            }
            catch (err) {
                console.error("Fehler beim Anlegen der Zahlung", err);
            }
        }
    }
}

self.addEventListener("sync", function (event) {
    if (event.tag == NeueBezahlungBackgroundSyncTag) {
        event.waitUntil((async () => {
            let db = new KontokorrentDatabase();
            let accountInfoStore = new AccountInfoStore(db);
            let apiClient = new ApiClient(accountInfoStore);
            let neueBezahlungService = new NeueBezahlungService(apiClient, db);
            let backgroundSyncService = new BackgroundSyncService(db, neueBezahlungService);
            await backgroundSyncService.zwischengespeicherteZahlungenAnlegen();
        })());
    }
});