(()=>{var e,t={7455:(e,t,n)=>{var r=n(7703),a=n(7226),o=n(6956),i=n(687),s=Object.defineProperty;t.f=r?s:function(e,t,n){if(o(e),t=i(t,!0),o(n),a)try{return s(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},2042:(e,t,n)=>{var r=n(3224),a=n(4731).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,a)}},2587:(e,t,n)=>{"use strict";const r=Symbol("Comlink.proxy"),a=Symbol("Comlink.endpoint"),o=Symbol("Comlink.releaseProxy"),i=Symbol("Comlink.thrown"),s=e=>"object"==typeof e&&null!==e||"function"==typeof e,c=new Map([["proxy",{canHandle:e=>s(e)&&e[r],serialize(e){const{port1:t,port2:n}=new MessageChannel;return l(e,t),[n,[n]]},deserialize:e=>(e.start(),h(e,[],undefined))}],["throw",{canHandle:e=>s(e)&&i in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function l(e,t=self){t.addEventListener("message",(function n(a){if(!a||!a.data)return;const{id:o,type:s,path:c}=Object.assign({path:[]},a.data),d=(a.data.argumentList||[]).map(g);let h;try{const t=c.slice(0,-1).reduce(((e,t)=>e[t]),e),n=c.reduce(((e,t)=>e[t]),e);switch(s){case 0:h=n;break;case 1:t[c.slice(-1)[0]]=g(a.data.value),h=!0;break;case 2:h=n.apply(t,d);break;case 3:h=function(e){return Object.assign(e,{[r]:!0})}(new n(...d));break;case 4:{const{port1:t,port2:n}=new MessageChannel;l(e,n),h=function(e,t){return w.set(e,t),e}(t,[t])}break;case 5:h=void 0}}catch(e){h={value:e,[i]:0}}Promise.resolve(h).catch((e=>({value:e,[i]:0}))).then((e=>{const[r,a]=p(e);t.postMessage(Object.assign(Object.assign({},r),{id:o}),a),5===s&&(t.removeEventListener("message",n),u(t))}))})),t.start&&t.start()}function u(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function d(e){if(e)throw new Error("Proxy has been released and is not useable")}function h(e,t=[],n=function(){}){let r=!1;const i=new Proxy(n,{get(n,a){if(d(r),a===o)return()=>y(e,{type:5,path:t.map((e=>e.toString()))}).then((()=>{u(e),r=!0}));if("then"===a){if(0===t.length)return{then:()=>i};const n=y(e,{type:0,path:t.map((e=>e.toString()))}).then(g);return n.then.bind(n)}return h(e,[...t,a])},set(n,a,o){d(r);const[i,s]=p(o);return y(e,{type:1,path:[...t,a].map((e=>e.toString())),value:i},s).then(g)},apply(n,o,i){d(r);const s=t[t.length-1];if(s===a)return y(e,{type:4}).then(g);if("bind"===s)return h(e,t.slice(0,-1));const[c,l]=f(i);return y(e,{type:2,path:t.map((e=>e.toString())),argumentList:c},l).then(g)},construct(n,a){d(r);const[o,i]=f(a);return y(e,{type:3,path:t.map((e=>e.toString())),argumentList:o},i).then(g)}});return i}function f(e){const t=e.map(p);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const w=new WeakMap;function p(e){for(const[t,n]of c)if(n.canHandle(e)){const[r,a]=n.serialize(e);return[{type:3,name:t,value:r},a]}return[{type:0,value:e},w.get(e)||[]]}function g(e){switch(e.type){case 3:return c.get(e.name).deserialize(e.value);case 0:return e.value}}function y(e,t,n){return new Promise((r=>{const a=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===a&&(e.removeEventListener("message",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:a},t),n)}))}function m(e,t){const n=new Map;return e.forEach((e=>{const r=e[t],a=n.get(r);a?a.push(e):n.set(r,[e])})),n}class k{constructor(e,t,n){this.wert=e,this.empfaengerAnzahl=t,this.isEmpfaenger=n}}class b{constructor(e){this.db=e}erweitern(e,t,n){let r=1;for(let e of n)e!=t&&(r*=e);return e*r}async calculateBalance(e){let t=function(e){let t={},n=e.sort(((e,t)=>e.laufendeNummer-t.laufendeNummer));for(let e of n)e.bearbeiteteBezahlungId&&delete t[e.bearbeiteteBezahlungId],e.geloeschteBezahlungId?delete t[e.geloeschteBezahlungId]:t[e.bezahlung.id]=e.bezahlung;return Object.values(t)}(await this.db.getAktionen(e)),n=[...await this.db.getZwischengespeicherteBezahlungenForKontokorrent(e),...t],r=await this.db.getKontokorrent(e),a={};for(let e of r.personen)a[e.id]=[];for(let e of n)for(let t of e.empfaengerIds)a[t].push(new k(e.wert,e.empfaengerIds.length,!0)),a[e.bezahlendePersonId].push(new k(e.wert,e.empfaengerIds.length,!1));let o={};for(let e of r.personen){let t=m(a[e.id],"empfaengerAnzahl"),n=Array.from(t.keys()),r=Array.from(t.keys()).reduce(((e,t)=>e*t),1);if(r<362880){let a=0;for(let e of t.keys()){let r=t.get(e).reduce(((e,t)=>e+(t.isEmpfaenger?t.wert:-t.wert)),0);a+=this.erweitern(r,e,n)}o[e.id]=a/r}else{let n=0;for(let e of t.keys())n+=t.get(e).reduce(((e,t)=>e+(t.isEmpfaenger?t.wert:-t.wert)),0)/e;o[e.id]=n}}return o}}var z=n(9820);const I="KontokorrentsStore",v="AppStateStore",j="AktionenStore",S="NeueBezahlungenStore";class A{constructor(e){this.db=e}async getLaufendeNummer(e){let t,n=(await this.db.getAktionen(e)).map((e=>e.laufendeNummer)).sort(((e,t)=>e-t));for(t=0;t<n.length-1&&n[t]+1===n[t+1];t++);return n[t]}}const O=new class{async withInitialized(e){let t=await(0,z.X3)("kontokorrent-db",5,{upgrade(e,t,n){t<1&&e.createObjectStore(I,{keyPath:"id"}).createIndex("oeffentlicherName","oeffentlicherName"),t<2&&e.createObjectStore(v,{keyPath:"id"}).put({id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null}),t<3&&e.createObjectStore(j,{keyPath:["laufendeNummer","kontokorrentId"]}).createIndex("kontokorrentId","kontokorrentId"),t<5&&(e.objectStoreNames.contains(S)&&e.deleteObjectStore(S),e.createObjectStore(S,{keyPath:"id"}).createIndex("kontokorrentId","kontokorrentId"))}});try{return await e(t)}finally{t.close()}}async getKontokorrents(){return await this.withInitialized((async e=>{return t=await e.getAll(I),n=e=>e.name,t.sort(((e,t)=>n(e).toLowerCase().localeCompare(n(t).toLowerCase())));var t,n}))}async addAktionen(e,t){if(!t.length)return;let n=t.map((t=>Object.assign(Object.assign({},t),{kontokorrentId:e})));return await this.withInitialized((t=>{const r=(0,z.Wg)(t);return new Promise(((t,a)=>{const o=r.transaction(j,"readwrite");o.onerror=e=>{console.error("addAktionen failed",e,o.error),a(o.error)},o.oncomplete=()=>{t()};for(let t of n){let n=o.objectStore(j).add(t);n.onerror=r=>{"ConstraintError"==n.error.name?(console.log(`Aktion ${t.laufendeNummer} für Kontokorrent ${e} bereits gespeichert.`,r,n.error),r.preventDefault(),r.stopPropagation()):console.error(`Aktion ${t.laufendeNummer} für Kontokorrent ${e} konnte nicht gespeichert werden.`,r,n.error)}}}))}))}async getZuletztGesehenerKontokorrentId(){return await this.withInitialized((async e=>{let t=await e.get(v,0);if(t.zuletztGesehenerKontokorrentId)return t.zuletztGesehenerKontokorrentId;{let e=await await this.getKontokorrents();return e.length?e[0].id:null}}))}async setZuletztGesehenerKontokorrentId(e){return await this.withInitialized((async t=>{let n=await t.get(v,0);n.zuletztGesehenerKontokorrentId=e,await t.put(v,n)}))}async setKontokorrents(e){return await this.withInitialized((async t=>{let n=await t.getAll(I);for(let r of n.filter((t=>!e.some((e=>t.id===e.id)))))await t.delete(I,r.id);let r=[];for(let a of e){let e=n.find((e=>e.id==a.id));e||r.push(a.id);let o=Object.assign(Object.assign({},e),{name:a.name,personen:a.personen,id:a.id,oeffentlicherName:a.oeffentlicherName});await t.put(I,o)}return r}))}async addKontokorrent(e){return await this.withInitialized((async t=>{await t.get(I,e.id)||await t.add(I,e)}))}async getKontokorrent(e){return await this.withInitialized((async t=>await t.get(I,e)))}async getPerOeffentlichName(e){return await this.withInitialized((async t=>await t.getFromIndex(I,"oeffentlicherName",e)))}async getAktionen(e){return await this.withInitialized((async t=>await t.getAllFromIndex(j,"kontokorrentId",e)))}async clear(){return await this.withInitialized((async e=>{await e.clear(j),await e.clear(I),await e.put(v,{id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null})}))}async getAccessToken(e){return await this.withInitialized((async t=>((await t.get(v,0)).accesstokens||[]).find((t=>t.type===e))))}async updateAccessTokenIfNewer(e,t,n){return await this.withInitialized((async r=>{const a=r.transaction(v,"readwrite",{durability:"strict"});let o=await a.store.get(0);o.accesstokens||(o.accesstokens=[]);let i=o.accesstokens.find((t=>t.type===e));if(i){if(i.timestamp!=n)return console.error(`The accesstoken of type ${e} was already updated since reading.`),await a.done,!1;i.value=t,i.timestamp++}else o.accesstokens.push({timestamp:1,type:e,value:t});return await a.store.put(o),await a.done,!0}))}async setAccountInfo(e){return await this.withInitialized((async t=>{const n=t.transaction(v,"readwrite");let r=await n.store.get(0);r.accountinfo=e,await n.store.put(r),await n.done}))}async getAccountInfo(){return await this.withInitialized((async e=>{const t=e.transaction(v,"readonly");let n=await t.store.get(0);return null==n?void 0:n.accountinfo}))}async clearAccountInfo(){return await this.withInitialized((async e=>{const t=e.transaction(v,"readwrite");let n=await t.store.get(0);n.accountinfo=null,n.accesstokens=[],await t.store.put(n),await t.done}))}async getZwischengespeicherteBezahlungen(){return await this.withInitialized((async e=>e.getAll(S)))}async getZwischengespeicherteBezahlungenForKontokorrent(e){return await this.withInitialized((async t=>await t.getAllFromIndex(S,"kontokorrentId",e)))}async bezahlungZwischenspeichern(e){return await this.withInitialized((async t=>{t.add(S,e)}))}async zwischengespeicherteBezahlungErledigt(e){await this.withInitialized((async t=>{t.delete(S,e)}))}};l({calculateBalance:async function(e){return await new b(O).calculateBalance(e)},getLaufendeNummer:async function(e){return await new A(O).getLaufendeNummer(e)}},self)}},n={};function r(e){if(n[e])return n[e].exports;var a=n[e]={id:e,loaded:!1,exports:{}};return t[e](a,a.exports,r),a.loaded=!0,a.exports}r.m=t,r.x=()=>{r(2587)},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[])),r.u=e=>"a54cd8c09c26fa7f6dcc.bundle.js",r.miniCssF=e=>e+"."+{730:"31d6cfe0d16ae931b73c"}[e]+".css",r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e=r.x,r.x=()=>r.e(730).then(e),r.p="/v2/",(()=>{var e={24:1};r.f.i=(t,n)=>{e[t]||importScripts(""+r.u(t))};var t=self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[],n=t.push.bind(t);t.push=t=>{var[a,o,i]=t;for(var s in o)r.o(o,s)&&(r.m[s]=o[s]);for(i&&i(r);a.length;)e[a.pop()]=1;n(t)}})(),r.x()})();
//# sourceMappingURL=4c24048b5f5f7b513d45.bundle.js.map