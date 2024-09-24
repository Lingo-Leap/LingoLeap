import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
} from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

// Met en cache les fichiers statiques générés lors du build (HTML, JS, CSS, images)
precacheAndRoute(self.__WB_MANIFEST);

// Cache les fichiers CSS, JS et les images avec StaleWhileRevalidate (mise à jour en arrière-plan)
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60, // Limite le nombre de fichiers statiques en cache à 60
        maxAgeSeconds: 30 * 24 * 60 * 60, // Garde ces fichiers pendant 30 jours
      }),
    ],
  })
);

// Utilise NetworkFirst pour les documents HTML pour permettre un cache offline
registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst({
    cacheName: "html-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Seules les réponses avec un statut 0 ou 200 seront mises en cache
      }),
    ],
  })
);

// Utilise NetworkFirst pour les appels API afin de garder les données récentes mais avec un fallback en cache
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"), // Cible les requêtes API (modifier selon le chemin de ton API)
  new NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60,
      }),
    ],
  })
);
