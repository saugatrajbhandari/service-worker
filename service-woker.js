const cacheName = "v32";

// call install event
self.addEventListener("install", (e) => {
  //   const preCache = async () => {
  //     const cache = await caches.open(cacheName);
  //     return cache.addAll([
  //       "/index.html",
  //       "/about.html",
  //       "/style.css",
  //       "/script.js",
  //     ]);
  //   };
  //   e.waitUntil(preCache());

  // caching the pages
  //   e.waitUntil(
  //     caches.open(cacheName).then((cache) => {
  //       console.log("Service worker: Caching files");
  //       cache
  //         .addAll(["/index.html", "/about.html", "/style.css", "/script.js"])
  //         .then(() => self.skipWaiting());
  //     })
  //   );

  console.log("service worker installed", e);
});

// call activate event
self.addEventListener("activate", (e) => {
  console.log("service worker activate", e);

  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((item) => {
          if (item !== cacheName) {
            return caches.delete(item);
          }
        })
      )
    )
  );
});

// call fetch event

self.addEventListener("fetch", (e) => {
  console.log("fetching...");
  // check the live site in available, if not we will fetch from the cache

  // for page cache
  //   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));

  //    for entire site
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //make copy/clone of the response

        const resClone = res.clone();

        //open cache
        caches.open(cacheName).then((cache) => {
          // add response to the cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((error) => caches.match(e.request).then((res) => res))
  );
});
