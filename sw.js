const CACHE='equipment-tracker-v4';
const FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(CACHE).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>{
    const f=fetch(e.request).then(res=>{
      if(res.ok&&new URL(e.request.url).origin===location.origin)c.put(e.request,res.clone());
      return res;
    }).catch(()=>r||c.match('./index.html'));
    return r||f;
  })));
});
                                                                                                              
