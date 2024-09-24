import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";

// Met en cache les fichiers statiques générés lors du build
precacheAndRoute(self.__WB_MANIFEST);

// Cache les fichiers CSS, JS et les images avec StaleWhileRevalidate
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image",
  new StaleWhileRevalidate()
);

// Utilise NetworkFirst pour les documents HTML pour permettre un cache offline
registerRoute(
  ({ request }) => request.destination === "document",
  new NetworkFirst()
);
