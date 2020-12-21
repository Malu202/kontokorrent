export default null;
declare var self: ServiceWorkerGlobalScope;
declare var serviceWorkerOption: { assets: string[] };

const cacheName = "v5";

const constantCaches = [{
    name: "materialicons",
    action: (c: Cache) => c.addAll(["https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
    ])
}
    // }, {
    //     name: "opencv45",
    //     action: (c: Cache) => {
    //         var request = "https://docs.opencv.org/4.5.0/opencv.js";
    //         fetch(request, {
    //             mode: "no-cors"
    //         }).then(res => {
    //             c.put(request, res);
    //         })
    //     }
    // }
];

self.addEventListener("install", function (event) {
    let constantActions = constantCaches.map(c => caches.open(c.name).then(cache => c.action(cache)));
    let cacheActions = Promise.all([caches.open(cacheName)
        .then(function (cache) {
            return cache.addAll(serviceWorkerOption.assets);
        }), ...constantActions])
    event.waitUntil(
        cacheActions
    );
});

self.addEventListener("activate", event => {
    const expectedCacheNames = [cacheName, ...constantCaches.map(v => v.name)]
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCacheName) {
                if (expectedCacheNames.indexOf(thisCacheName) < 0) {
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