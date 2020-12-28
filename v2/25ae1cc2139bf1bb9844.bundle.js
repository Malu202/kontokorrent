(()=>{"use strict";const e=Symbol("Comlink.proxy"),t=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),r=Symbol("Comlink.thrown"),a=e=>"object"==typeof e&&null!==e||"function"==typeof e,o=new Map([["proxy",{canHandle:t=>a(t)&&t[e],serialize(e){const{port1:t,port2:n}=new MessageChannel;return i(e,t),[n,[n]]},deserialize:e=>(e.start(),l(e,[],undefined))}],["throw",{canHandle:e=>a(e)&&r in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function i(t,n=self){n.addEventListener("message",(function a(o){if(!o||!o.data)return;const{id:c,type:l,path:u}=Object.assign({path:[]},o.data),w=(o.data.argumentList||[]).map(f);let p;try{const n=u.slice(0,-1).reduce(((e,t)=>e[t]),t),r=u.reduce(((e,t)=>e[t]),t);switch(l){case 0:p=r;break;case 1:n[u.slice(-1)[0]]=f(o.data.value),p=!0;break;case 2:p=r.apply(n,w);break;case 3:p=function(t){return Object.assign(t,{[e]:!0})}(new r(...w));break;case 4:{const{port1:e,port2:n}=new MessageChannel;i(t,n),p=function(e,t){return d.set(e,t),e}(e,[e])}break;case 5:p=void 0}}catch(e){p={value:e,[r]:0}}Promise.resolve(p).catch((e=>({value:e,[r]:0}))).then((e=>{const[t,r]=h(e);n.postMessage(Object.assign(Object.assign({},t),{id:c}),r),5===l&&(n.removeEventListener("message",a),s(n))}))})),n.start&&n.start()}function s(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function c(e){if(e)throw new Error("Proxy has been released and is not useable")}function l(e,r=[],a=function(){}){let o=!1;const i=new Proxy(a,{get(t,a){if(c(o),a===n)return()=>w(e,{type:5,path:r.map((e=>e.toString()))}).then((()=>{s(e),o=!0}));if("then"===a){if(0===r.length)return{then:()=>i};const t=w(e,{type:0,path:r.map((e=>e.toString()))}).then(f);return t.then.bind(t)}return l(e,[...r,a])},set(t,n,a){c(o);const[i,s]=h(a);return w(e,{type:1,path:[...r,n].map((e=>e.toString())),value:i},s).then(f)},apply(n,a,i){c(o);const s=r[r.length-1];if(s===t)return w(e,{type:4}).then(f);if("bind"===s)return l(e,r.slice(0,-1));const[d,h]=u(i);return w(e,{type:2,path:r.map((e=>e.toString())),argumentList:d},h).then(f)},construct(t,n){c(o);const[a,i]=u(n);return w(e,{type:3,path:r.map((e=>e.toString())),argumentList:a},i).then(f)}});return i}function u(e){const t=e.map(h);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const d=new WeakMap;function h(e){for(const[t,n]of o)if(n.canHandle(e)){const[r,a]=n.serialize(e);return[{type:3,name:t,value:r},a]}return[{type:0,value:e},d.get(e)||[]]}function f(e){switch(e.type){case 3:return o.get(e.name).deserialize(e.value);case 0:return e.value}}function w(e,t,n){return new Promise((r=>{const a=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===a&&(e.removeEventListener("message",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:a},t),n)}))}function p(e,t){const n=new Map;return e.forEach((e=>{const r=e[t],a=n.get(r);a?a.push(e):n.set(r,[e])})),n}class g{constructor(e,t,n){this.wert=e,this.empfaengerAnzahl=t,this.isEmpfaenger=n}}class m{constructor(e){this.db=e}erweitern(e,t,n){let r=1;for(let e of n)e!=t&&(r*=e);return e*r}async calculateBalance(e){let t=function(e){let t={},n=e.sort(((e,t)=>e.laufendeNummer-t.laufendeNummer));for(let e of n)e.bearbeiteteBezahlungId&&delete t[e.bearbeiteteBezahlungId],e.geloeschteBezahlungId?delete t[e.geloeschteBezahlungId]:t[e.bezahlung.id]=e.bezahlung;return Object.values(t)}(await this.db.getAktionen(e)),n=[...await this.db.getZwischengespeicherteBezahlungenForKontokorrent(e),...t],r=await this.db.getKontokorrent(e),a={};for(let e of r.personen)a[e.id]=[];for(let e of n)for(let t of e.empfaengerIds)a[t].push(new g(e.wert,e.empfaengerIds.length,!0)),a[e.bezahlendePersonId].push(new g(e.wert,e.empfaengerIds.length,!1));let o={};for(let e of r.personen){let t=p(a[e.id],"empfaengerAnzahl"),n=Array.from(t.keys()),r=Array.from(t.keys()).reduce(((e,t)=>e*t),1);if(r<362880){let a=0;for(let e of t.keys()){let r=t.get(e).reduce(((e,t)=>e+(t.isEmpfaenger?t.wert:-t.wert)),0);a+=this.erweitern(r,e,n)}o[e.id]=a/r}else{let n=0;for(let e of t.keys())n+=t.get(e).reduce(((e,t)=>e+(t.isEmpfaenger?t.wert:-t.wert)),0)/e;o[e.id]=n}}return o}}let y,k;const I=new WeakMap,b=new WeakMap,z=new WeakMap,v=new WeakMap,E=new WeakMap;let A={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return b.get(e);if("objectStoreNames"===t)return e.objectStoreNames||z.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return S(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function B(e){return"function"==typeof e?(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(k||(k=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(j(this),e),S(I.get(this))}:function(...e){return S(t.apply(j(this),e))}:function(e,...n){const r=t.call(j(this),e,...n);return z.set(r,e.sort?e.sort():[e]),S(r)}:(e instanceof IDBTransaction&&function(e){if(b.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",o),e.removeEventListener("abort",o)},a=()=>{t(),r()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",a),e.addEventListener("error",o),e.addEventListener("abort",o)}));b.set(e,t)}(e),n=e,(y||(y=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>n instanceof e))?new Proxy(e,A):e);var t,n}function S(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",a),e.removeEventListener("error",o)},a=()=>{t(S(e.result)),r()},o=()=>{n(e.error),r()};e.addEventListener("success",a),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&I.set(t,e)})).catch((()=>{})),E.set(t,e),t}(e);if(v.has(e))return v.get(e);const t=B(e);return t!==e&&(v.set(e,t),E.set(t,e)),t}const j=e=>E.get(e),L=["get","getKey","getAll","getAllKeys","count"],N=["put","add","delete","clear"],D=new Map;function K(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(D.get(t))return D.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,a=N.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!a&&!L.includes(n))return;const o=async function(e,...t){const o=this.transaction(e,a?"readwrite":"readonly");let i=o.store;r&&(i=i.index(t.shift()));const s=await i[n](...t);return a&&await o.done,s};return D.set(t,o),o}var O;O=A,A={...O,get:(e,t,n)=>K(e,t)||O.get(e,t,n),has:(e,t)=>!!K(e,t)||O.has(e,t)};const x="KontokorrentsStore",M="AppStateStore",P="AktionenStore",C="NeueBezahlungenStore";class T{constructor(e){this.db=e}async getLaufendeNummer(e){let t,n=(await this.db.getAktionen(e)).map((e=>e.laufendeNummer)).sort(((e,t)=>e-t));for(t=0;t<n.length-1&&n[t]+1===n[t+1];t++);return n[t]}}const G=new class{async withInitialized(e){let t=await function(e,t,{blocked:n,upgrade:r,blocking:a,terminated:o}={}){const i=indexedDB.open(e,t),s=S(i);return r&&i.addEventListener("upgradeneeded",(e=>{r(S(i.result),e.oldVersion,e.newVersion,S(i.transaction))})),n&&i.addEventListener("blocked",(()=>n())),s.then((e=>{o&&e.addEventListener("close",(()=>o())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),s}("kontokorrent-db",5,{upgrade(e,t,n){t<1&&e.createObjectStore(x,{keyPath:"id"}).createIndex("oeffentlicherName","oeffentlicherName"),t<2&&e.createObjectStore(M,{keyPath:"id"}).put({id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null}),t<3&&e.createObjectStore(P,{keyPath:["laufendeNummer","kontokorrentId"]}).createIndex("kontokorrentId","kontokorrentId"),t<5&&(e.objectStoreNames.contains(C)&&e.deleteObjectStore(C),e.createObjectStore(C,{keyPath:"id"}).createIndex("kontokorrentId","kontokorrentId"))}});try{return await e(t)}finally{t.close()}}async getKontokorrents(){return await this.withInitialized((async e=>{return t=await e.getAll(x),n=e=>e.name,t.sort(((e,t)=>n(e).toLowerCase().localeCompare(n(t).toLowerCase())));var t,n}))}async addAktionen(e,t){if(!t.length)return;let n=t.map((t=>Object.assign(Object.assign({},t),{kontokorrentId:e})));return await this.withInitialized((t=>{const r=j(t);return new Promise(((t,a)=>{const o=r.transaction(P,"readwrite");o.onerror=e=>{console.error("addAktionen failed",e,o.error),a(o.error)},o.oncomplete=()=>{t()};for(let t of n){let n=o.objectStore(P).add(t);n.onerror=r=>{"ConstraintError"==n.error.name?(console.log(`Aktion ${t.laufendeNummer} für Kontokorrent ${e} bereits gespeichert.`,r,n.error),r.preventDefault(),r.stopPropagation()):console.error(`Aktion ${t.laufendeNummer} für Kontokorrent ${e} konnte nicht gespeichert werden.`,r,n.error)}}}))}))}async getZuletztGesehenerKontokorrentId(){return await this.withInitialized((async e=>{let t=await e.get(M,0);if(t.zuletztGesehenerKontokorrentId)return t.zuletztGesehenerKontokorrentId;{let e=await await this.getKontokorrents();return e.length?e[0].id:null}}))}async setZuletztGesehenerKontokorrentId(e){return await this.withInitialized((async t=>{let n=await t.get(M,0);n.zuletztGesehenerKontokorrentId=e,await t.put(M,n)}))}async setKontokorrents(e){return await this.withInitialized((async t=>{let n=await t.getAll(x);for(let r of n.filter((t=>!e.some((e=>t.id===e.id)))))await t.delete(x,r.id);let r=[];for(let a of e){let e=n.find((e=>e.id==a.id));e||r.push(a.id);let o=Object.assign(Object.assign({},e),{name:a.name,personen:a.personen,id:a.id,oeffentlicherName:a.oeffentlicherName});await t.put(x,o)}return r}))}async addKontokorrent(e){return await this.withInitialized((async t=>{await t.get(x,e.id)||await t.add(x,e)}))}async getKontokorrent(e){return await this.withInitialized((async t=>await t.get(x,e)))}async getPerOeffentlichName(e){return await this.withInitialized((async t=>await t.getFromIndex(x,"oeffentlicherName",e)))}async getAktionen(e){return await this.withInitialized((async t=>await t.getAllFromIndex(P,"kontokorrentId",e)))}async clear(){return await this.withInitialized((async e=>{await e.clear(P),await e.clear(x),await e.put(M,{id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null})}))}async getAccessToken(e){return await this.withInitialized((async t=>((await t.get(M,0)).accesstokens||[]).find((t=>t.type===e))))}async updateAccessTokenIfNewer(e,t,n){return await this.withInitialized((async r=>{const a=r.transaction(M,"readwrite",{durability:"strict"});let o=await a.store.get(0);o.accesstokens||(o.accesstokens=[]);let i=o.accesstokens.find((t=>t.type===e));if(i){if(i.timestamp!=n)return console.error(`The accesstoken of type ${e} was already updated since reading.`),await a.done,!1;i.value=t,i.timestamp++}else o.accesstokens.push({timestamp:1,type:e,value:t});return await a.store.put(o),await a.done,!0}))}async setAccountInfo(e){return await this.withInitialized((async t=>{const n=t.transaction(M,"readwrite");let r=await n.store.get(0);r.accountinfo=e,await n.store.put(r),await n.done}))}async getAccountInfo(){return await this.withInitialized((async e=>{const t=e.transaction(M,"readonly");let n=await t.store.get(0);return null==n?void 0:n.accountinfo}))}async clearAccountInfo(){return await this.withInitialized((async e=>{const t=e.transaction(M,"readwrite");let n=await t.store.get(0);n.accountinfo=null,n.accesstokens=[],await t.store.put(n),await t.done}))}async getZwischengespeicherteBezahlungen(){return await this.withInitialized((async e=>e.getAll(C)))}async getZwischengespeicherteBezahlungenForKontokorrent(e){return await this.withInitialized((async t=>await t.getAllFromIndex(C,"kontokorrentId",e)))}async bezahlungZwischenspeichern(e){return await this.withInitialized((async t=>{t.add(C,e)}))}async zwischengespeicherteBezahlungErledigt(e){await this.withInitialized((async t=>{t.delete(C,e)}))}};i({calculateBalance:async function(e){return await new m(G).calculateBalance(e)},getLaufendeNummer:async function(e){return await new T(G).getLaufendeNummer(e)}},self)})();
//# sourceMappingURL=25ae1cc2139bf1bb9844.bundle.js.map