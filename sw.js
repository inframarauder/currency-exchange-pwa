self.addEventListener("install", event => {
  console.log("service worker installed!");
  event.waitUntil(
    caches.open("static").then(cache => {
      cache.addAll([
        "index.html",
        "styles.css",
        "app.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        "https://kit.fontawesome.com/4cad6ef9a4.js",
        "https://fonts.googleapis.com/css?family=Muli&display=swap"
      ]);
    })
  );
});

self.addEventListener("activate", () => {
  console.log("service worker activated!");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(res => {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
      .catch(err => {
        console.log(err);
      })
  );
});
