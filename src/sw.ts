export default null;
declare var self: ServiceWorkerGlobalScope;
declare var serviceWorkerOption: { assets: string[] };

const cacheName = "v3";

self.addEventListener("install", function (event) {
    const cacheAssets = [
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"];
    for (let asset of serviceWorkerOption.assets) {
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