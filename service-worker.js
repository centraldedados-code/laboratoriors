const CACHE='labrs-shell-20261108-v1';
const SHELL=['./','./index.html','./config.js','./plano.js','./app.js','./manifest.webmanifest','./assets/app-icon-192.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;const url=new URL(req.url);
 if(/\/(?:evidencias|documentos)\.json$/.test(url.pathname)){event.respondWith(fetch(req,{cache:'no-store'}).catch(()=>new Response('O índice de evidências precisa de conexão',{status:503})));return}
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone()));return r}).catch(()=>caches.match('./index.html')));return}
 if(SHELL.some(x=>url.pathname.endsWith('/'+x.replace('./','')))){event.respondWith(fetch(req).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone()));return r}).catch(()=>caches.match(req)))}
});
