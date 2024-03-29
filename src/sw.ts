import { ApiClient } from "./api/ApiClient";
import { AccountInfoStore } from "./lib/AccountInfoStore";
import { KontokorrentDatabase } from "./lib/KontokorrentDatabase";
import { BezahlungenService } from "./lib/BezahlungenService";
import { ServiceWorkerActions, ServiceWorkerBezahlungAngelegt, ServiceWorkerBezahlungAnlegen } from "./state/actions/ServiceWorkerActions";
import { NeueBezahlungBackgroundSyncTag } from "./sw.constants";

export default null;
declare var self: ServiceWorkerGlobalScope;
declare global {
    interface WorkerGlobalScope {
        __WB_MANIFEST: Array<{ revision: null, url: string }>;
    }
}
let cacheNames = {
    code: `code-${__CACHENAME}`,
    asset: "asset-v2",
    webfont: "webfont"
};

self.addEventListener("install", function (event) {
    let dividedAssets = self.__WB_MANIFEST.reduce((acc, next) => {
        if (next.url.indexOf("favicons/") > -1 || next.url.indexOf("assets/") > -1) {
            acc.asset.push(next.url);
        }
        else {
            acc.code.push(next.url);
        }
        return acc;
    }, { asset: [], code: [] });
    let definedCaches = [
        {
            name: cacheNames.code, assets: [...dividedAssets.code]
        },
        {
            name: cacheNames.asset,
            assets: dividedAssets.asset,
        },
        {
            name: cacheNames.webfont,
            assets: ["https://fonts.googleapis.com/icon?family=Material+Icons",
                "https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
            ]
        }
    ];
    event.waitUntil((async () => {
        let tasks = definedCaches.map(async c => {
            let cache = await caches.open(c.name);
            await cache.addAll(c.assets);
        });
        await Promise.all(tasks);
    })());
});

self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        let storedCaches = await caches.keys();
        let expectedCaches = Object.values(cacheNames);
        let tasks = storedCaches.filter(c => expectedCaches.indexOf(c) < 0).map(async c => {
            await caches.delete(c);
        })
        await Promise.all(tasks);
    })());
});


self.addEventListener("fetch", function (event) {
    if (event.request.mode === "navigate") {
        if (event.request.method !== "GET") {
            return fetch(event.request);
        }
        event.respondWith(caches.match("index.html", { cacheName: cacheNames.code }).then(response => {
            return response || fetch(event.request);
        }));
        return fetch(event.request);
    }
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            else if (["https://fonts.gstatic.com",
                "https://fonts.googleapis.com"].some(url => event.request.url.startsWith(url))) {
                event.waitUntil((async () => {
                    (await caches.open(cacheNames.webfont)).add(event.request);
                })());
            }
            return fetch(event.request);
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
    constructor(private db: KontokorrentDatabase, private neueBezahlungenService: BezahlungenService) {

    }

    async zwischengespeicherteZahlungenAnlegen() {
        let zwischengespeicherte = await this.db.getZwischengespeicherteBezahlungen();
        for (let z of zwischengespeicherte) {
            await dispatchToClients(new ServiceWorkerBezahlungAnlegen(z.kontokorrentId, z.id));
            try {
                let res = await this.neueBezahlungenService.bezahlungAnlegen(z.kontokorrentId, z);
                await this.db.zwischengespeicherteBezahlungErledigt(res.bezahlung.id);
                await dispatchToClients(new ServiceWorkerBezahlungAngelegt(z.kontokorrentId, z.id));
            }
            catch (err) {
                // wenn abgebrochen wurde nachdem der request gesendet wurde, aber noch nicht in der db gespeichert
                if (await this.db.getBezahlungAktion(z.kontokorrentId, z.id) != null) {
                    await this.db.zwischengespeicherteBezahlungErledigt(z.id);
                } else {
                    console.error("Fehler beim Anlegen der Zahlung", err);
                }
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
            let neueBezahlungService = new BezahlungenService(apiClient, db);
            let backgroundSyncService = new BackgroundSyncService(db, neueBezahlungService);
            await backgroundSyncService.zwischengespeicherteZahlungenAnlegen();
        })());
    }
});