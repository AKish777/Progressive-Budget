const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/index.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );

    caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
    );

    self.skipWaiting();
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if(key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old Cache!", key);
                        return caches.delete(key);
                    };
                })
            );
        })
    );

    self.clients.claim();
});