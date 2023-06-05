// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts
const CACHE_NAME = 'jellybean_cache';
const addResourcesToCache = async (resources) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
    console.log('Resources added to cache successfully.');
  } catch (error) {
    console.error('Failed to add resources to cache:', error);
  }
};

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/jellybean_fortune",
      "/jellybean_fortune/fortune.html",
      "/jellybean_fortune/jellybean.html",
      "/jellybean_fortune/assets",
      "/jellybean_fortune/assets/goofy.mp3",
      "jellybean_fortune/mute-white.svg",
      "jellybean_fortune/mute.svg"
    ])
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  // We added some known URLs to the cache above, but tracking down every
  // subsequent network request URL and adding it manually would be very taxing.
  // We will be adding all of the resources not specified in the intiial cache
  // list to the cache as they come in.
  /*******************************/
  // This article from Google will help with this portion. Before asking ANY
  // questions about this section, read this article.
  // NOTE: In the article's code REPLACE fetch(event.request.url) with
  //       fetch(event.request)
  // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
  /*******************************/
  event.respondWith(caches.open(CACHE_NAME).then((cache) => {
    // Respond with the image from the cache or from the network
    return cache.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request, {cache: "no-store"}).then((fetchedResponse) => {
        // Add the network response to the cache for future visits.
        // Note: we need to make a copy of the response to save it in
        // the cache and use the original as the request response.
        cache.put(event.request, fetchedResponse.clone());
        // Return the network response
        return fetchedResponse;
      });
    });
  }));
});
