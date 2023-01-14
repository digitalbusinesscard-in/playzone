self.addEventListener ("install", async (event) => {
    console.log("install event");
   });

self.addEventListener ("fetch", async (event) => {
  console.log("fetch event");
 });

 const cacheName = "pwa-conf-v1";
 const staticAssets = ["./", "./index.html", "./app.js", "./style.css", "./img/shoe.svg", "./img/bg.png", "./img/boot.png", "./img/facebook.png', "./img/google-pay.png', "./img/insta.svg', "./img/instagram.png', "./img/logo.png', "./img/phone.svg', "./img.-logo.png', "./img/share.png', "./img/site.svg', "./img/verified.svg', "./img/whatsapp.svg', "./img/whatsapp.png'];

self.addEventListener("install", async (event) => {
   const cache = await caches.open(cacheName);
   await cache.addAll (staticAssets);
 });
