const CACHE="numerology-v5";
const ASSETS=[
 "./",
 "./index.html",
 "./index_backup.html",
 "./css/custom.css",
 "./js/numerology.js",
 "./js/yearFlow.js",
 "./data/numerologyData.json",
 "./data/yearlyThemeData.json",
 "./icons/icon-192.png",
 "./icons/icon-512.png"
];
self.addEventListener("install",e=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request)));});