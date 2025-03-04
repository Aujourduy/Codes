const CACHE_NAME = "cours-danse-cache-v61"; // Version mise à jour ********
const urlsToCache = [
    self.location.origin + "/index.html",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap",
    "https://cdn.jsdelivr.net/npm/algoliasearch@4.10.5/dist/algoliasearch.umd.min.js",
    "https://cdn.jsdelivr.net/npm/instantsearch.js@4"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Mise en cache des fichiers essentiels...");
            return cache.addAll(urlsToCache);
        }).catch(err => console.error("Erreur lors de la mise en cache :", err))
    );
    self.skipWaiting(); // Activation immédiate du nouveau Service Worker
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
        }).then(() => self.clients.claim()) // Prend le contrôle des pages immédiatement
    );
});

self.addEventListener("fetch", event => {
    // Ignorer les requêtes vers Algolia pour le mode hors-ligne
    if (event.request.url.includes("algolia")) {
        console.log("Ignoré Algolia en mode hors-ligne");
        return;
    }
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(() => {
            console.error("Échec de récupération :", event.request.url);
        })
    );
});
