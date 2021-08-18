!function(){"use strict";var e,t,n,a,r,o={8167:function(e,t,n){n.d(t,{G:function(){return a}});class a{}},7677:function(e,t,n){n.d(t,{X:function(){return a}});class a{constructor(e){this.networkError=e}}},5134:function(e,t,n){var a=n(8402),r=n(6047);n(3948);class o extends class{constructor(e){this.subscriptions=[],this.reducerSubscriptions=[],this.state=e()}subscribe(e,t){let n={area:e,call:t};return this.subscriptions.push(n),()=>{this.subscriptions.splice(this.subscriptions.indexOf(n),1)}}addReducer(e,t){this.reducerSubscriptions.push({area:e,reducer:t})}dispatch(e){let t=[];for(let n of this.reducerSubscriptions){let a;a=n.area?e=>{this.state[n.area]=e(this.state[n.area]),t.push(n.area)}:e=>{this.state=e(this.state),t.push("")};try{n.reducer.onDispatch(e,a)}catch(t){console.error("Error while dispatching ".concat(e.type,"."),t)}}if(t.length)for(let n of this.subscriptions)if(!n.area||t.indexOf(n.area)>-1)try{n.call(this.state)}catch(t){console.error("Error while updating on ".concat(n.area||"global"," after ").concat(e.type,"."),t)}}}{}class i{constructor(e,t,n,a,r){this.store=e,this.router=t,this.apiClient=n,this.db=a,this.accountInfoStore=r,this.services={}}get(e,t){return this.services[e]||(this.services[e]=t(this)),this.services[e]}}class s{constructor(e){this.db=e}async set(e){await this.db.setAccountInfo(e)}async get(){return await this.db.getAccountInfo()}async clear(){await this.db.clearAccountInfo()}async getAccessToken(e){return await this.db.getAccessToken(e)}async updateAccessTokenIfNewer(e,t,n){return await this.db.updateAccessTokenIfNewer(e,t,n)}}async function c(e,t,n){let a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)};return n&&(a.headers=Object.assign(Object.assign({},a.headers),{Authorization:"Bearer ".concat(n)})),await fetch(e,a)}var u=n(4152),l=n(7677),d=n(8167);class h{}let g;g="https://kontokorrent.azurewebsites.net";const k="https://kontokorrent.azurewebsites.net";class f{}class b{}class w{}const p=k;class y{constructor(e){this.accountInfoStore=e}async neuerBenutzer(e,t){try{return(await c("".concat(p,"/api/v2/accounts"),{id:e,secret:t})).ok?{success:!0}:{success:!1}}catch(e){return{success:!1}}}async getUserInfo(){let e=await fetch("".concat(p,"/api/v2/userinfo"),{headers:await this.getAuthHeader()});return await e.json()}async getAuthHeader(){return{Authorization:"Bearer ".concat(await this.getAccessToken())}}async kontokorrentHinzufuegen(e,t){let n="";n=e?"oeffentlicherName=".concat(encodeURIComponent(e)):"einladungsCode=".concat(encodeURIComponent(t));let a=await this.getAuthHeader(),r=await fetch("".concat(p,"/api/v2/kontokorrents?").concat(n),{method:"PUT",headers:a});return 404==r.status?null:await r.json()}async kontokorrentsAuflisten(){let e=await fetch("".concat(p,"/api/v2/kontokorrents"),{headers:await this.getAuthHeader()});if(!e.ok)throw new h;return await e.json()}async neuerKontokorrent(e){let t=await c("".concat(p,"/api/v2/kontokorrents"),e,await this.getAccessToken());return 422==t.status?{success:!1,exists:!0}:t.ok?{success:!0}:{success:!1}}async getAktionen(e,t){let n=t?"?ab=".concat(t):"",a=await fetch("".concat(p,"/api/v2/kontokorrents/").concat(e,"/aktionen").concat(n),{headers:await this.getAuthHeader()});if(404==a.status)return{success:!1,notfound:!0};if(a.ok){let e=await a.json();return{success:!0,aktionen:this.mapAktionen(e)}}}mapAktionen(e){for(let t of e)t.bezahlung&&(t.bezahlung.zeitpunkt=new Date(t.bezahlung.zeitpunkt));return e}async neueBezahlung(e,t){let n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/vnd+kontokorrent.hinzufuegenaktion+json",Authorization:"Bearer ".concat(await this.getAccessToken())},body:JSON.stringify(t)},a=await fetch("".concat(p,"/api/v2/kontokorrents/").concat(e,"/aktionen"),n);if(a.ok){let e=await a.json();return this.mapAktionen([e])[0]}throw new f}async bezahlungLoeschen(e,t){let n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/vnd+kontokorrent.loeschenaktion+json",Authorization:"Bearer ".concat(await this.getAccessToken())},body:JSON.stringify({id:t})},a=await fetch("".concat(p,"/api/v2/kontokorrents/").concat(e,"/aktionen"),n);if(a.ok){let e=await a.json();return this.mapAktionen([e])[0]}throw new w}async bezahlungBearbeiten(e,t){let n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/vnd+kontokorrent.bearbeitenaktion+json",Authorization:"Bearer ".concat(await this.getAccessToken())},body:JSON.stringify(t)},a=await fetch("".concat(p,"/api/v2/kontokorrents/").concat(e,"/aktionen"),n);if(a.ok){let e=await a.json();return this.mapAktionen([e])[0]}throw new b}async getAccessToken(){let e=await this.accountInfoStore.get();if(null==e)throw new Error("Keine Account Information gespeichert.");if(e.type==u.Q.anonym){let t,n=await this.accountInfoStore.getAccessToken("anonymous");if(null!=n){let{token:e,expires:t}=JSON.parse(n.value);if(e&&t&&t>=+new Date)return e}try{let n=await c("".concat(p,"/api/v2/token"),{id:e.id,secret:e.secret});if(!n.ok)throw new l.X(!1);t=await n.json()}catch(e){throw new l.X(!0)}return await this.accountInfoStore.updateAccessTokenIfNewer("anonymous",JSON.stringify(t),null==n?void 0:n.timestamp),t.token}throw e.type==u.Q.google?new d.G:new Error("Account Typ ".concat(e.type," unbekannt"))}}class v{onDispatch(e,t){switch(e.type){case 0:t((e=>Object.assign(Object.assign({},e),{accountCreating:!0,accountCreationFailed:!1})));break;case 2:t((t=>Object.assign(Object.assign({},t),{accountCreating:!1,accountCreated:!0,accountInfo:e.info})));break;case 1:t((e=>Object.assign(Object.assign({},e),{accountCreationFailed:!0,accountCreating:!1,accountCreated:!1})));break;case 3:t((t=>Object.assign(Object.assign({},t),{accountCreated:!0,accountInfo:e.info})));break;case 4:t((e=>Object.assign(Object.assign({},e),{accountCreated:!1})));break;case 5:t((e=>Object.assign(Object.assign({},e),{loginExpired:!0})));break;case 13:e.interactionRequired&&t((e=>Object.assign(Object.assign({},e),{loginExpired:!0})))}}}var z=n(5075);class m{onDispatch(e,t){switch(e.type){case 11:t((e=>Object.assign(Object.assign({},e),{listeLaden:!0})));break;case 13:t((e=>Object.assign(Object.assign({},e),{listeLaden:!1})));break;case 12:t((t=>Object.assign(Object.assign({},t),{kontokorrents:this.extendMap(t.kontokorrents,e.kontokorrents)})));break;case 10:t((e=>Object.assign(Object.assign({},e),{hinzufuegen:!0})));break;case 9:t((t=>Object.assign(Object.assign({},t),{hinzufuegen:!1,hinzufuegenFailed:{kontokorrentNotFound:e.notFound}})));break;case 20:t((t=>Object.assign(Object.assign({},t),{hinzufuegen:!1,kontokorrents:this.extendMap(t.kontokorrents,e.kontokorrents)})));case 8:t((e=>Object.assign(Object.assign({},e),{creating:!0,creationFailed:null})));break;case 7:t((t=>Object.assign(Object.assign({},t),{creating:!1,creationFailed:{exists:e.exists}})));break;case 35:t((t=>Object.assign(Object.assign({},t),{nichtGefunden:{oeffentlicherName:e.oeffentlicherName}})));break;case 36:t((e=>Object.assign(Object.assign({},e),{nichtGefunden:null})));break;case 21:t((t=>Object.assign(Object.assign({},t),{creating:!1,kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrent.id]:{id:e.kontokorrent.id,name:e.kontokorrent.name,oeffentlicherName:e.kontokorrent.oeffentlicherName,synchronisieren:!1,personen:e.kontokorrent.personen.map((e=>Object.assign({balance:0},e))),bezahlungen:[],bezahlungAnlegen:null,angezeigteBezahlung:{}}})})));break;case 14:t((t=>Object.assign(Object.assign({},t),{activeKontokorrentId:e.id})));break;case 15:t((t=>Object.assign(Object.assign({},t),{kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrentId]:Object.assign(Object.assign({},t.kontokorrents[e.kontokorrentId]),{bezahlungen:e.bezahlungen})})})));break;case 16:t((t=>Object.assign(Object.assign({},t),{kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrentId]:Object.assign(Object.assign({},t.kontokorrents[e.kontokorrentId]),{synchronisieren:!0})})})));break;case 19:t((t=>Object.assign(Object.assign({},t),{kontokorrents:Object.assign(Object.assign({},t.kontokorrents),{[e.kontokorrentId]:Object.assign(Object.assign({},t.kontokorrents[e.kontokorrentId]),{synchronisieren:!1})})})));break;case 17:t((t=>this.extendPersonenInfo(t,e.kontokorrentId,Object.entries(e.balance).map((e=>({id:e[0],balance:e[1]}))))));break;case 18:t((e=>Object.assign(Object.assign({},e),{hinzufuegen:!1,hinzufuegenFailed:null,nichtGefunden:null})));break;case 37:t((e=>Object.assign(Object.assign({},e),{hinzufuegen:!1,hinzufuegenFailed:null,activeKontokorrentId:null,nichtGefunden:null})));break;case 4:t((e=>Object.assign(Object.assign({},e),{activeKontokorrentId:null,kontokorrents:{}})));break;case 6:t((t=>this.updateKontokorrentStatus(Object.assign(Object.assign({},t),{activeKontokorrentId:e.kontokorrentId}),e.kontokorrentId,{bezahlungAnlegen:null})));break;case 28:t((t=>(t=Object.assign(Object.assign({},t),{activeKontokorrentId:e.kontokorrentId}),t=this.updateAngezeigteBezahlung(t,e.kontokorrentId,e.bezahlungId,{bearbeitungsStatus:e.bearbeitungsStatus}),e.bezahlung&&(t=this.upsertBezahlung(t,e.kontokorrentId,e.bezahlung)),t)));break;case 22:t((t=>this.updateKontokorrentStatus(t,e.kontokorrentId,{bezahlungAnlegen:0})));break;case 24:t((t=>this.updateKontokorrentStatus(t,e.kontokorrentId,{bezahlungAnlegen:2})));break;case 23:t((t=>(t=this.updateKontokorrentStatus(t,e.kontokorrentId,{bezahlungAnlegen:1}),this.upsertBezahlung(t,e.kontokorrentId,e.bezahlung))));break;case 25:t((t=>this.upsertBezahlung(t,e.kontokorrentId,{status:z.Z.Speichern,id:e.bezahlungId})));break;case 26:t((t=>this.upsertBezahlung(t,e.kontokorrentId,{status:z.Z.Gespeichert,id:e.bezahlungId})));break;case 29:t((t=>this.updateAngezeigteBezahlung(t,e.kontokorrentId,e.bezahlungId,{updateStatus:0})));break;case 31:t((t=>this.updateAngezeigteBezahlung(t,e.kontokorrentId,e.bezahlungId,{updateStatus:2})));break;case 30:t((t=>(t=this.updateAngezeigteBezahlung(t,e.kontokorrentId,e.bearbeiteteBezahlungId,{updateStatus:1}),t=this.removeBezahlung(t,e.kontokorrentId,e.bearbeiteteBezahlungId),this.upsertBezahlung(t,e.kontokorrentId,e.bezahlung))));break;case 32:t((t=>this.updateAngezeigteBezahlung(t,e.kontokorrentId,e.bezahlungId,{deleteStatus:0})));break;case 34:t((t=>this.updateAngezeigteBezahlung(t,e.kontokorrentId,e.bezahlungId,{deleteStatus:2})));break;case 33:t((t=>(t=this.updateAngezeigteBezahlung(t,e.kontokorrentId,e.geloeschteBezahlungId,{deleteStatus:1}),this.removeBezahlung(t,e.kontokorrentId,e.geloeschteBezahlungId))))}}updateKontokorrentStatus(e,t,n){return this.updateKontokorrentStatusFn(e,t,(e=>Object.assign(Object.assign({},e),n)))}updateKontokorrentStatusFn(e,t,n){return Object.assign(Object.assign({},e),{kontokorrents:Object.assign(Object.assign({},e.kontokorrents),{[t]:n(e.kontokorrents[t])})})}updateAngezeigteBezahlung(e,t,n,a){return this.updateKontokorrentStatusFn(e,t,(e=>Object.assign(Object.assign({},e),{angezeigteBezahlung:Object.assign(Object.assign({},e.angezeigteBezahlung),{[n]:Object.assign(Object.assign({},(e.angezeigteBezahlung||{})[n]),a)})})))}upsertBezahlung(e,t,n){var a;let r=(null===(a=e.kontokorrents[t])||void 0===a?void 0:a.bezahlungen)||[],o=r.find((e=>n.id==e.id));return o&&r.splice(r.indexOf(o),1),r.push(Object.assign(Object.assign({},o),n)),Object.assign(Object.assign({},e),{kontokorrents:Object.assign(Object.assign({},e.kontokorrents),{[t]:Object.assign(Object.assign({},e.kontokorrents[t]),{bezahlungen:r})})})}removeBezahlung(e,t,n){var a;let r=(null===(a=e.kontokorrents[t])||void 0===a?void 0:a.bezahlungen)||[],o=r.find((e=>n==e.id));return r.splice(r.indexOf(o),1),Object.assign(Object.assign({},e),{kontokorrents:Object.assign(Object.assign({},e.kontokorrents),{[t]:Object.assign(Object.assign({},e.kontokorrents[t]),{bezahlungen:r})})})}extendPersonenInfo(e,t,n){var a;let r=new Map(((null===(a=e.kontokorrents[t])||void 0===a?void 0:a.personen)||[]).map((e=>[e.id,e])));for(let e of n)r.set(e.id,Object.assign(Object.assign({},r.get(e.id)),e));return Object.assign(Object.assign({},e),{kontokorrents:Object.assign(Object.assign({},e.kontokorrents),{[t]:Object.assign(Object.assign({},e.kontokorrents[t]),{personen:Array.from(r.values())})})})}extendMap(e,t){let n={};for(let a of t){let t=Object.assign(Object.assign(Object.assign(Object.assign({},a),{synchronisieren:!1,bezahlungen:[],angezeigteBezahlung:{}}),e[a.id]),{personen:a.personen.map((t=>{var n,r;let o=null===(r=null===(n=e[a.id])||void 0===n?void 0:n.personen)||void 0===r?void 0:r.find((e=>e.id==t.id));return Object.assign(Object.assign(Object.assign({},t),{balance:0}),o)}))});n[a.id]=t}return n}}var O=n(9820),j=n(1173);const I="KontokorrentsStore",A="AppStateStore",S="AktionenStore",C="NeueBezahlungenStore";class B{async withInitialized(e){let t=await(0,O.X3)("kontokorrent-db",5,{upgrade(e,t,n){t<1&&e.createObjectStore(I,{keyPath:"id"}).createIndex("oeffentlicherName","oeffentlicherName"),t<2&&e.createObjectStore(A,{keyPath:"id"}).put({id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null}),t<3&&e.createObjectStore(S,{keyPath:["laufendeNummer","kontokorrentId"]}).createIndex("kontokorrentId","kontokorrentId"),t<5&&(e.objectStoreNames.contains(C)&&e.deleteObjectStore(C),e.createObjectStore(C,{keyPath:"id"}).createIndex("kontokorrentId","kontokorrentId"))}});try{return await e(t)}finally{t.close()}}async getKontokorrents(){return await this.withInitialized((async e=>(0,j.T)(await e.getAll(I),(e=>e.name))))}async addAktionen(e,t){if(!t.length)return;let n=t.map((t=>Object.assign(Object.assign({},t),{kontokorrentId:e})));return await this.withInitialized((t=>{const a=(0,O.Wg)(t);return new Promise(((t,r)=>{const o=a.transaction(S,"readwrite");o.onerror=e=>{console.error("addAktionen failed",e,o.error),r(o.error)},o.oncomplete=()=>{t()};for(let t of n){let n=o.objectStore(S).add(t);n.onerror=a=>{"ConstraintError"==n.error.name?(console.log("Aktion ".concat(t.laufendeNummer," für Kontokorrent ").concat(e," bereits gespeichert."),a,n.error),a.preventDefault(),a.stopPropagation()):console.error("Aktion ".concat(t.laufendeNummer," für Kontokorrent ").concat(e," konnte nicht gespeichert werden."),a,n.error)}}}))}))}async getZuletztGesehenerKontokorrentId(){return await this.withInitialized((async e=>{let t=await e.get(A,0);if(t.zuletztGesehenerKontokorrentId)return t.zuletztGesehenerKontokorrentId;{let e=await await this.getKontokorrents();return e.length?e[0].id:null}}))}async setZuletztGesehenerKontokorrentId(e){return await this.withInitialized((async t=>{let n=await t.get(A,0);n.zuletztGesehenerKontokorrentId=e,await t.put(A,n)}))}async setKontokorrents(e){return await this.withInitialized((async t=>{let n=await t.getAll(I);for(let a of n.filter((t=>!e.some((e=>t.id===e.id)))))await t.delete(I,a.id);let a=[];for(let r of e){let e=n.find((e=>e.id==r.id));e||a.push(r.id);let o=Object.assign(Object.assign({},e),{name:r.name,personen:r.personen,id:r.id,oeffentlicherName:r.oeffentlicherName});await t.put(I,o)}return a}))}async addKontokorrent(e){return await this.withInitialized((async t=>{await t.get(I,e.id)||await t.add(I,e)}))}async getKontokorrent(e){return await this.withInitialized((async t=>await t.get(I,e)))}async getPerOeffentlichName(e){return await this.withInitialized((async t=>await t.getFromIndex(I,"oeffentlicherName",e)))}async getAktionen(e){return await this.withInitialized((async t=>await t.getAllFromIndex(S,"kontokorrentId",e)))}async clear(){return await this.withInitialized((async e=>{await e.clear(S),await e.clear(I),await e.put(A,{id:0,zuletztGesehenerKontokorrentId:null,accesstokens:[],accountinfo:null})}))}async getAccessToken(e){return await this.withInitialized((async t=>((await t.get(A,0)).accesstokens||[]).find((t=>t.type===e))))}async updateAccessTokenIfNewer(e,t,n){return await this.withInitialized((async a=>{const r=a.transaction(A,"readwrite",{durability:"strict"});let o=await r.store.get(0);o.accesstokens||(o.accesstokens=[]);let i=o.accesstokens.find((t=>t.type===e));if(i){if(i.timestamp!=n)return console.error("The accesstoken of type ".concat(e," was already updated since reading.")),await r.done,!1;i.value=t,i.timestamp++}else o.accesstokens.push({timestamp:1,type:e,value:t});return await r.store.put(o),await r.done,!0}))}async setAccountInfo(e){return await this.withInitialized((async t=>{const n=t.transaction(A,"readwrite");let a=await n.store.get(0);a.accountinfo=e,await n.store.put(a),await n.done}))}async getAccountInfo(){return await this.withInitialized((async e=>{const t=e.transaction(A,"readonly");let n=await t.store.get(0);return null==n?void 0:n.accountinfo}))}async clearAccountInfo(){return await this.withInitialized((async e=>{const t=e.transaction(A,"readwrite");let n=await t.store.get(0);n.accountinfo=null,n.accesstokens=[],await t.store.put(n),await t.done}))}async getZwischengespeicherteBezahlungen(){return await this.withInitialized((async e=>await e.getAll(C)))}async getBezahlungAktion(e,t){return await this.withInitialized((async n=>{var a=n.getAllFromIndex(S,"kontokorrentId",e);return(await a).find((e=>e.bezahlung&&e.bezahlung.id==t))}))}async getBearbeitungsStatus(e,t){return await this.withInitialized((async n=>{let a=await n.getAllFromIndex(S,"kontokorrentId",e),r=a.find((e=>e.bezahlung&&e.bezahlung.id==t));return r?null!=a.find((e=>e.bearbeiteteBezahlungId==t))?{aktion:r,status:2}:null!=a.find((e=>e.geloeschteBezahlungId==t))?{aktion:r,status:3}:{aktion:r,status:4}:(await n.getAllFromIndex(C,"kontokorrentId",e)).find((e=>e.id==t))?{aktion:null,status:1}:{aktion:null,status:0}}))}async getZwischengespeicherteBezahlungenForKontokorrent(e){return await this.withInitialized((async t=>await t.getAllFromIndex(C,"kontokorrentId",e)))}async bezahlungZwischenspeichern(e){return await this.withInitialized((async t=>{t.add(C,e)}))}async zwischengespeicherteBezahlungErledigt(e){await this.withInitialized((async t=>{t.delete(C,e)}))}}var K=n(9773),N=n(6580),P=n(2887),L=n(1550),T=n(8843);class x{constructor(e,t,n,a,r,o){this.store=e,this.db=t,this.routingActionCreator=n,this.accountActionCreator=a,this.kontokorrentsActionCreator=r,this.router=o}async initializeApplication(){if(!(await(0,N.l)()).allPassed)return this.router.run(),void this.routingActionCreator.navigateFeaturesRequired();let e=await this.accountActionCreator.initializeAccount();this.router.run(),e&&(await this.kontokorrentsActionCreator.syncKontokorrentListe(),"requestIdleCallback"in window?window.requestIdleCallback((()=>{this.zwischengespeicherteSynchronisieren()})):this.zwischengespeicherteSynchronisieren())}async zwischengespeicherteSynchronisierenAsync(){if("serviceWorker"in navigator&&"SyncManager"in window){let e=await navigator.serviceWorker.ready;(await this.db.getZwischengespeicherteBezahlungen()).length&&(await e.sync.register(T.D),console.log("background sync scheduled"))}}zwischengespeicherteSynchronisieren(){this.zwischengespeicherteSynchronisierenAsync().catch((e=>console.error(e)))}}class E{onDispatch(e,t){switch(e.type){case 27:t((t=>Object.assign(Object.assign({},t),{kontokorrentId:e.kontokorrentId,vorschlaege:e.vorschlaege})))}}}"serviceWorker"in navigator&&window.addEventListener("load",(async()=>{navigator.serviceWorker.register("./sw.js").then((e=>{})).catch((e=>{console.log("SW registration failed: ",e)}))})),async function(){const e=new o((()=>({account:{accountCreated:!1,accountCreating:!1,accountCreationFailed:!1,loginExpired:!1,accountInfo:null},kontokorrents:{hinzufuegen:!1,hinzufuegenFailed:null,creating:!1,creationFailed:null,kontokorrents:{},listeLaden:!1,activeKontokorrentId:null,nichtGefunden:null},beschreibungVorschlaege:{vorschlaege:[],kontokorrentId:null}})));"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",(t=>{var n;if("statedispatch"==(null===(n=t.data)||void 0===n?void 0:n.type)){let n=t.data.msg;e.dispatch(n)}}));const t=new r.WD(e),n=new a.F0(t,new a.ne),c=new B;e.addReducer("account",new v),e.addReducer("kontokorrents",new m),e.addReducer("beschreibungVorschlaege",new E);const u=new s(c),l=new y(u),d=new i(e,n,l,c,u);t.setServiceLocator(d),await function(e){return e.get("InitializationActionCreator",(e=>new x(e.store,e.db,(0,K.b)(e),(0,P.gg)(e),(0,L.d8)(e),e.router)))}(d).initializeApplication()}().catch((e=>console.error(e)))},4152:function(e,t,n){var a;n.d(t,{Q:function(){return a}}),function(e){e.google="google",e.anonym="anonym"}(a||(a={}))},6580:function(e,t,n){n.d(t,{l:function(){return r}});var a=n(886);function r(){return new Promise(((e,t)=>{if("indexedDB"in window){const t=(0,a.Z)();let n=window.indexedDB.open(t,1);n.onsuccess=()=>{e({allPassed:!0}),n.result.close(),window.indexedDB.deleteDatabase(t)},n.onerror=()=>{e({allPassed:!1})}}else e({allPassed:!1})}))}},6047:function(e,t,n){n.d(t,{WD:function(){return u},Cc:function(){return i},nB:function(){return s}}),n(3948),n(285);var a=n(9773),r=n(6580);class o extends HTMLElement{constructor(){super()}addServices(e){this.routingActionCreator=(0,a.b)(e)}connectedCallback(){this.innerHTML="<h1>Speicherzugriff benötigt</h1> Kontokorrent speichert die Zahlungen und weitere Informationen im lokalen Speicher dieses Geräts. Auf diese Weise kann man für einige Tage eingeloggt bleiben, und die Anwendung auch verwenden, wenn die Internetverbindung schlecht ist. In den meisten Browsern (Chrome, Edge) muss dazu der Webseite erlaubt werden <strong>Cookies</strong> zu speichern. Nachdem die Berechtigung erteilt wurde die Webseite neu laden.",(0,r.l)().then((e=>{e.allPassed&&this.routingActionCreator.navigateHomeWithPageRefresh()}))}disconnectedCallback(){}}customElements.define("app-features-required",o);const i="oeffentlicherName";var s;function c(e){let t=/^kontokorrents\/o\/([a-zA-Z0-9\-]+)$/.exec(e);return t?{oeffentlicherName:t[1]}:null}!function(e){e.Login="login",e.Info="info",e.Home="",e.FeaturesRequired="features-required",e.CreateEvent="create-event",e.BezahlungEintragen="eintragen",e.MultiBezahlungEintragen="multi-eintragen",e.DatabaseDebug="database-debug",e.NichtGefunden="nicht-gefunden"}(s||(s={}));class u{constructor(e){this.store=e}setServiceLocator(e){this.serviceLocator=e}async getKontokorrentPageComponent(){const{KontokorrentPage:e}=await Promise.all([n.e(54),n.e(661)]).then(n.bind(n,7156));let t=new e;return t.addServices(this.serviceLocator),t}async resolve(e,t,a){switch(t){case s.Info:const{Info:e}=await n.e(416).then(n.bind(n,416));let t=new e;return t.addServices(this.serviceLocator),t;case s.FeaturesRequired:{let e=new o;return e.addServices(this.serviceLocator),e}case s.Login:{const{Login:e}=await n.e(502).then(n.bind(n,4502));let t=new e;return t.addServices(this.serviceLocator),t}case s.CreateEvent:{const{CreateKontokorrent:e}=await n.e(215).then(n.bind(n,6215));let t=new e;return t.addServices(this.serviceLocator),t}}if(!this.store.state.account.accountCreated){let e=c(t);if(e){let t=new URLSearchParams;t.set(i,e.oeffentlicherName),a.navigate("".concat(s.Login,"?").concat(t),null,!0)}else a.navigate("".concat(s.Login),null,!0);return!1}switch(t){case s.BezahlungEintragen:{const{BezahlungEintragenPage:e}=await Promise.all([n.e(54),n.e(13),n.e(182)]).then(n.bind(n,1363));let t=new e;return t.addServices(this.serviceLocator),t}case s.MultiBezahlungEintragen:{const{MultiBezahlungEintragenPage:e}=await Promise.all([n.e(614),n.e(54),n.e(13),n.e(468)]).then(n.bind(n,1468));let t=new e;return t.addServices(this.serviceLocator),t}case s.DatabaseDebug:{const{DatabaseDebug:e}=await n.e(57).then(n.bind(n,8057));let t=new e;return t.addServices(this.serviceLocator),t}}if(t.startsWith(s.NichtGefunden)){const{KontokorrentNichtGefunden:e}=await n.e(824).then(n.bind(n,2824));let t=new e;return t.addServices(this.serviceLocator),t}let r=c(t);if(r){let e=await this.getKontokorrentPageComponent();return e.setRouteParameters(r.oeffentlicherName),e}let u=/^kontokorrents\/o\/([a-zA-Z0-9\-]+)\/bezahlungen\/([a-zA-Z0-9\-]+)$/.exec(t);if(u){let e=u[1],t=u[2];const{BezahlungPage:a}=await Promise.all([n.e(54),n.e(13),n.e(895)]).then(n.bind(n,3811));let r=new a;return r.addServices(this.serviceLocator),r.setRouteParameters(e,t),r}let l=await this.getKontokorrentPageComponent();return l.addServices(this.serviceLocator),l}}},5075:function(e,t,n){var a;n.d(t,{Z:function(){return a}}),function(e){e.Zwischengespeichert="zwischengespeichert",e.Speichern="speichern",e.Gespeichert="gespeichert"}(a||(a={}))},2887:function(e,t,n){n.d(t,{gg:function(){return f}});var a=n(886),r=n(4152),o=n(9773),i=n(7677),s=n(8167);class c{constructor(){this.type=0}}class u{constructor(){this.type=1}}class l{constructor(e){this.info=e,this.type=2}}class d{constructor(e){this.info=e,this.type=3}}class h{constructor(){this.type=4}}class g{constructor(){this.type=5}}class k{constructor(e,t,n,a,r){this.store=e,this.apiClient=t,this.accountInfoStore=n,this.routingActionCreator=a,this.db=r}async initializeAccount(){let e=await this.accountInfoStore.get();return!!e&&(this.store.dispatch(new d(e)),this.getUserInfo(),!0)}async getUserInfo(){try{await this.apiClient.getUserInfo()}catch(e){if(e instanceof i.X){let t=await this.accountInfoStore.get();e.networkError||t.type!=r.Q.anonym||(await this.accountInfoStore.clear(),window.location.reload())}else e instanceof s.G&&this.store.dispatch(new g)}}async ensureAccount(){if(!this.store.state.account.accountCreated){let e={id:(0,a.Z)(),secret:(0,a.Z)(),type:r.Q.anonym};this.store.dispatch(new c);let t=await this.apiClient.neuerBenutzer(e.id,e.secret);return t.success?(this.store.dispatch(new l(e)),await this.accountInfoStore.set(e)):this.store.dispatch(new u),t.success}return!0}async logout(){await this.accountInfoStore.clear(),await this.db.clear(),this.store.dispatch(new h),this.routingActionCreator.navigateLogin()}}function f(e){return e.get("AccountActionCreator",(e=>new k(e.store,e.apiClient,e.accountInfoStore,(0,o.b)(e),e.db)))}},1550:function(e,t,n){n.d(t,{d8:function(){return u}});var a=n(8167),r=n(9773);class o{constructor(){this.type=11}}class i{constructor(e){this.kontokorrents=e,this.type=12}}class s{constructor(e){this.interactionRequired=e,this.type=13}}class c{constructor(e,t,n,a){this.store=e,this.apiClient=t,this.routingActionCreator=n,this.db=a}async navigiereZuLetztGesehenem(e){let t=await this.db.getZuletztGesehenerKontokorrentId();return!!t&&(await this.routingActionCreator.navigateKontokorrentById(t,e),!0)}async syncKontokorrentListe(){this.store.dispatch(new o);const e=this.apiClient.kontokorrentsAuflisten();let t=await this.db.getKontokorrents();this.store.dispatch(new i(t));try{let t=await e;await this.db.setKontokorrents(t.map((e=>({id:e.id,name:e.name,personen:e.personen,oeffentlicherName:e.oeffentlicherName})))),this.store.dispatch(new i(t))}catch(e){e instanceof a.G?this.store.dispatch(new s(!0)):this.store.dispatch(new s(!1))}}}function u(e){return e.get("KontokorrentListenActionCreator",(e=>new c(e.store,e.apiClient,(0,r.b)(e),e.db)))}},9773:function(e,t,n){n.d(t,{b:function(){return o}}),n(3948),n(285);var a=n(6047);class r{constructor(e,t,n){this.router=e,this.db=t,this.store=n}navigateHomeWithPageRefresh(){this.router.destroy(),window.location.href=""}navigateHome(){this.router.navigate(a.nB.Home,null)}navigateLogin(e){this.router.navigate(a.nB.Login,null,e)}navigateNichtGefunden(e){let t=new URLSearchParams;t.set(a.Cc,e),this.router.navigate("".concat(a.nB.NichtGefunden,"?").concat(t),null,!0)}navigateFeaturesRequired(){this.router.navigate(a.nB.FeaturesRequired,null)}navigate(e){this.router.navigate(e,null)}async navigateKontokorrentById(e,t){let n=await this.db.getKontokorrent(e);if(!n.oeffentlicherName)throw new Error("Cannot navigate to private Kontokorrent: not yet implemented");this.navigateKontokorrentByOeffentlicherName(n.oeffentlicherName,t)}navigateKontokorrentByOeffentlicherName(e,t){this.router.navigate("kontokorrents/o/".concat(e),null,t)}navigateBezahlung(e,t,n){let a=this.store.state.kontokorrents.kontokorrents[e];if(!a.oeffentlicherName)throw new Error("Cannot navigate to private Kontokorrent Bezahlung: not yet implemented");this.router.navigate("kontokorrents/o/".concat(a.oeffentlicherName,"/bezahlungen/").concat(t),null,n)}}function o(e){return e.get("RoutingActionCreator",(e=>new r(e.router,e.db,e.store)))}},8843:function(e,t,n){n.d(t,{D:function(){return a}});const a="NeueBezahlungBackgroundSync"},1173:function(e,t,n){function a(e,t){return e.sort(((e,n)=>t(e).toLowerCase().localeCompare(t(n).toLowerCase())))}n.d(t,{T:function(){return a}})}},i={};function s(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return o[e](n,n.exports,s),n.exports}s.m=o,e=[],s.O=function(t,n,a,r){if(!n){var o=1/0;for(l=0;l<e.length;l++){n=e[l][0],a=e[l][1],r=e[l][2];for(var i=!0,c=0;c<n.length;c++)(!1&r||o>=r)&&Object.keys(s.O).every((function(e){return s.O[e](n[c])}))?n.splice(c--,1):(i=!1,r<o&&(o=r));if(i){e.splice(l--,1);var u=a();void 0!==u&&(t=u)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[n,a,r]},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,{a:t}),t},s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce((function(t,n){return s.f[n](e,t),t}),[]))},s.u=function(e){return{13:"19c9664bef555e5b6138",54:"cf5712b98a50d1d3fbb8",57:"2dc701d406b87acee6b4",182:"0c4edc1ea2067129055a",215:"56b6d67a91cf776c0030",416:"75d21f0545dbbeb8e3c4",468:"e21c5ee30208b4d4a155",502:"b59c1bac13bdbe63501f",614:"90f2b8f81a2928058ab0",661:"83a076c7e7d25f8d1578",824:"1891f32e4bbd3fc3ba07",837:"b345959bd3e9e8a49efe",895:"c880cc610f5302c03b90"}[e]+".bundle.js"},s.miniCssF=function(e){return e+"."+{13:"91ca07c1fe90c6d293cf",57:"8c5b220bf6f482881a90",182:"d70aaf4b5d89faa0ee53",215:"5e1edc0e4550a012e059",468:"321291a696fc4746510f",502:"4709c77ec960168c1305",661:"f0cc8aea11f79289b8b2",824:"5e11db13ecbcbfd8bc78",895:"95962bf75be5741efd53"}[e]+".css"},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t={},n="kontokorrent:",s.l=function(e,a,r,o){if(t[e])t[e].push(a);else{var i,c;if(void 0!==r)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==n+r){i=d;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,s.nc&&i.setAttribute("nonce",s.nc),i.setAttribute("data-webpack",n+r),i.src=e),t[e]=[a];var h=function(n,a){i.onerror=i.onload=null,clearTimeout(g);var r=t[e];if(delete t[e],i.parentNode&&i.parentNode.removeChild(i),r&&r.forEach((function(e){return e(a)})),n)return n(a)},g=setTimeout(h.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=h.bind(null,i.onerror),i.onload=h.bind(null,i.onload),c&&document.head.appendChild(i)}},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p="/v2/",a=function(e){return new Promise((function(t,n){var a=s.miniCssF(e),r=s.p+a;if(function(e,t){for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var r=(i=n[a]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(r===e||r===t))return i}var o=document.getElementsByTagName("style");for(a=0;a<o.length;a++){var i;if((r=(i=o[a]).getAttribute("data-href"))===e||r===t)return i}}(a,r))return t();!function(e,t,n,a){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.onerror=r.onload=function(o){if(r.onerror=r.onload=null,"load"===o.type)n();else{var i=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=s,r.parentNode.removeChild(r),a(c)}},r.href=t,document.head.appendChild(r)}(e,r,t,n)}))},r={826:0},s.f.miniCss=function(e,t){r[e]?t.push(r[e]):0!==r[e]&&{13:1,57:1,182:1,215:1,468:1,502:1,661:1,824:1,895:1}[e]&&t.push(r[e]=a(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))},function(){s.b=document.baseURI||self.location.href;var e={826:0};s.f.j=function(t,n){var a=s.o(e,t)?e[t]:void 0;if(0!==a)if(a)n.push(a[2]);else{var r=new Promise((function(n,r){a=e[t]=[n,r]}));n.push(a[2]=r);var o=s.p+s.u(t),i=new Error;s.l(o,(function(n){if(s.o(e,t)&&(0!==(a=e[t])&&(e[t]=void 0),a)){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",i.name="ChunkLoadError",i.type=r,i.request=o,a[1](i)}}),"chunk-"+t,t)}},s.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,r,o=n[0],i=n[1],c=n[2],u=0;for(a in i)s.o(i,a)&&(s.m[a]=i[a]);if(c)var l=c(s);for(t&&t(n);u<o.length;u++)r=o[u],s.o(e,r)&&e[r]&&e[r][0](),e[o[u]]=0;return s.O(l)},n=self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var c=s.O(void 0,[820,119],(function(){return s(5134)}));c=s.O(c)}();
//# sourceMappingURL=c7b8b132225a2f2647ea.bundle.js.map