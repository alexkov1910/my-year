const CACHE='my-year-v3';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('my-year-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith((async()=>{try{const r=await fetch(e.request);if(r.ok)return r;return (await caches.match(e.request))||(e.request.mode==='navigate'?await caches.match('./index.html'):null)||r;}catch{ return (await caches.match(e.request))||(e.request.mode==='navigate'?await caches.match('./index.html'):null)||Response.error();}})());});
