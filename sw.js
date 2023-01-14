const staticCacheName = 'site-static-v2'
const dynamicCacheName = 'site-dynamic-v1'
const assets = [
  '/playzone/',
  '/playzone/index.html',
  '/playzone/app.js',
  '/playzone/static/tmpl/404.html',
  '/playzone/img/shoe.svg',
  '/playzone/img/bg.png',
  '/playzone/img/boot.png',
  '/playzone/img/facebook.png',
  '/playzone/img/google-pay.png',
  '/playzone/img/insta.svg',
  '/playzone/img/instagram.png',
  '/playzone/img/logo.png',
  '/playzone/img/phone.svg',
  '/playzone/img/playzone-logo.png',
  '/playzone/img/share.png',
  '/playzone/img/site.svg',
  '/playzone/img/verified.svg',
  '/playzone/img/whatsapp.svg',
  '/playzone/img/whatsapp.png',
  '/playzone/style.css',
  '/playzone/script.js'
]

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed')
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets')
      cache.addAll(assets)
    })
  )
})

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated')
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys)
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      )
    })
  )
})

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt)
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone())
          // check cached items size
          limitCacheSize(dynamicCacheName, 15)
          return fetchRes
        })
      })
    }).catch(() => {
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('/playzone/static/tmpl/404.html')
      }
    })
  )
})