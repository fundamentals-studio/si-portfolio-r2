/*------------------------------
Install
------------------------------*/
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style-webflow.css',
        '/style-style.css',
        '/main.js',
        '/Assets/favicon.jpg',
      ]);
    })
  );
});

/*------------------------------
Fetch
------------------------------*/
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
