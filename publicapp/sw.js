const CACHE_NAME = `CalsyWeb-v7`;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      './',
      './math.js',
	  
	  './sw.js',
	  './calsyweb.webmanifest',
	  './index.html',
	  './app.js',
	  
	  './bootstrap.css',
	  './bootstrap.js'
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
	
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
		
		return cachedResponse;
    } else {
		
        try {
			if (!(event.request.url.indexOf('http') === 0)) return;
			const fetchResponse = await fetch(event.request);
		  
			cache.put(event.request, fetchResponse.clone());
			return fetchResponse;
        } catch (e) {
			;
        }
		
    }
  })());
});
