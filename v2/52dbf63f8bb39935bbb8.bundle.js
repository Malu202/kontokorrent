(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[581],{1107:function(e,t,n){"use strict";n.d(t,{Ud:function(){return u}});const s=Symbol("Comlink.proxy"),r=Symbol("Comlink.endpoint"),a=Symbol("Comlink.releaseProxy"),i=Symbol("Comlink.thrown"),o=e=>"object"==typeof e&&null!==e||"function"==typeof e,l=new Map([["proxy",{canHandle:e=>o(e)&&e[s],serialize(e){const{port1:t,port2:n}=new MessageChannel;return c(e,t),[n,[n]]},deserialize:e=>(e.start(),u(e))}],["throw",{canHandle:e=>o(e)&&i in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function c(e,t=self){t.addEventListener("message",(function n(r){if(!r||!r.data)return;const{id:a,type:o,path:l}=Object.assign({path:[]},r.data),u=(r.data.argumentList||[]).map(m);let d;try{const t=l.slice(0,-1).reduce(((e,t)=>e[t]),e),n=l.reduce(((e,t)=>e[t]),e);switch(o){case 0:d=n;break;case 1:t[l.slice(-1)[0]]=m(r.data.value),d=!0;break;case 2:d=n.apply(t,u);break;case 3:d=function(e){return Object.assign(e,{[s]:!0})}(new n(...u));break;case 4:{const{port1:t,port2:n}=new MessageChannel;c(e,n),d=function(e,t){return b.set(e,t),e}(t,[t])}break;case 5:d=void 0}}catch(e){d={value:e,[i]:0}}Promise.resolve(d).catch((e=>({value:e,[i]:0}))).then((e=>{const[s,r]=g(e);t.postMessage(Object.assign(Object.assign({},s),{id:a}),r),5===o&&(t.removeEventListener("message",n),h(t))}))})),t.start&&t.start()}function h(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function u(e,t){return p(e,[],t)}function d(e){if(e)throw new Error("Proxy has been released and is not useable")}function p(e,t=[],n=function(){}){let s=!1;const i=new Proxy(n,{get(n,r){if(d(s),r===a)return()=>f(e,{type:5,path:t.map((e=>e.toString()))}).then((()=>{h(e),s=!0}));if("then"===r){if(0===t.length)return{then:()=>i};const n=f(e,{type:0,path:t.map((e=>e.toString()))}).then(m);return n.then.bind(n)}return p(e,[...t,r])},set(n,r,a){d(s);const[i,o]=g(a);return f(e,{type:1,path:[...t,r].map((e=>e.toString())),value:i},o).then(m)},apply(n,a,i){d(s);const o=t[t.length-1];if(o===r)return f(e,{type:4}).then(m);if("bind"===o)return p(e,t.slice(0,-1));const[l,c]=k(i);return f(e,{type:2,path:t.map((e=>e.toString())),argumentList:l},c).then(m)},construct(n,r){d(s);const[a,i]=k(r);return f(e,{type:3,path:t.map((e=>e.toString())),argumentList:a},i).then(m)}});return i}function k(e){const t=e.map(g);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const b=new WeakMap;function g(e){for(const[t,n]of l)if(n.canHandle(e)){const[s,r]=n.serialize(e);return[{type:3,name:t,value:s},r]}return[{type:0,value:e},b.get(e)||[]]}function m(e){switch(e.type){case 3:return l.get(e.name).deserialize(e.value);case 0:return e.value}}function f(e,t,n){return new Promise((s=>{const r=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===r&&(e.removeEventListener("message",t),s(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:r},t),n)}))}},3682:function(e,t,n){"use strict";function s(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}n.d(t,{Z:function(){return s}})},394:function(e,t,n){"use strict";function s(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}n.d(t,{Z:function(){return s}})},9429:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var s=n(4327),r=n(3682);function a(e){(0,r.Z)(1,arguments);var t=(0,s.Z)(e);return t.setHours(0,0,0,0),t}},4327:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var s=n(3682);function r(e){(0,s.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}},426:function(e,t,n){"use strict";n.d(t,{W:function(){return S}});var s=n(5097),r=n.n(s),a=n(9773),i=n(2204),o=n(5777),l=n.n(o),c=n(5088),h=n.n(c),u=n(1173),d=n(6029),p=n(2255),k=n.n(p);class b extends HTMLElement{constructor(){super(),this.innerHTML=k(),this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.clickEvent=this.clickEvent.bind(this)}connectedCallback(){this.link.addEventListener("click",this.clickEvent)}clickEvent(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(e,t){this.kontokorrent=e,this.name.innerText=e.name,this.link.href=`kontokorrents/${e.id}`,this.link.classList.toggle("kontokorrent-select-list__entry--active",t)}}customElements.define("kontokorrent-select-list-entry",b);class g extends HTMLElement{constructor(){super(),this.innerHTML=h(),this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new d.T(this.list,(e=>e.id),(()=>{let e=document.createElement("li");return e.appendChild(new b),e}))}connectedCallback(){}disconnectedCallback(){}update(){this.kontokorrentsRenderer.update(this._kontokorrents,((e,t)=>{e.firstChild.update(t,this._activeKontokorrentId==t.id)}))}set kontokorrents(e){this._kontokorrents=(0,u.T)(e,(e=>e.name)),this.update()}set activeKontokorrentId(e){this._activeKontokorrentId=e,this.update()}}const m="kontokorrent-select-list";customElements.define(m,g),n(4227);class f extends HTMLElement{constructor(){super(),this.innerHTML=l(),this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector(m),this.addButton=this.querySelector("#add-kontokorrent"),this._kontokorrents=null}connectedCallback(){this.popup=this.querySelector("app-popup"),this.updateAttributes(),this.addEventListener("click",(e=>{this.popup.contains(event.target)||(this.popup.toggle(),e.stopPropagation())})),this.addButton.addEventListener("click",(e=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))})),this.kontokorrentSelectList.addEventListener("gotokontokorrent",(()=>{this.popup.hide()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(e){this.kontokorrentSelectList.kontokorrents=e,this._kontokorrents=e,this.updatesStyle()}updatesStyle(){if(this._kontokorrents&&this._kontokorrents.length){let e=this._kontokorrents.find((e=>e.id==this.activeKontokorrentId));this.kontokorrentName.innerText=e?e.name:"(Kontokorrent wählen)"}}}const v="kontokorrent-select";customElements.define(v,f);var y=n(2887);class w extends HTMLElement{constructor(){super(),this.innerHTML=r(),this.kontokorrentSelect=this.querySelector(v),this.logoutDialog=this.querySelector("#logout-dialog")}connectedCallback(){this.querySelector("#logout-button").addEventListener("click",(e=>{this.logoutDialog.toggle(),e.stopPropagation()})),this.querySelector("#confirm-logout").addEventListener("click",(async()=>{await this.accountActionCreator.logout()})),this.querySelector("#abort-logout").addEventListener("click",(()=>{this.logoutDialog.hide()})),(0,i.G)(this.querySelectorAll("a"),this.routingActionCreator),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.applyStoreState(this.store.state),this.kontokorrentSelect.addEventListener("addkontokorrent",(()=>{this.routingActionCreator.navigateLogin()}))}applyStoreState(e){this.kontokorrentSelect.kontokorrents=Object.values(e.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",e.kontokorrents.activeKontokorrentId)}addServices(e){this.store=e.store,this.routingActionCreator=(0,a.b)(e),this.accountActionCreator=(0,y.gg)(e)}disconnectedCallback(){this.subscription()}}const S="app-bar";customElements.define(S,w)},5572:function(e,t,n){"use strict";n.r(t),n.d(t,{KontokorrentPage:function(){return X}});var s=n(2477),r=n.n(s),a=n(9773),i=n(2204),o=n(426),l=n(4911),c=n.n(l),h=n(2033),u=n(5022);const d="person-name",p="balance",k="balance-range",b=new u.a(c());class g extends HTMLElement{constructor(){super(),this.appendChild(b.get()),this.personNameElement=this.querySelector('[data-ref="person-name"]'),this.balanceTextElement=this.querySelector('[data-ref="balance-text"]'),this.balanceContainerElement=this.querySelector('[data-ref="balance-container"]'),this.barElement=this.querySelector('[data-ref="bar"]')}connectedCallback(){requestAnimationFrame((()=>{this.barElement.style.transform="scaleY(0)",this.updatesStyle()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.personName=this.getAttribute(d),this.balance=parseFloat(this.getAttribute(p)),this.balanceRange=Math.max(2,parseFloat(this.getAttribute(k))),this.updatesStyle()}static get observedAttributes(){return[d,p,k]}updatesStyle(){requestAnimationFrame((()=>{this.personNameElement.innerText=this.personName,this.balanceTextElement.innerText=(0,h.x)(this.balance);let e=Math.sign(this.balance)*Math.abs(this.balance)/this.balanceRange,t=1.9*e;this.barElement.style.transform=`scaleY(${e})`,this.balanceContainerElement.style.transform=Math.sign(this.balance)<0?`translateY(calc(${t}em - 150%))`:`translateY(calc(${t}em + 50%))`,e>0?(this.barElement.classList.add("balance-anzeige-element__bar--negative"),this.barElement.classList.remove("balance-anzeige-element__bar--positive")):(this.barElement.classList.remove("balance-anzeige-element__bar--negative"),this.barElement.classList.add("balance-anzeige-element__bar--positive"))}))}}customElements.define("balance-anzeige-element",g);var m=n(2056),f=n.n(m),v=n(6029);class y extends HTMLElement{constructor(){super(),this.innerHTML=f(),this.personenRenderer=new v.T(this,(e=>e.id),(e=>new g))}connectedCallback(){}disconnectedCallback(){}setBalance(e){this.personen=e,this.balanceRange=Math.max(...Object.values(e).map((e=>Math.abs(e.balance)))),this.updatesStyle()}updatesStyle(){this.personenRenderer.update(this.personen,((e,t)=>{e.setAttribute(d,t.name),e.setAttribute(p,""+t.balance),e.setAttribute(k,""+this.balanceRange)}))}}customElements.define("balance-anzeige",y);var w=n(3920),S=n.n(w),E=n(8828),z=n.n(E),_=n(5075);const C="beschreibung",A="wert",L="bezahlende-person",M="empfaenger",x="status",T=new u.a(z());class q extends HTMLElement{constructor(){super(),this.attributeStore={beschreibung:null,bezahlendePerson:null,empfaenger:null,wert:null,status:null},this.appendChild(T.get()),this.beschreibungElement=this.querySelector('[data-ref="beschreibung"]'),this.bezahlendePersonElement=this.querySelector('[data-ref="bezahlende-person"]'),this.empfaengerElement=this.querySelector('[data-ref="empfaenger"]'),this.wertElement=this.querySelector('[data-ref="wert"]'),this.doneElement=this.querySelector('[data-ref="icon-done"]'),this.doneAllElement=this.querySelector('[data-ref="icon-done-all"]'),this.syncElement=this.querySelector('[data-ref="icon-sync"]')}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}checkChanged(e,t){let n=t();return this.attributeStore[e]!=n&&(this.attributeStore[e]=n,!0)}updateAttributes(){[this.checkChanged("bezahlendePerson",(()=>this.getAttribute(L))),this.checkChanged("beschreibung",(()=>this.getAttribute(C))),this.checkChanged("wert",(()=>parseFloat(this.getAttribute(A)))),this.checkChanged("empfaenger",(()=>this.getAttribute(M))),this.checkChanged("status",(()=>this.getAttribute(x)))].some((e=>e))&&this.updatesStyle()}static get observedAttributes(){return[C,L,A,M,x]}updatesStyle(){this.beschreibungElement.innerText=this.attributeStore.beschreibung,this.bezahlendePersonElement.innerText=this.attributeStore.bezahlendePerson,this.wertElement.innerText=(0,h.x)(this.attributeStore.wert),this.empfaengerElement.innerText=this.attributeStore.empfaenger,this.doneAllElement.style.display=this.attributeStore.status==_.Z.Gespeichert?"inline":"none",this.doneElement.style.display=this.attributeStore.status==_.Z.Zwischengespeichert?"inline":"none",this.syncElement.style.display=this.attributeStore.status==_.Z.Speichern?"inline":"none"}}customElements.define("bezahlung-card",q);var I=n(394),D=n(4327),Z=n(3682),N=n(9429);function B(e,t){(0,Z.Z)(1,arguments);var n=t||{},s=n.locale,r=s&&s.options&&s.options.weekStartsOn,a=null==r?0:(0,I.Z)(r),i=null==n.weekStartsOn?a:(0,I.Z)(n.weekStartsOn);if(!(i>=0&&i<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=(0,D.Z)(e),l=o.getDay(),c=(l<i?7:0)+l-i;return o.setDate(o.getDate()-c),o.setHours(0,0,0,0),o}function H(e,t){const n=new Map;return e.forEach((e=>{const s=e[t],r=n.get(s);r?r.push(e):n.set(s,[e])})),n}var K=n(5228),O=n.n(K);class P extends HTMLElement{constructor(){super(),this.innerHTML=O(),this.container=this.querySelector('[data-ref="container"]'),this.titleElement=this.querySelector('[data-ref="title"]'),this.bezahlungenRenderer=new v.T(this.container,(e=>e.id),(e=>new q))}connectedCallback(){}disconnectedCallback(){}setBezahlungen(e){this.bezahlungenRenderer.update(e,((e,t)=>{e.setAttribute(C,t.beschreibung),e.setAttribute(A,""+t.wert),e.setAttribute(L,t.bezahlendePersonName),e.setAttribute(M,t.empfaenger),e.setAttribute(x,t.status)}))}set title(e){this.titleElement.innerText=e}}customElements.define("bezahlungen-group",P);class j extends HTMLElement{constructor(){super(),this.minTage=3,this.minEintraege=20,this.all=!1,this.innerHTML=S(),this.bezahlungenContainer=this.querySelector("#bezahlungen-container"),this.showMoreButton=this.querySelector("#show-more"),this.showMoreClick=this.showMoreClick.bind(this),this.groupRenderer=new v.T(this.bezahlungenContainer,(e=>""+e[0]),(()=>new P))}connectedCallback(){this.showMoreButton.addEventListener("click",this.showMoreClick)}disconnectedCallback(){}setShowMoreButtonDisplay(){this.bezahlungen&&(this.showMoreButton.style.display=this.bezahlungen.length>this.anzahlEintraege?"inline":"none")}showMoreClick(){let e=this.bezahlungenContainer.lastElementChild;this.anzahlEintraege+=20,e&&e.scrollIntoView(),this.setShowMoreButtonDisplay()}formatEmpfaenger(e,t){return e.empfaengerIds.length==t.length?"alle":e.empfaengerIds.map((e=>t.find((t=>t.id==e)).name)).join(", ")}setBezahlungen(e,t){this.bezahlungen=e,this.personen=t,this.setShowMoreButtonDisplay(),this.render()}render(){let e=this.bezahlungen.sort(((e,t)=>+t.zeitpunkt-+e.zeitpunkt)),t=e;this.all||(t=e.filter((e=>e.zeitpunkt>function(e,t){(0,Z.Z)(2,arguments);var n=(0,D.Z)(e),s=(0,I.Z)(t);return isNaN(s)?new Date(NaN):s?(n.setDate(n.getDate()+s),n):n}((0,N.Z)(Date.now()),-this.minTage))),t.length<this.minEintraege&&(t=e.slice(0,this.minEintraege)));let n=t.map((e=>({bezahlendePersonName:this.personen.find((t=>t.id==e.bezahlendePersonId)).name,wert:e.wert,beschreibung:e.beschreibung,empfaenger:this.formatEmpfaenger(e,this.personen),tag:+(0,N.Z)(e.zeitpunkt),id:e.id,woche:+B(e.zeitpunkt),status:e.status}))),s=!1,r=Array.of(...H(n,"tag").entries());r.reduce(((e,t)=>e+t[1].length),0)/r.length<3&&(r=Array.of(...H(n,"woche").entries()),s=!0);let a=r.sort(((e,t)=>t[0]-e[0]));this.groupRenderer.update(a,((e,t)=>{e.setBezahlungen(t[1]),e.title=s?this.formatWeek(new Date(t[0])):this.formatDay(new Date(t[0]))}))}get anzahlEintraege(){return this.minEintraege}set anzahlEintraege(e){this.minEintraege=e,this.render()}formatWeek(e){let t,n=function(e,t){(0,Z.Z)(1,arguments);var n=t||{},s=n.locale,r=s&&s.options&&s.options.weekStartsOn,a=null==r?0:(0,I.Z)(r),i=null==n.weekStartsOn?a:(0,I.Z)(n.weekStartsOn);if(!(i>=0&&i<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=(0,D.Z)(e),l=o.getDay(),c=6+(l<i?-7:0)-(l-i);return o.setDate(o.getDate()+c),o.setHours(23,59,59,999),o}(e);const s=e=>new Intl.DateTimeFormat(["de-AT"],{day:"numeric",month:"long"}).format(e);return t=n.getMonth()==e.getMonth()?`${new Intl.DateTimeFormat(["de-AT"],{day:"numeric"}).format(e)}. - ${s(n)}`:`${s(e)} - ${s(n)}`,t}formatDay(e){return new Intl.DateTimeFormat(["de-AT"],{weekday:"short",year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}}customElements.define("bezahlungen-view",j);var R=n(8059);class F{constructor(e){this.id=e,this.type=14}}class G{constructor(e,t){this.kontokorrentId=e,this.bezahlungen=t,this.type=15}}class W{constructor(e){this.kontokorrentId=e,this.type=16}}class ${constructor(e){this.kontokorrentId=e,this.type=19}}class Y{constructor(e,t){this.kontokorrentId=e,this.balance=t,this.type=17}}class U{constructor(e,t,n,s){this.store=e,this.apiClient=t,this.db=n,this.workerService=s}async refreshBezahlungen(e){let t=function(e){let t={},n=e.sort(((e,t)=>e.laufendeNummer-t.laufendeNummer));for(let e of n)e.bearbeiteteBezahlungId&&delete t[e.bearbeiteteBezahlungId],e.geloeschteBezahlungId?delete t[e.geloeschteBezahlungId]:t[e.bezahlung.id]=e.bezahlung;return Object.values(t)}(await this.db.getAktionen(e)).map((e=>Object.assign(Object.assign({},e),{status:_.Z.Gespeichert}))),n=(await this.db.getZwischengespeicherteBezahlungenForKontokorrent(e)).map((e=>({status:_.Z.Zwischengespeichert,beschreibung:e.beschreibung,bezahlendePersonId:e.bezahlendePersonId,empfaengerIds:e.empfaengerIds,id:e.id,wert:e.wert,zeitpunkt:e.zeitpunkt})));this.store.dispatch(new G(e,[...t,...n]))}async calculateBalance(e){let t=await(await this.workerService.getWorker()).calculateBalance(e);this.store.dispatch(new Y(e,t))}async refreshKontokorrent(e){await Promise.all([this.refreshBezahlungen(e),this.calculateBalance(e)])}async kontokorrentSynchronisieren(e){this.store.dispatch(new W(e));let t=await(await this.workerService.getWorker()).getLaufendeNummer(e),n=await this.apiClient.getAktionen(e,t);n.success&&(await this.db.addAktionen(e,n.aktionen),n.aktionen.length>0&&await this.refreshKontokorrent(e)),this.store.dispatch(new $(e))}async kontokorrentOeffnen(e){if(null!=await this.db.getKontokorrent(e)){this.store.dispatch(new F(e));let t=[];t.push(this.db.setZuletztGesehenerKontokorrentId(e)),t.push(this.refreshKontokorrent(e)),t.push(this.kontokorrentSynchronisieren(e)),await Promise.all(t)}}}var V=n(1550);class X extends HTMLElement{constructor(){super(),this.innerHTML=r(),this.appBar=this.querySelector(o.W),this.balanceAnzeige=this.querySelector("#balance-anzeige"),this.bezahlungenView=this.querySelector("#bezahlungen-view"),this.kontokorrentSpinner=this.querySelector("#spinner")}addServices(e){this.store=e.store,this.routingActionCreator=(0,a.b)(e),this.kontokorrentActionCreator=function(e){return e.get("KontokorrentActionCreator",(e=>new U(e.store,e.apiClient,e.db,(0,R.G)(e))))}(e),this.kontokorrentListenActionCreator=(0,V.d8)(e),this.appBar.addServices(e)}connectedCallback(){this.kontokorrentIdParameter||this.kontokorrentListenActionCreator.navigiereZuLetztGesehenem(!0),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.routingActionCreator.navigateKontokorrent(e.detail)})),(0,i.G)(this.querySelectorAll("#eintragen-desktop, #eintragen-mobile"),this.routingActionCreator),this.applyStoreState(this.store.state)}applyStoreState(e){this.kontokorrent=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId],this.kontokorrent&&(document.title=`${this.kontokorrent.name} - Kontokorrent`,this.kontokorrent.personen&&(this.balanceAnzeige.setBalance(this.kontokorrent.personen),this.bezahlungenView.setBezahlungen(this.kontokorrent.bezahlungen,this.kontokorrent.personen)),this.kontokorrentSpinner.style.display=this.kontokorrent.synchronisieren?"flex":"none")}setRouteParameters(e){this.kontokorrentActionCreator.kontokorrentOeffnen(e),this.kontokorrentIdParameter=e}disconnectedCallback(){this.subscription()}}customElements.define("kontokorrent-page",X)},2204:function(e,t,n){"use strict";function s(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:function(){return s}})},4227:function(e,t,n){"use strict";class s extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(e){"Escape"==e.key&&this.hide()}clickListener(e){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",s)},8059:function(e,t,n){"use strict";n.d(t,{G:function(){return a}}),n(285);var s=n(1107);class r{constructor(e){this.store=e}async getWorker(){if(this.workerApi)return this.workerApi;const e=new Worker(new URL(n.p+n.u(458),n.b));return e.addEventListener("message",(e=>{var t;if("statedispatch"==(null===(t=e.data)||void 0===t?void 0:t.type)){let t=e.data.msg;this.store.dispatch(t)}})),this.workerApi=(0,s.Ud)(e),this.workerApi}}function a(e){return e.get("WorkerService",(e=>new r(e.store)))}},6029:function(e,t,n){"use strict";n.d(t,{T:function(){return s}});class s{constructor(e,t,n){this.listElement=e,this.keySelector=t,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(e,t){let n=new Map,s=e=>n.get(e)||(()=>{let t=this.keySelector(e);return n.set(e,t),t})();for(let n of Array.from(this.listElement.children)){let r=n,a=e.find((e=>this.elementToKey.get(r)==s(e)));a?t(r,a):this.listElement.removeChild(r)}let r=null,a=new Map;for(let n of e){let e=s(n),i=this.keyToElement.get(e);i||(i=this.createElement(n),t(i,n),this.elementToKey.set(i,e)),a.set(e,i),null==r&&i!=this.listElement.firstElementChild?this.listElement.prepend(i):null!=r&&r.nextElementSibling!=i&&r.insertAdjacentElement("afterend",i),r=i}this.keyToElement=a}}},5022:function(e,t,n){"use strict";n.d(t,{a:function(){return s}});class s{constructor(e){this.template=e}get(){return null==this.instance&&(this.instance=document.createElement("template"),this.instance.innerHTML=this.template),document.importNode(this.instance.content,!0)}}},2033:function(e,t,n){"use strict";function s(e){var t,n,s,r,a=""+(2,n=(t=e.toString()).indexOf("E"),r=0,(s=t.indexOf("e"))>-1?(r=parseFloat(t.substring(s+1)),t=t.substring(0,s)):n>-1&&(r=parseFloat(t.substring(n+1)),t=t.substring(0,n)),Number(Math.round(Number(t+"e"+(r+2)))+"e-2")),i=a.toString().indexOf(".");return-1!=i&&1==a.toString().length-(i+1)&&(a+="0"),a}n.d(t,{x:function(){return s}})},5097:function(e){e.exports='<header class="app-bar"> <kontokorrent-select class="app-bar__kontokorrent-select"></kontokorrent-select> <nav class="app-bar__links"> <button id="logout-button" class="app-bar__link" title="Logout"> <span class="material-icons"> exit_to_app </span> </button> <a href="info" class="app-bar__link" title="Informationen über diese App"> <span class="material-icons"> info </span> </a> </nav> </header> <app-popup id="logout-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class="dialog__button-pane"> <button id="abort-logout" class="button">Abbrechen</button> <button id="confirm-logout" class="button">Ausloggen</button> </div> </div> </app-popup>'},2056:function(e){e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},4911:function(e){e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},8828:function(e){e.exports='<div class="bezahlung-card__beschreibung"> <div data-ref="beschreibung"></div> <div class="bezahlung-card__personen"> <span data-ref="bezahlende-person"></span> für <span data-ref="empfaenger"></span> </div> </div> <div class="bezahlung-card__col2"> <div class="bezahlung-card__dummy"></div> <div class="bezahlung-card__wert"> <span data-ref="wert"></span>€ </div> <div class="bezahlung-card__status"> <span class="material-icons" data-ref="icon-done" style="display:none" title="lokal zwischengespeichert"> schedule </span> <span class="material-icons" data-ref="icon-done-all" style="display:none" title="synchronisiert"> done_all </span> <span class="material-icons" data-ref="icon-sync" style="display:none" title="synchronisieren..."> sync </span> </div> </div>'},5228:function(e){e.exports='<h3 data-ref="title" class="bezahlungen-group__title">Gruppe</h3> <div class="bezahlungen-group__container" data-ref="container"></div>'},3920:function(e){e.exports='<div id="bezahlungen-container"> </div> <button id="show-more" class="button">Mehr anzeigen</button>'},2477:function(e){e.exports='<app-bar></app-bar> <div style="display:none" id="login-expired">Google-Login abgelaufen: zum Synchronisieren neu anmelden</div> <balance-anzeige id="balance-anzeige"></balance-anzeige> <div class="kontokorrentpage-menu"> <a id="eintragen-desktop" class="floating-action-button floating-action-button--embed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a> <span class="kontokorrentpage-menu__sync-display" id="spinner" style="display:none"> <div class="spinner"></div> synchronisieren </span> </div> <bezahlungen-view id="bezahlungen-view"></bezahlungen-view> <a id="eintragen-mobile" class="floating-action-button floating-action-button--fixed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a>'},5777:function(e){e.exports='<div class="kontokorrent-select-wrapper"> <div class="kontokorrent-select"> <h1 data-ref="kontokorrent-name" class="kontokorrent-select__name">Kontokorrent</h1> <button class="kontokorrent-select__choose" title="anderen Kontokorrent wählen"> <span class="material-icons"> arrow_drop_down </span> </button> </div> <app-popup class="kontokorrent-select__popup"> <kontokorrent-select-list></kontokorrent-select-list> <div class="kontokorrent-select__buttons"> <button id="add-kontokorrent" class="button">weiteren hinzufügen</button> </div> </app-popup> </div>'},5088:function(e){e.exports='<ol data-ref="list" class="kontokorrent-select-list"> </ol>'},2255:function(e){e.exports='<a data-ref="link" class="kontokorrent-select-list__entry"> <span data-ref="name"></span> </a>'}}]);
//# sourceMappingURL=52dbf63f8bb39935bbb8.bundle.js.map