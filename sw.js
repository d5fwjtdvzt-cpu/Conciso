const V='conciso-v9',A=['./','./index.html','./dictionary.json','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(A.map(u=>c.add(new Request(u,{cache:'reload'}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>caches.match(r).then(x=>x||(r.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
