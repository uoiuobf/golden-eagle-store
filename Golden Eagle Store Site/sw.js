const CACHE_NAME = "goldeneagle-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./style.css",
  "./script.js",

  // Images (الشعار والأيقونات الجديدة وصور الألعاب)
  "./image/Golden Eagle.jpg",
  "./image/gta-vi.jpg",
  "./image/marvels-spider-man-2.jpg",
  "./image/god-of-war-ragnarok.jpg",
  "./image/ea-sports-fc-25.jpg",
  "./image/forza-motorsport-2024.jpg",
  "./image/elden-ring-shadow-of-the-erdtree.jpg",
  "./image/call-of-duty-mw-iii.jpg",
  "./image/zelda-tears-of-the-kingdom.jpg",
  "./image/nba-2k25.jpg",
  "./image/resident-evil-4-remake.jpg",

  // App icons
  "./image/Golden Eagle.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});