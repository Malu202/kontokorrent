var serviceWorkerOption = {
  "assets": [
    "/v2/licenses.txt",
    "/v2/0.02975c45d9ed11a910e9.bundle.worker.js",
    "/v2/favicons/android-chrome-192x192.png",
    "/v2/favicons/android-chrome-512x512.png",
    "/v2/favicons/apple-touch-icon.png",
    "/v2/favicons/browserconfig.xml",
    "/v2/favicons/favicon-16x16.png",
    "/v2/favicons/favicon-32x32.png",
    "/v2/favicons/favicon.ico",
    "/v2/favicons/mstile-144x144.png",
    "/v2/favicons/mstile-150x150.png",
    "/v2/favicons/mstile-310x150.png",
    "/v2/favicons/mstile-310x310.png",
    "/v2/favicons/mstile-70x70.png",
    "/v2/favicons/safari-pinned-tab.svg",
    "/v2/site.webmanifest",
    "/v2/index.227f10e4a58833d0dc3f.css",
    "/v2/957d565317ca3f5a2588.bundle.js",
    "/v2/1.b7fc4ca24e8c1c792273.css",
    "/v2/1.ddea68962dbbff98c177.bundle.js",
    "/v2/2.5bfe84ed41f0bc1012d7.css",
    "/v2/2.b2519655ee1908e5e61b.bundle.js",
    "/v2/3.c16dd092655b6ad0ce7d.css",
    "/v2/3.cfab764da228ce76f525.bundle.js",
    "/v2/4.eddfcfc4d90393f6a5c8.css",
    "/v2/4.ae0dfb9f3ff8d426925d.bundle.js",
    "/v2/5.4837ce287f92df833c8d.bundle.js",
    "/v2/6.35e2609f833156d63762.bundle.js",
    "/v2/index.html"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/v2/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),t.default=null;self.addEventListener("install",(function(e){const t=["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"];for(let e of serviceWorkerOption.assets)t.push(e);e.waitUntil(caches.open("v2").then((function(e){return e.addAll(t)})))})),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if("v2"!==e)return caches.delete(e)})))})))}),self.addEventListener("fetch",(function(e){if("navigate"!==e.request.mode)e.respondWith(caches.match(e.request).then((function(t){return t||fetch(e.request)})));else{if("GET"!==e.request.method)return;e.respondWith(caches.match("index.html",{cacheName:"v2"}).then(t=>t||fetch(e.request)))}}))}]);
//# sourceMappingURL=sw.js.map