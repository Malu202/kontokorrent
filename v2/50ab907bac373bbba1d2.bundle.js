!function(e){function t(t){for(var n,r,i=t[0],s=t[1],a=0,c=[];a<i.length;a++)r=i[a],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&c.push(o[r][0]),o[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(u&&u(t);c.length;)c.shift()()}var n={},r={0:0},o={0:0};function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[];r[e]?t.push(r[e]):0!==r[e]&&{1:1,2:1,3:1}[e]&&t.push(r[e]=new Promise((function(t,n){for(var o=e+"."+{1:"0ce44ca5c3f634c36ccd",2:"5d027351de09a90a6041",3:"69f6fdb9ca090f17fcb4",4:"31d6cfe0d16ae931b73c",5:"31d6cfe0d16ae931b73c"}[e]+".css",s=i.p+o,a=document.getElementsByTagName("link"),c=0;c<a.length;c++){var u=(l=a[c]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===o||u===s))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){var l;if((u=(l=d[c]).getAttribute("data-href"))===o||u===s)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var o=t&&t.target&&t.target.src||s,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete r[e],h.parentNode.removeChild(h),n(i)},h.href=s,document.getElementsByTagName("head")[0].appendChild(h)})).then((function(){r[e]=0})));var n=o[e];if(0!==n)if(n)t.push(n[2]);else{var s=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=s);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=function(e){return i.p+""+e+"."+{1:"aca9efed2eb3b044f186",2:"a1a94267284bdf4e6da9",3:"419bad08f813618f9e30",4:"4c015043afeac5d0cf0e",5:"0fd7466b6a83c755d950"}[e]+".bundle.js"}(e);var u=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,n[1](u)}o[e]=void 0}};var d=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/v2/",i.oe=function(e){throw console.error(e),e};var s=self.webpackJsonp=self.webpackJsonp||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=a;i(i.s=13)}([function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return d}));var r=n(9),o=n.n(r),i=n(1),s=n(5);class a extends HTMLElement{constructor(){super(),this.innerHTML=o.a}addServices(e){this.routingActionCreator=Object(i.a)(e)}connectedCallback(){Object(s.a)().allPassed&&(this.routingActionCreator.navigateHome(),window.location.reload())}disconnectedCallback(){}}customElements.define("app-features-required",a);var c,u=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};!function(e){e.Login="login",e.Info="info",e.Home="",e.FeaturesRequired="features-required",e.Kontokorrents="kontokorrents",e.CreateEvent="create-event",e.BezahlungEintragen="eintragen"}(c||(c={}));class d extends EventTarget{constructor(e){super(),this.store=e}setServiceLocator(e){this.serviceLocator=e}getKontokorrentPageComponent(){return u(this,void 0,void 0,(function*(){const{KontokorrentPage:e}=yield n.e(1).then(n.bind(null,60));let t=new e;return t.addServices(this.serviceLocator),t}))}resolve(e,t,r){return u(this,void 0,void 0,(function*(){switch(t in c&&this.dispatchEvent(new CustomEvent("routedTo",{detail:{currentRoute:t}})),t){case c.Info:const{Info:e}=yield n.e(5).then(n.bind(null,59));let t=new e;return t.addServices(this.serviceLocator),t;case c.FeaturesRequired:{let e=new a;return e.addServices(this.serviceLocator),e}case c.Login:{const{Login:e}=yield n.e(3).then(n.bind(null,63));let t=new e;return t.addServices(this.serviceLocator),t}case c.CreateEvent:{const{CreateKontokorrent:e}=yield n.e(4).then(n.bind(null,62));let t=new e;return t.addServices(this.serviceLocator),t}}if(!this.store.state.account.accountCreated)return!1;switch(t){case c.BezahlungEintragen:const{BezahlungEintragenPage:e}=yield n.e(2).then(n.bind(null,61));let t=new e;return t.addServices(this.serviceLocator),t}let e=/^kontokorrents\/([a-zA-Z0-9\-]+)$/.exec(t);if(e){let t=e[1],n=yield this.getKontokorrentPageComponent();return n.setRouteParameters(t),n}let r=yield this.getKontokorrentPageComponent();return r.addServices(this.serviceLocator),r}))}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(0);class o{constructor(e){this.router=e}navigateHome(){this.router.navigate(r.b.Home,null)}navigateLogin(e){this.router.navigate(r.b.Login,null,e)}navigateFeaturesRequired(){this.router.navigate(r.b.FeaturesRequired,null)}navigate(e){this.router.navigate(e,null)}navigateKontokorrent(e,t){this.router.navigate(`${r.b.Kontokorrents}/${e}`,null,t)}}function i(e){return e.get("RoutingActionCreator",e=>new o(e.router))}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{}},function(e,t,n){"use strict";var r;n.d(t,"a",(function(){return r})),function(e){e.google="google",e.anonym="anonym"}(r||(r={}))},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{constructor(e){this.networkError=e}}},function(e,t,n){"use strict";function r(){let e="indexedDB"in window,t="localStorage"in window,n=null;try{localStorage.setItem("test","1"),n=!0}catch(e){n=!1}return{allPassed:e&&t&&n,indexedDBEnabled:e,localStorageEnabled:t,storageAllowed:n}}n.d(t,"a",(function(){return r}))},function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var r=n(11),o=n(3),i=n(1),s=n(4),a=n(2),c=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};class u{constructor(){this.type=0}}class d{constructor(){this.type=1}}class l{constructor(e){this.info=e,this.type=2}}class h{constructor(e){this.info=e,this.type=3}}class f{constructor(){this.type=4}}class g{constructor(){this.type=5}}class p{constructor(e,t,n,r,o){this.store=e,this.apiClient=t,this.accountInfoStore=n,this.routingActionCreator=r,this.db=o}initializeAccount(){let e=this.accountInfoStore.get();return!!this.accountInfoStore.get()&&(this.store.dispatch(new h(e)),this.getUserInfo(),!0)}getUserInfo(){return c(this,void 0,void 0,(function*(){try{yield this.apiClient.getUserInfo()}catch(e){if(e instanceof s.a){let t=this.accountInfoStore.get();e.networkError||t.type!=o.a.anonym||(this.accountInfoStore.clear(),window.location.reload())}else e instanceof a.a&&this.store.dispatch(new g)}}))}ensureAccount(){return c(this,void 0,void 0,(function*(){if(!this.store.state.account.accountCreated){let e={id:Object(r.a)(),secret:Object(r.a)(),type:o.a.anonym};this.store.dispatch(new u);let t=yield this.apiClient.neuerBenutzer(e.id,e.secret);return t.success?(this.store.dispatch(new l(e)),this.accountInfoStore.set(e)):this.store.dispatch(new d),t.success}return!0}))}logout(){return c(this,void 0,void 0,(function*(){this.accountInfoStore.clear(),yield this.db.clear(),this.store.dispatch(new f),this.routingActionCreator.navigateLogin()}))}}function v(e){return e.get("AccountActionCreator",e=>new p(e.store,e.apiClient,e.accountInfoStore,Object(i.a)(e),e.db))}},function(e,t,n){"use strict";function r(e,t){return e.sort((e,n)=>t(e).toLowerCase().localeCompare(t(n).toLowerCase()))}n.d(t,"a",(function(){return r}))},function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n(2),o=n(1),i=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};class s{constructor(){this.type=11}}class a{constructor(e){this.kontokorrents=e,this.type=12}}class c{constructor(e){this.interactionRequired=e,this.type=13}}class u{constructor(e,t,n,r){this.store=e,this.apiClient=t,this.routingActionCreator=n,this.db=r}navigiereZuLetztGesehenem(e){return i(this,void 0,void 0,(function*(){let t=yield this.db.getZuletztGesehenerKontokorrentId();return!!t&&(this.routingActionCreator.navigateKontokorrent(t,e),!0)}))}syncKontokorrentListe(){return i(this,void 0,void 0,(function*(){this.store.dispatch(new s);const e=this.apiClient.kontokorrentsAuflisten();let t=yield this.db.getKontokorrents();this.store.dispatch(new a(t));try{let t=yield e;yield this.db.setKontokorrents(t.map(e=>({id:e.id,name:e.name,personen:e.personen,oeffentlicherName:e.oeffentlicherName}))),this.store.dispatch(new a(t))}catch(e){e instanceof r.a?this.store.dispatch(new c(!0)):this.store.dispatch(new c(!1))}}))}}function d(e){return e.get("KontokorrentListenActionCreator",e=>new u(e.store,e.apiClient,Object(o.a)(e),e.db))}},function(e,t){e.exports="<h1>Speicherzugriff benötigt</h1> Kontokorrent speichert die Zahlungen und weitere Informationen im lokalen Speicher dieses Geräts. Auf diese Weise kann man für einige Tage eingeloggt bleiben, und die Anwendung auch verwenden, wenn die Internetverbindung schlecht ist. In den meisten Browsern (Chrome, Edge) muss dazu der Webseite erlaubt werden <strong>Cookies</strong> zu speichern. Nachdem die Berechtigung erteilt wurde die Webseite neu laden."},function(e,t){var n="/v2/sw.js";Object.defineProperty(t,"__esModule",{value:!0}),t.default={register:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return!!navigator.serviceWorker&&navigator.serviceWorker.register(n,e)}},e.exports=t.default},function(e,t,n){"use strict";var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),o=new Uint8Array(16);function i(){if(!r)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(o)}var s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var a=function(e){return"string"==typeof e&&s.test(e)},c=[],u=0;u<256;++u)c.push((u+256).toString(16).substr(1));var d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(c[e[t+0]]+c[e[t+1]]+c[e[t+2]]+c[e[t+3]]+"-"+c[e[t+4]]+c[e[t+5]]+"-"+c[e[t+6]]+c[e[t+7]]+"-"+c[e[t+8]]+c[e[t+9]]+"-"+c[e[t+10]]+c[e[t+11]]+c[e[t+12]]+c[e[t+13]]+c[e[t+14]]+c[e[t+15]]).toLowerCase();if(!a(n))throw TypeError("Stringified UUID is invalid");return n};t.a=function(e,t,n){var r=(e=e||{}).random||(e.rng||i)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(var o=0;o<16;++o)t[n+o]=r[o];return t}return d(r)}},function(e,t,n){},function(e,t,n){"use strict";n.r(t);class r{constructor(e,t){this.routeResolver=e,this.routeRenderer=t,this.lastRoute=null,this.popStateListener=this.handlePopState.bind(this)}handlePopState(e){this.doRouting(window.location.pathname)}run(){let e=document.querySelector("base");this.basePrefix=e.getAttribute("href"),this.baseHref=e.href,window.addEventListener("popstate",this.popStateListener),this.doRouting(window.location.pathname)}destroy(){window.removeEventListener("popstate",this.popStateListener)}doRouting(e){let t=this.getRoute(e);return Promise.resolve(this.routeResolver.resolve(this.lastRoute,t,this)).then(e=>!!e&&(this.routeRenderer.render(e),this.lastRoute=t,!0))}getRoute(e){let t=e===this.baseHref,n=e.substr(0,this.basePrefix.length)===this.basePrefix;return t?"/":n?e.substring(this.basePrefix.length):e}navigate(e,t,n){let r=new URL(e,this.baseHref);this.doRouting(r.pathname).then(e=>{e&&(n?window.history.replaceState({},t||document.title,r.href):window.history.pushState({},t||document.title,r.href))})}}class o{constructor(){this.currentComponent=null}render(e){e&&(this.currentComponent&&document.body.removeChild(this.currentComponent),document.body.appendChild(e),this.currentComponent=e)}}var i=n(0);class s extends class{constructor(e){this.subscriptions=[],this.reducerSubscriptions=[],this.state=e()}subscribe(e,t){let n={area:e,call:t};return this.subscriptions.push(n),()=>{this.subscriptions.splice(this.subscriptions.indexOf(n),1)}}addReducer(e,t){this.reducerSubscriptions.push({area:e,reducer:t})}dispatch(e){let t=[];for(let n of this.reducerSubscriptions){let r;r=n.area?e=>{this.state[n.area]=e(this.state[n.area]),t.push(n.area)}:e=>{this.state=e(this.state),t.push("")};try{n.reducer.onDispatch(e,r)}catch(t){console.error(`Error while dispatching ${e.type}.`,t)}}if(t.length)for(let n of this.subscriptions)if(!n.area||t.indexOf(n.area)>-1)try{n.call(this.state)}catch(t){console.error(`Error while updating on ${n.area||"global"} after ${e.type}.`,t)}}}{}class a{constructor(e,t,n,r,o){this.store=e,this.router=t,this.apiClient=n,this.db=r,this.accountInfoStore=o,this.services={}}get(e,t){return this.services[e]||(this.services[e]=t(this)),this.services[e]}}class c{set(e){localStorage.setItem("account_info",JSON.stringify(e))}get(){let e=localStorage.getItem("account_info");return null==e?null:JSON.parse(e)}clear(){localStorage.removeItem("account_info"),localStorage.removeItem("access_token_anonymous"),localStorage.removeItem("access_token_google")}}var u=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};function d(e,t,n){return u(this,void 0,void 0,(function*(){let r={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)};return n&&(r.headers=Object.assign(Object.assign({},r.headers),{Authorization:"Bearer "+n})),yield fetch(e,r)}))}var l=n(3),h=n(4),f=n(2);class g{}let p;p="https://kontokorrent-v2.azurewebsites.net";var v=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};const b={API_URL:p}.API_URL;class k{constructor(e){this.accountInfoStore=e}neuerBenutzer(e,t){return v(this,void 0,void 0,(function*(){try{return(yield d(b+"/api/v2/accounts",{id:e,secret:t})).ok?{success:!0}:{success:!1}}catch(e){return{success:!1}}}))}getUserInfo(){return v(this,void 0,void 0,(function*(){let e=yield fetch(b+"/api/v2/userinfo",{headers:yield this.getAuthHeader()});return yield e.json()}))}getAuthHeader(){return v(this,void 0,void 0,(function*(){return{Authorization:"Bearer "+(yield this.getAccessToken())}}))}kontokorrentHinzufuegen(e,t){return v(this,void 0,void 0,(function*(){let n="";n=e?"oeffentlicherName="+encodeURIComponent(e):"einladungsCode="+encodeURIComponent(t);let r=yield this.getAuthHeader(),o=yield fetch(`${b}/api/v2/kontokorrents?${n}`,{method:"PUT",headers:r});return 404==o.status?null:yield o.json()}))}kontokorrentsAuflisten(){return v(this,void 0,void 0,(function*(){let e=yield fetch(b+"/api/v2/kontokorrents",{headers:yield this.getAuthHeader()});if(!e.ok)throw new g;return yield e.json()}))}neuerKontokorrent(e){return v(this,void 0,void 0,(function*(){let t=yield d(b+"/api/v2/kontokorrents",e,yield this.getAccessToken());return 422==t.status?{success:!1,exists:!0}:t.ok?{success:!0}:{success:!1}}))}getAktionen(e,t){return v(this,void 0,void 0,(function*(){let n=t?"?ab="+t:"",r=yield fetch(`${b}/api/v2/kontokorrents/${e}/aktionen${n}`,{headers:yield this.getAuthHeader()});if(404==r.status)return{success:!1,notfound:!0};if(r.ok){let e=yield r.json();for(let t of e)t.bezahlung&&(t.bezahlung.zeitpunkt=new Date(t.bezahlung.zeitpunkt));return{success:!0,aktionen:e}}}))}getAccessToken(){return v(this,void 0,void 0,(function*(){let e=this.accountInfoStore.get();if(null==e)throw new Error("Keine Account Information gespeichert.");let t=localStorage.getItem("access_token_anonymous");if(null!=t){let{token:e,expires:n}=JSON.parse(t);if(e&&n&&n>=+new Date)return e}if(e.type!=l.a.anonym)throw e.type==l.a.google?new f.a:new Error(`Account Typ ${e.type} unbekannt`);try{let t=yield d(b+"/api/v2/token",{id:e.id,secret:e.secret});if(!t.ok)throw new h.a(!1);let n=yield t.json();return localStorage.setItem("access_token_anonymous",JSON.stringify(n)),n.token}catch(e){throw new h.a(!0)}}))}}class y{onDispatch(e,t){switch(e.type){case 0:t(e=>Object.assign(Object.assign({},e),{accountCreating:!0,accountCreationFailed:!1}));break;case 2:t(t=>Object.assign(Object.assign({},t),{accountCreating:!1,accountCreated:!0,accountInfo:e.info}));break;case 1:t(e=>Object.assign(Object.assign({},e),{accountCreationFailed:!0,accountCreating:!1,accountCreated:!1}));break;case 3:t(t=>Object.assign(Object.assign({},t),{accountCreated:!0,accountInfo:e.info}));break;case 4:t(e=>Object.assign(Object.assign({},e),{accountCreated:!1}));break;case 5:t(e=>Object.assign(Object.assign({},e),{loginExpired:!0}));break;case 13:e.interactionRequired&&t(e=>Object.assign(Object.assign({},e),{loginExpired:!0}))}}}class m{onDispatch(e,t){switch(e.type){case 11:t(e=>Object.assign(Object.assign({},e),{listeLaden:!0}));break;case 13:t(e=>Object.assign(Object.assign({},e),{listeLaden:!1}));break;case 12:t(t=>Object.assign(Object.assign({},t),{kontokorrents:this.extendMap(t.kontokorrents,e.kontokorrents)}));break;case 10:t(e=>Object.assign(Object.assign({},e),{hinzufuegen:!0}));break;case 9:t(t=>Object.assign(Object.assign({},t),{hinzufuegen:!1,hinzufuegenFailed:{kontokorrentNotFound:e.notFound}}));break;case 20:t(t=>Object.assign(Object.assign({},t),{hinzufuegen:!1,kontokorrents:this.extendMap(t.kontokorrents,e.kontokorrents)}));case 8:t(e=>Object.assign(Object.assign({},e),{creating:!0,creationFailed:null}));break;case 7:t(t=>Object.assign(Object.assign({},t),{creating:!1,creationFailed:{exists:e.exists}}));break;case 21:t(t=>Object.assign(Object.assign({},t),{creating:!1,kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrent.id]:{id:e.kontokorrent.id,name:e.kontokorrent.name,synchronisieren:!1,personen:e.kontokorrent.personen.map(e=>Object.assign({balance:0},e)),bezahlungen:[]}})}));break;case 14:t(t=>Object.assign(Object.assign({},t),{activeKontokorrentId:e.id}));break;case 15:t(t=>Object.assign(Object.assign({},t),{kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrentId]:Object.assign(Object.assign({},t.kontokorrents[e.kontokorrentId]),{bezahlungen:e.bezahlungen})})}));break;case 16:t(t=>Object.assign(Object.assign({},t),{kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrentId]:Object.assign(Object.assign({},t.kontokorrents[e.kontokorrentId]),{synchronisieren:!0})})}));break;case 19:t(t=>Object.assign(Object.assign({},t),{kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrentId]:Object.assign(Object.assign({},t.kontokorrents[e.kontokorrentId]),{synchronisieren:!1})})}));break;case 17:t(t=>Object.assign(Object.assign({},t),{kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrentId]:Object.assign(Object.assign({},t.kontokorrents[e.kontokorrentId]),{personen:t.kontokorrents[e.kontokorrentId].personen.map(t=>Object.assign(Object.assign({},t),{balance:e.balance[t.id]}))})})}));break;case 18:t(e=>Object.assign(Object.assign({},e),{hinzufuegen:!1,hinzufuegenFailed:null}));break;case 4:t(e=>Object.assign(Object.assign({},e),{activeKontokorrentId:null,kontokorrents:{}}));break;case 6:t(t=>Object.assign(Object.assign({},t),{activeKontokorrentId:e.kontokorrentId}))}}extendMap(e,t){let n={};for(let r of t){let t=Object.assign(Object.assign(Object.assign(Object.assign({},r),{synchronisieren:!1,bezahlungen:[]}),e[r.id]),{personen:r.personen.map(t=>{var n,o;let i=null===(o=null===(n=e[r.id])||void 0===n?void 0:n.personen)||void 0===o?void 0:o.find(e=>e.id==t.id);return Object.assign(Object.assign(Object.assign({},t),{balance:0}),i)})});n[r.id]=t}return n}}n(12);var w=n(10),j=n.n(w);let O,I;const S=new WeakMap,C=new WeakMap,A=new WeakMap,z=new WeakMap,x=new WeakMap;let L={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return C.get(e);if("objectStoreNames"===t)return e.objectStoreNames||A.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return P(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function E(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(I||(I=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(R(this),t),P(S.get(this))}:function(...t){return P(e.apply(R(this),t))}:function(t,...n){const r=e.call(R(this),t,...n);return A.set(r,t.sort?t.sort():[t]),P(r)}}function K(e){return"function"==typeof e?E(e):(e instanceof IDBTransaction&&function(e){if(C.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",i),e.removeEventListener("abort",i)},o=()=>{t(),r()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",i),e.addEventListener("abort",i)});C.set(e,t)}(e),t=e,(O||(O=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,L):e);var t}function P(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",i)},o=()=>{t(P(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&S.set(t,e)}).catch(()=>{}),x.set(t,e),t}(e);if(z.has(e))return z.get(e);const t=K(e);return t!==e&&(z.set(e,t),x.set(t,e)),t}const R=e=>x.get(e);const B=["get","getKey","getAll","getAllKeys","count"],D=["put","add","delete","clear"],N=new Map;function T(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(N.get(t))return N.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=D.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!B.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,o?"readwrite":"readonly");let s=i.store;r&&(s=s.index(t.shift()));const a=await s[n](...t);return o&&await i.done,a};return N.set(t,i),i}L=(e=>({...e,get:(t,n,r)=>T(t,n)||e.get(t,n,r),has:(t,n)=>!!T(t,n)||e.has(t,n)}))(L);var _=n(7),F=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};class M{withInitialized(e){return F(this,void 0,void 0,(function*(){let t=yield function(e,t,{blocked:n,upgrade:r,blocking:o,terminated:i}={}){const s=indexedDB.open(e,t),a=P(s);return r&&s.addEventListener("upgradeneeded",e=>{r(P(s.result),e.oldVersion,e.newVersion,P(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),a.then(e=>{i&&e.addEventListener("close",()=>i()),o&&e.addEventListener("versionchange",()=>o())}).catch(()=>{}),a}("kontokorrent-db",3,{upgrade(e,t,n){if(t<1){e.createObjectStore("KontokorrentsStore",{keyPath:"id"}).createIndex("oeffentlicherName","oeffentlicherName")}if(t<2){e.createObjectStore("AppStateStore",{keyPath:"id"}).put({id:0,zuletztGesehenerKontokorrentId:null})}if(t<3){e.createObjectStore("AktionenStore",{keyPath:["laufendeNummer","kontokorrentId"]}).createIndex("kontokorrentId","kontokorrentId")}}});try{return yield e(t)}finally{t.close()}}))}getKontokorrents(){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(e=>F(this,void 0,void 0,(function*(){return Object(_.a)(yield e.getAll("KontokorrentsStore"),e=>e.name)})))}))}addAktionen(e,t){return F(this,void 0,void 0,(function*(){if(t.length)return yield this.withInitialized(n=>F(this,void 0,void 0,(function*(){const r=n.transaction("AktionenStore","readwrite");let o=t.map(t=>Object.assign(Object.assign({},t),{kontokorrentId:e})).map(e=>r.store.add(e));yield Promise.all(o),yield r.done})))}))}getZuletztGesehenerKontokorrentId(){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(e=>F(this,void 0,void 0,(function*(){let t=yield e.get("AppStateStore",0);if(t.zuletztGesehenerKontokorrentId)return t.zuletztGesehenerKontokorrentId;{let e=yield yield this.getKontokorrents();return e.length?e[0].id:null}})))}))}setZuletztGesehenerKontokorrentId(e){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(t=>F(this,void 0,void 0,(function*(){let n=yield t.get("AppStateStore",0);n.zuletztGesehenerKontokorrentId=e,yield t.put("AppStateStore",n)})))}))}setKontokorrents(e){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(t=>F(this,void 0,void 0,(function*(){let n=yield t.getAll("KontokorrentsStore");for(let r of n.filter(t=>!e.some(e=>t.id===e.id)))yield t.delete("KontokorrentsStore",r.id);let r=[];for(let o of e){let e=n.find(e=>e.id==o.id);e||r.push(o.id);let i=Object.assign(Object.assign({},e),{name:o.name,personen:o.personen,id:o.id,oeffentlicherName:o.oeffentlicherName});yield t.put("KontokorrentsStore",i)}return r})))}))}addKontokorrent(e){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(t=>F(this,void 0,void 0,(function*(){(yield t.get("KontokorrentsStore",e.id))||(yield t.add("KontokorrentsStore",e))})))}))}getKontokorrent(e){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(t=>F(this,void 0,void 0,(function*(){return yield t.get("KontokorrentsStore",e)})))}))}getPerOeffentlichName(e){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(t=>F(this,void 0,void 0,(function*(){return yield t.getFromIndex("KontokorrentsStore","oeffentlicherName",e)})))}))}getAktionen(e){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(t=>F(this,void 0,void 0,(function*(){return yield t.getAllFromIndex("AktionenStore","kontokorrentId",e)})))}))}clear(){return F(this,void 0,void 0,(function*(){return yield this.withInitialized(e=>F(this,void 0,void 0,(function*(){yield e.clear("AktionenStore"),yield e.clear("KontokorrentsStore"),yield e.put("AppStateStore",{id:0,zuletztGesehenerKontokorrentId:null})})))}))}}var H=n(1),U=n(5),$=n(6),q=n(8),W=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};class G{constructor(e,t,n,r,o){this.store=e,this.routingActionCreator=t,this.accountActionCreator=n,this.kontokorrentsActionCreator=r,this.router=o}initializeApplication(){return W(this,void 0,void 0,(function*(){if(!Object(U.a)().allPassed)return this.router.run(),void this.routingActionCreator.navigateFeaturesRequired();let e=this.accountActionCreator.initializeAccount();e||window.history.replaceState({},document.title,i.b.Login),this.router.run(),e&&(yield this.kontokorrentsActionCreator.syncKontokorrentListe())}))}}var J=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))};"serviceWorker"in navigator&&window.addEventListener("load",()=>J(void 0,void 0,void 0,(function*(){try{yield j.a.register()}catch(e){console.error("ServiceWorker registration failed: ",e)}}))),function(){return J(this,void 0,void 0,(function*(){const e=new s(()=>({account:{accountCreated:!1,accountCreating:!1,accountCreationFailed:!1,loginExpired:!1,accountInfo:null},kontokorrents:{hinzufuegen:!1,hinzufuegenFailed:null,creating:!1,creationFailed:null,kontokorrents:{},listeLaden:!1,activeKontokorrentId:null}})),t=new i.a(e),n=new r(t,new o),u=new M;e.addReducer("account",new y),e.addReducer("kontokorrents",new m);const d=new c,l=new k(d),h=new a(e,n,l,u,d);t.setServiceLocator(h),yield function(e){return e.get("InitializationActionCreator",e=>new G(e.store,Object(H.a)(e),Object($.a)(e),Object(q.a)(e),e.router))}(h).initializeApplication()}))}().catch(e=>console.error(e))}]);
//# sourceMappingURL=50ab907bac373bbba1d2.bundle.js.map