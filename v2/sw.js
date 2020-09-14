var serviceWorkerOption = {
  "assets": [
    "/v2/mini-css-extract-plugin.licenses.txt",
    "/v2/0.e593a3ade81151b88948.bundle.worker.js",
    "/v2/kontokorrent-worker.licenses.txt",
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
    "/v2/index.5be93e9f0853bcc15ec3.css",
    "/v2/5e24d730d98c187debd0.bundle.js",
    "/v2/1.ca888c566506a9ee8493.bundle.js",
    "/v2/index.licenses.txt",
    "/v2/index.html"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/v2/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),t.default=null,self.addEventListener("install",(function(e){const t=["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500"];for(let e of serviceWorkerOption.assets)t.push(e);self.skipWaiting(),e.waitUntil(caches.open("v1").then((function(e){return e.addAll(t)})))})),self.addEventListener("fetch",(function(e){e.respondWith(fetch(e.request).catch((function(){return caches.match(e.request)})))})),self.addEventListener("activate",(function(e){}))}]);
//# sourceMappingURL=sw.js.map