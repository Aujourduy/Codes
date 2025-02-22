const CACHE_NAME = "cours-danse-cache-v2";
const urlsToCache = [
    "/index.html",
    "/styles.css",
    "/script.js",
    "/icon-192.png",
    "/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cache mis à jour");
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Force l'activation immédiate
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Suppression de l'ancien cache :", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Met à jour tous les clients immédiatement
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
