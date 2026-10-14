const V='wb-v1',SH=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'],TO=3000;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SH)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res});
 const back=()=>caches.match(r).then(m=>m||caches.match('index.html'));
 e.respondWith(Promise.race([net,new Promise((_,rej)=>setTimeout(rej,TO))]).catch(()=>back().then(m=>m||net)));
 e.waitUntil(net.catch(()=>{}))});
