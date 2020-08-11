self.addEventListener("install", function (event) {
    const cacheAssets = [
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500"];
    for (let asset of serviceWorkerOption.assets) {
        cacheAssets.push(asset);
    }
    self.skipWaiting();
    event.waitUntil(
        caches.open("v1")
            .then(function (cache) {
                return cache.addAll(cacheAssets);
            })
    );
});


self.addEventListener("fetch", function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {

});