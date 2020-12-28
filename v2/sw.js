(()=>{"use strict";var e;function t(e,t,n){return i=this,o=void 0,s=function*(){let i={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)};return n&&(i.headers=Object.assign(Object.assign({},i.headers),{Authorization:`Bearer ${n}`})),yield fetch(e,i)},new((r=void 0)||(r=Promise))((function(e,t){function n(e){try{d(s.next(e))}catch(e){t(e)}}function c(e){try{d(s.throw(e))}catch(e){t(e)}}function d(t){var i;t.done?e(t.value):(i=t.value,i instanceof r?i:new r((function(e){e(i)}))).then(n,c)}d((s=s.apply(i,o||[])).next())}));var i,o,r,s}!function(e){e.google="google",e.anonym="anonym"}(e||(e={}));class n{constructor(e){this.networkError=e}}class i{}class o{}let r;r="https://kontokorrent-v2.azurewebsites.net";const s="https://kontokorrent-v2.azurewebsites.net";class c{}var d=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function s(e){try{d(i.next(e))}catch(e){r(e)}}function c(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}d((i=i.apply(e,t||[])).next())}))};const u=s;class a{constructor(e){this.accountInfoStore=e}neuerBenutzer(e,n){return d(this,void 0,void 0,(function*(){try{return(yield t(`${u}/api/v2/accounts`,{id:e,secret:n})).ok?{success:!0}:{success:!1}}catch(e){return{success:!1}}}))}getUserInfo(){return d(this,void 0,void 0,(function*(){let e=yield fetch(`${u}/api/v2/userinfo`,{headers:yield this.getAuthHeader()});return yield e.json()}))}getAuthHeader(){return d(this,void 0,void 0,(function*(){return{Authorization:`Bearer ${yield this.getAccessToken()}`}}))}kontokorrentHinzufuegen(e,t){return d(this,void 0,void 0,(function*(){let n="";n=e?`oeffentlicherName=${encodeURIComponent(e)}`:`einladungsCode=${encodeURIComponent(t)}`;let i=yield this.getAuthHeader(),o=yield fetch(`${u}/api/v2/kontokorrents?${n}`,{method:"PUT",headers:i});return 404==o.status?null:yield o.json()}))}kontokorrentsAuflisten(){return d(this,void 0,void 0,(function*(){let e=yield fetch(`${u}/api/v2/kontokorrents`,{headers:yield this.getAuthHeader()});if(!e.ok)throw new o;return yield e.json()}))}neuerKontokorrent(e){return d(this,void 0,void 0,(function*(){let n=yield t(`${u}/api/v2/kontokorrents`,e,yield this.getAccessToken());return 422==n.status?{success:!1,exists:!0}:n.ok?{success:!0}:{success:!1}}))}getAktionen(e,t){return d(this,void 0,void 0,(function*(){let n=t?`?ab=${t}`:"",i=yield fetch(`${u}/api/v2/kontokorrents/${e}/aktionen${n}`,{headers:yield this.getAuthHeader()});if(404==i.status)return{success:!1,notfound:!0};if(i.ok){let e=yield i.json();return{success:!0,aktionen:this.mapAktionen(e)}}}))}mapAktionen(e){for(let t of e)t.bezahlung&&(t.bezahlung.zeitpunkt=new Date(t.bezahlung.zeitpunkt));return e}neueBezahlung(e,t){return d(this,void 0,void 0,(function*(){let n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/vnd+kontokorrent.hinzufuegenaktion+json",Authorization:`Bearer ${yield this.getAccessToken()}`},body:JSON.stringify(t)},i=yield fetch(`${u}/api/v2/kontokorrents/${e}/aktionen`,n);if(i.ok){let e=yield i.json();return this.mapAktionen([e])[0]}throw new c}))}getAccessToken(){return d(this,void 0,void 0,(function*(){let o=yield this.accountInfoStore.get();if(null==o)throw new Error("Keine Account Information gespeichert.");if(o.type==e.anonym){let e,i=yield this.accountInfoStore.getAccessToken("anonymous");if(null!=i){let{token:e,expires:t}=JSON.parse(i.value);if(e&&t&&t>=+new Date)return e}try{let i=yield t(`${u}/api/v2/token`,{id:o.id,secret:o.secret});if(!i.ok)throw new n(!1);e=yield i.json()}catch(e){throw new n(!0)}return yield this.accountInfoStore.updateAccessTokenIfNewer("anonymous",JSON.stringify(e),null==i?void 0:i.timestamp),e.token}throw o.type==e.google?new i:new Error(`Account Typ ${o.type} unbekannt`)}))}}var l=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function s(e){try{d(i.next(e))}catch(e){r(e)}}function c(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}d((i=i.apply(e,t||[])).next())}))};class h{constructor(e){this.db=e}set(e){return l(this,void 0,void 0,(function*(){yield this.db.setAccountInfo(e)}))}get(){return l(this,void 0,void 0,(function*(){return yield this.db.getAccountInfo()}))}clear(){return l(this,void 0,void 0,(function*(){yield this.db.clearAccountInfo()}))}getAccessToken(e){return l(this,void 0,void 0,(function*(){return yield this.db.getAccessToken(e)}))}updateAccessTokenIfNewer(e,t,n){return l(this,void 0,void 0,(function*(){return yield this.db.updateAccessTokenIfNewer(e,t,n)}))}}let f,v;const y=new WeakMap,p=new WeakMap,g=new WeakMap,k=new WeakMap,w=new WeakMap;let I={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return p.get(e);if("objectStoreNames"===t)return e.objectStoreNames||g.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return z(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function m(e){return"function"==typeof e?(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(v||(v=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(b(this),e),z(y.get(this))}:function(...e){return z(t.apply(b(this),e))}:function(e,...n){const i=t.call(b(this),e,...n);return g.set(i,e.sort?e.sort():[e]),z(i)}:(e instanceof IDBTransaction&&function(e){if(p.has(e))return;const t=new Promise(((t,n)=>{const i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",r),e.removeEventListener("abort",r)},o=()=>{t(),i()},r=()=>{n(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",r),e.addEventListener("abort",r)}));p.set(e,t)}(e),n=e,(f||(f=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>n instanceof e))?new Proxy(e,I):e);var t,n}function z(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",r)},o=()=>{t(z(e.result)),i()},r=()=>{n(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&y.set(t,e)})).catch((()=>{})),w.set(t,e),t}(e);if(k.has(e))return k.get(e);const t=m(e);return t!==e&&(k.set(e,t),w.set(t,e)),t}const b=e=>w.get(e),A=["get","getKey","getAll","getAllKeys","count"],B=["put","add","delete","clear"],S=new Map;function j(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(S.get(t))return S.get(t);const n=t.replace(/FromIndex$/,""),i=t!==n,o=B.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!o&&!A.includes(n))return;const r=async function(e,...t){const r=this.transaction(e,o?"readwrite":"readonly");let s=r.store;i&&(s=s.index(t.shift()));const c=await s[n](...t);return o&&await r.done,c};return S.set(t,r),r}var x;x=I,I={...x,get:(e,t,n)=>j(e,t)||x.get(e,t,n),has:(e,t)=>!!j(e,t)||x.has(e,t)};var E=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function s(e){try{d(i.next(e))}catch(e){r(e)}}function c(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}d((i=i.apply(e,t||[])).next())}))};const N="KontokorrentsStore",T="AppStateStore",D="AktionenStore",$="NeueBezahlungenStore";class O{withInitialized(e){return E(this,void 0,void 0,(function*(){let t=yield function(e,t,{blocked:n,upgrade:i,blocking:o,terminated:r}={}){const s=indexedDB.open(e,t),c=z(s);return i&&s.addEventListener("upgradeneeded",(e=>{i(z(s.result),e.oldVersion,e.newVersion,z(s.transaction))})),n&&s.addEventListener("blocked",(()=>n())),c.then((e=>{r&&e.addEventListener("close",(()=>r())),o&&e.addEventListener("versionchange",(()=>o()))})).catch((()=>{})),c}("kontokorrent-db",5,{upgrade(e,t,n){t<1&&e.createObjectStore(N,{keyPath:"id"}).createIndex("oeffentlicherName","oeffentlicherName"),t<2&&e.createObjectStore(T,{keyPath:"id"}).put({id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null}),t<3&&e.createObjectStore(D,{keyPath:["laufendeNummer","kontokorrentId"]}).createIndex("kontokorrentId","kontokorrentId"),t<5&&(e.objectStoreNames.contains($)&&e.deleteObjectStore($),e.createObjectStore($,{keyPath:"id"}).createIndex("kontokorrentId","kontokorrentId"))}});try{return yield e(t)}finally{t.close()}}))}getKontokorrents(){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((e=>E(this,void 0,void 0,(function*(){return t=yield e.getAll(N),n=e=>e.name,t.sort(((e,t)=>n(e).toLowerCase().localeCompare(n(t).toLowerCase())));var t,n}))))}))}addAktionen(e,t){return E(this,void 0,void 0,(function*(){if(t.length)return yield this.withInitialized((n=>E(this,void 0,void 0,(function*(){const i=n.transaction(D,"readwrite");let o=t.map((t=>Object.assign(Object.assign({},t),{kontokorrentId:e}))).map((e=>E(this,void 0,void 0,(function*(){try{i.store.add(e)}catch(t){console.error(`Aktion ${e.laufendeNummer} für kontokorrent ${e.kontokorrentId} war bereits hinzugefügt.`)}}))));yield Promise.all(o),yield i.done}))))}))}getZuletztGesehenerKontokorrentId(){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((e=>E(this,void 0,void 0,(function*(){let t=yield e.get(T,0);if(t.zuletztGesehenerKontokorrentId)return t.zuletztGesehenerKontokorrentId;{let e=yield yield this.getKontokorrents();return e.length?e[0].id:null}}))))}))}setZuletztGesehenerKontokorrentId(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){let n=yield t.get(T,0);n.zuletztGesehenerKontokorrentId=e,yield t.put(T,n)}))))}))}setKontokorrents(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){let n=yield t.getAll(N);for(let i of n.filter((t=>!e.some((e=>t.id===e.id)))))yield t.delete(N,i.id);let i=[];for(let o of e){let e=n.find((e=>e.id==o.id));e||i.push(o.id);let r=Object.assign(Object.assign({},e),{name:o.name,personen:o.personen,id:o.id,oeffentlicherName:o.oeffentlicherName});yield t.put(N,r)}return i}))))}))}addKontokorrent(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){(yield t.get(N,e.id))||(yield t.add(N,e))}))))}))}getKontokorrent(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){return yield t.get(N,e)}))))}))}getPerOeffentlichName(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){return yield t.getFromIndex(N,"oeffentlicherName",e)}))))}))}getAktionen(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){return yield t.getAllFromIndex(D,"kontokorrentId",e)}))))}))}clear(){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((e=>E(this,void 0,void 0,(function*(){yield e.clear(D),yield e.clear(N),yield e.put(T,{id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null})}))))}))}getAccessToken(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){return((yield t.get(T,0)).accesstokens||[]).find((t=>t.type===e))}))))}))}updateAccessTokenIfNewer(e,t,n){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((i=>E(this,void 0,void 0,(function*(){const o=i.transaction(T,"readwrite",{durability:"strict"});let r=yield o.store.get(0);r.accesstokens||(r.accesstokens=[]);let s=r.accesstokens.find((t=>t.type===e));if(s){if(s.timestamp!=n)return console.error(`The accesstoken of type ${e} was already updated since reading.`),yield o.done,!1;s.value=t,s.timestamp++}else r.accesstokens.push({timestamp:1,type:e,value:t});return yield o.store.put(r),yield o.done,!0}))))}))}setAccountInfo(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){const n=t.transaction(T,"readwrite");let i=yield n.store.get(0);i.accountinfo=e,yield n.store.put(i),yield n.done}))))}))}getAccountInfo(){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((e=>E(this,void 0,void 0,(function*(){const t=e.transaction(T,"readonly");let n=yield t.store.get(0);return null==n?void 0:n.accountinfo}))))}))}clearAccountInfo(){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((e=>E(this,void 0,void 0,(function*(){const t=e.transaction(T,"readwrite");let n=yield t.store.get(0);n.accountinfo=null,n.accesstokens=[],yield t.store.put(n),yield t.done}))))}))}getZwischengespeicherteBezahlungen(){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((e=>E(this,void 0,void 0,(function*(){return e.getAll($)}))))}))}getZwischengespeicherteBezahlungenForKontokorrent(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){return yield t.getAllFromIndex($,"kontokorrentId",e)}))))}))}bezahlungZwischenspeichern(e){return E(this,void 0,void 0,(function*(){return yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){t.add($,e)}))))}))}zwischengespeicherteBezahlungErledigt(e){return E(this,void 0,void 0,(function*(){yield this.withInitialized((t=>E(this,void 0,void 0,(function*(){t.delete($,e)}))))}))}}class L{constructor(e,t){this.apiClient=e,this.db=t}bezahlungAnlegen(e,t){return n=this,i=void 0,r=function*(){let n=yield this.apiClient.neueBezahlung(e,t);return this.db.addAktionen(e,[n]),n},new((o=void 0)||(o=Promise))((function(e,t){function s(e){try{d(r.next(e))}catch(e){t(e)}}function c(e){try{d(r.throw(e))}catch(e){t(e)}}function d(t){var n;t.done?e(t.value):(n=t.value,n instanceof o?n:new o((function(e){e(n)}))).then(s,c)}d((r=r.apply(n,i||[])).next())}));var n,i,o,r}}class P{constructor(e,t){this.kontokorrentId=e,this.bezahlungId=t,this.type=25}}class K{constructor(e,t){this.kontokorrentId=e,this.bezahlungId=t,this.type=26}}var C=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function s(e){try{d(i.next(e))}catch(e){r(e)}}function c(e){try{d(i.throw(e))}catch(e){r(e)}}function d(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}d((i=i.apply(e,t||[])).next())}))};const M="v8";function Z(e){return C(this,void 0,void 0,(function*(){const t=yield self.clients.matchAll();for(const n of t)n.postMessage({type:"statedispatch",msg:e})}))}self.addEventListener("install",(function(e){const t=["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"];for(let e of [{'revision':null,'url':'/v2/0c341c6c9e33d7180119.bundle.js'},{'revision':null,'url':'/v2/0e52d5a16071d41e18f2.bundle.js'},{'revision':null,'url':'/v2/259.cbdb2e7b4f859e70a8da.css'},{'revision':null,'url':'/v2/331.40854c29a162d3f529ea.css'},{'revision':null,'url':'/v2/634.87c330b7f696617da452.css'},{'revision':null,'url':'/v2/85a36ab1b3630d070462.bundle.js'},{'revision':null,'url':'/v2/88f9ae024a16aa1988e2.bundle.js'},{'revision':null,'url':'/v2/8ff0302d3691a67a7fbc.bundle.js'},{'revision':null,'url':'/v2/ad116b62ed6fa25e6eec.bundle.js'},{'revision':null,'url':'/v2/bfd624d282d55c7f9e81.bundle.js'},{'revision':null,'url':'/v2/e0abedb2892a3b10893e.bundle.js'},{'revision':'3a57114c3ee13bc721c2d0415b49cc6a','url':'/v2/favicons/android-chrome-192x192.png'},{'revision':'ed824703c3c9876c64c2431f643a9874','url':'/v2/favicons/android-chrome-512x512.png'},{'revision':'c6d41b85647148e1957cef99b4906ea9','url':'/v2/favicons/apple-touch-icon.png'},{'revision':'dd5464d9de3e53bfb4dd122f57acba9e','url':'/v2/favicons/browserconfig.xml'},{'revision':'ac90a4af152a3faa919137053a51ef59','url':'/v2/favicons/favicon-16x16.png'},{'revision':'d215721a665ba9d25238477b9022f4a2','url':'/v2/favicons/favicon-32x32.png'},{'revision':'ecf16b928d22f9f9904b6fe5098f9818','url':'/v2/favicons/favicon.ico'},{'revision':'b95dc058d8d8aab47821b20aa12efc87','url':'/v2/favicons/mstile-144x144.png'},{'revision':'7b4269725276411f8f2317464308e535','url':'/v2/favicons/mstile-150x150.png'},{'revision':'bcd915cfb20f6dc9a1d9e6ec57f771bf','url':'/v2/favicons/mstile-310x150.png'},{'revision':'a6282f67b088fec98fdb90a08e9b8c11','url':'/v2/favicons/mstile-310x310.png'},{'revision':'a551b4b2f361416feaa1dfdc67ba18be','url':'/v2/favicons/mstile-70x70.png'},{'revision':'82aeb37c560455a1565fbf71310aa90b','url':'/v2/favicons/safari-pinned-tab.svg'},{'revision':null,'url':'/v2/index.5684f76bc7b88437a837.css'},{'revision':'09afe9506d36f06b33c71c8470aeaf29','url':'/v2/licenses.txt'},{'revision':'5c887ce87efbde41b424f7bea08267c3','url':'/v2/site.webmanifest'}].map((e=>e.url)))t.push(e);e.waitUntil(caches.open(M).then((function(e){return e.addAll(t)})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(e!==M)return caches.delete(e)})))})))})),self.addEventListener("fetch",(function(e){if("navigate"!==e.request.mode)e.respondWith(caches.match(e.request).then((function(t){return t||fetch(e.request)})));else{if("GET"!==e.request.method)return;e.respondWith(caches.match("index.html",{cacheName:M}).then((t=>t||fetch(e.request))))}}));class G{constructor(e,t){this.db=e,this.neueBezahlungenService=t}zwischengespeicherteZahlungenAnlegen(){return C(this,void 0,void 0,(function*(){let e=yield this.db.getZwischengespeicherteBezahlungen();for(let t of e){yield Z(new P(t.kontokorrentId,t.id));try{let e=yield this.neueBezahlungenService.bezahlungAnlegen(t.kontokorrentId,t);yield this.db.zwischengespeicherteBezahlungErledigt(e.bezahlung.id),yield Z(new K(t.kontokorrentId,t.id))}catch(e){console.error("Fehler beim Anlegen der Zahlung",e)}}}))}}self.addEventListener("sync",(function(e){"NeueBezahlungBackgroundSync"==e.tag&&e.waitUntil((()=>C(this,void 0,void 0,(function*(){let e=new O,t=new h(e),n=new a(t),i=new L(n,e),o=new G(e,i);yield o.zwischengespeicherteZahlungenAnlegen()})))())}))})();
//# sourceMappingURL=sw.js.map