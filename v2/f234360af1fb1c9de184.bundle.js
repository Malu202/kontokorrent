(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[888],{543:function(e){e.exports='<header class="app-bar"> <kontokorrent-select class="app-bar__kontokorrent-select"></kontokorrent-select> <nav class="app-bar__links"> <button id="logout-button" class="app-bar__link" title="Logout"> <span class="material-icons"> exit_to_app </span> </button> <a href="info" class="app-bar__link" title="Informationen über diese App"> <span class="material-icons"> info </span> </a> </nav> </header> <app-popup id="logout-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class="dialog__button-pane"> <button id="abort-logout" class="button">Abbrechen</button> <button id="confirm-logout" class="button">Ausloggen</button> </div> </div> </app-popup>'},347:function(e){e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},400:function(e){e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},723:function(e){e.exports='<div class="bezahlung-card__beschreibung"> <div data-ref="beschreibung"></div> <div class="bezahlung-card__personen"> <span data-ref="bezahlende-person"></span> für <span data-ref="empfaenger"></span> </div> </div> <div class="bezahlung-card__wert"> <span data-ref="wert"></span>€ </div>'},989:function(e){e.exports='<h3 data-ref="title" class="bezahlungen-group__title">Gruppe</h3> <div class="bezahlungen-group__container" data-ref="container"></div>'},2:function(e){e.exports='<div id="bezahlungen-container"> </div> <button id="show-more" class="button">Mehr anzeigen</button>'},250:function(e){e.exports='<app-bar></app-bar> <div style="display:none" id="login-expired">Google-Login abgelaufen: zum Synchronisieren neu anmelden</div> <balance-anzeige id="balance-anzeige"></balance-anzeige> <div class="kontokorrentpage-menu"> <a id="eintragen-desktop" class="floating-action-button floating-action-button--embed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a> <span class="kontokorrentpage-menu__sync-display" id="spinner" style="display:none"> <div class="spinner"></div> synchronisieren </span> </div> <bezahlungen-view id="bezahlungen-view"></bezahlungen-view> <a id="eintragen-mobile" class="floating-action-button floating-action-button--fixed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a>'},149:function(e){e.exports='<div class="kontokorrent-select-wrapper"> <div class="kontokorrent-select"> <h1 data-ref="kontokorrent-name" class="kontokorrent-select__name">Kontokorrent</h1> <button class="kontokorrent-select__choose" title="anderen Kontokorrent wählen"> <span class="material-icons"> arrow_drop_down </span> </button> </div> <app-popup class="kontokorrent-select__popup"> <kontokorrent-select-list></kontokorrent-select-list> <div class="kontokorrent-select__buttons"> <button id="add-kontokorrent" class="button">weiteren hinzufügen</button> </div> </app-popup> </div>'},100:function(e){e.exports='<ol data-ref="list" class="kontokorrent-select-list"> </ol>'},463:function(e){e.exports='<a data-ref="link" class="kontokorrent-select-list__entry"> <span data-ref="name"></span> </a>'},778:function(e,t,n){"use strict";n.d(t,{W:function(){return S}});var r=n(543),s=n.n(r),i=n(445),a=n(699),o=n(149),l=n.n(o),c=n(100),h=n.n(c),u=n(600),d=n(718),p=n(463),k=n.n(p);class b extends HTMLElement{constructor(){super(),this.innerHTML=k(),this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.clickEvent=this.clickEvent.bind(this)}connectedCallback(){this.link.addEventListener("click",this.clickEvent)}clickEvent(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(e,t){this.kontokorrent=e,this.name.innerText=e.name,this.link.href=`kontokorrents/${e.id}`,this.link.classList.toggle("kontokorrent-select-list__entry--active",t)}}customElements.define("kontokorrent-select-list-entry",b);class g extends HTMLElement{constructor(){super(),this.innerHTML=h(),this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new d.T(this.list,(e=>e.id),(()=>{let e=document.createElement("li");return e.appendChild(new b),e}))}connectedCallback(){}disconnectedCallback(){}update(){this.kontokorrentsRenderer.update(this._kontokorrents,((e,t)=>{e.firstChild.update(t,this._activeKontokorrentId==t.id)}))}set kontokorrents(e){this._kontokorrents=(0,u.T)(e,(e=>e.name)),this.update()}set activeKontokorrentId(e){this._activeKontokorrentId=e,this.update()}}const m="kontokorrent-select-list";customElements.define(m,g),n(414);class f extends HTMLElement{constructor(){super(),this.innerHTML=l(),this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector(m),this.addButton=this.querySelector("#add-kontokorrent"),this._kontokorrents=null}connectedCallback(){this.popup=this.querySelector("app-popup"),this.updateAttributes(),this.addEventListener("click",(e=>{this.popup.contains(event.target)||(this.popup.toggle(),e.stopPropagation())})),this.addButton.addEventListener("click",(e=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))})),this.kontokorrentSelectList.addEventListener("gotokontokorrent",(()=>{this.popup.hide()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(e){this.kontokorrentSelectList.kontokorrents=e,this._kontokorrents=e,this.updatesStyle()}updatesStyle(){if(this._kontokorrents&&this._kontokorrents.length){let e=this._kontokorrents.find((e=>e.id==this.activeKontokorrentId));this.kontokorrentName.innerText=e?e.name:"(Kontokorrent wählen)"}}}const v="kontokorrent-select";customElements.define(v,f);var y=n(928);class w extends HTMLElement{constructor(){super(),this.innerHTML=s(),this.kontokorrentSelect=this.querySelector(v),this.logoutDialog=this.querySelector("#logout-dialog")}connectedCallback(){this.querySelector("#logout-button").addEventListener("click",(e=>{this.logoutDialog.toggle(),e.stopPropagation()})),this.querySelector("#confirm-logout").addEventListener("click",(()=>{return e=this,t=void 0,r=function*(){yield this.accountActionCreator.logout()},new((n=void 0)||(n=Promise))((function(s,i){function a(e){try{l(r.next(e))}catch(e){i(e)}}function o(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((r=r.apply(e,t||[])).next())}));var e,t,n,r})),this.querySelector("#abort-logout").addEventListener("click",(()=>{this.logoutDialog.hide()})),(0,a.G)(this.querySelectorAll("a"),this.routingActionCreator),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.applyStoreState(this.store.state),this.kontokorrentSelect.addEventListener("addkontokorrent",(()=>{this.routingActionCreator.navigateLogin()}))}applyStoreState(e){this.kontokorrentSelect.kontokorrents=Object.values(e.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",e.kontokorrents.activeKontokorrentId)}addServices(e){this.store=e.store,this.routingActionCreator=(0,i.b)(e),this.accountActionCreator=(0,y.gg)(e)}disconnectedCallback(){this.subscription()}}const S="app-bar";customElements.define(S,w)},489:function(e,t,n){"use strict";n.r(t),n.d(t,{KontokorrentPage:function(){return ue}});var r=n(250),s=n.n(r),i=n(445),a=n(699),o=n(778),l=n(400),c=n.n(l);function h(e){var t,n,r,s,i=""+(2,n=(t=e.toString()).indexOf("E"),s=0,(r=t.indexOf("e"))>-1?(s=parseFloat(t.substring(r+1)),t=t.substring(0,r)):n>-1&&(s=parseFloat(t.substring(n+1)),t=t.substring(0,n)),Number(Math.round(Number(t+"e"+(s+2)))+"e-2")),a=i.toString().indexOf(".");return-1!=a&&1==i.toString().length-(a+1)&&(i+="0"),i}var u=n(317);const d="person-name",p="balance",k="balance-range",b=new u.a(c());class g extends HTMLElement{constructor(){super(),this.appendChild(b.get()),this.personNameElement=this.querySelector('[data-ref="person-name"]'),this.balanceTextElement=this.querySelector('[data-ref="balance-text"]'),this.balanceContainerElement=this.querySelector('[data-ref="balance-container"]'),this.barElement=this.querySelector('[data-ref="bar"]')}connectedCallback(){requestAnimationFrame((()=>{this.barElement.style.transform="scaleY(0)",this.updatesStyle()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.personName=this.getAttribute(d),this.balance=parseFloat(this.getAttribute(p)),this.balanceRange=Math.max(2,parseFloat(this.getAttribute(k))),this.updatesStyle()}static get observedAttributes(){return[d,p,k]}updatesStyle(){requestAnimationFrame((()=>{this.personNameElement.innerText=this.personName,this.balanceTextElement.innerText=h(this.balance);let e=Math.sign(this.balance)*Math.abs(this.balance)/this.balanceRange,t=1.9*e;this.barElement.style.transform=`scaleY(${e})`,this.balanceContainerElement.style.transform=Math.sign(this.balance)<0?`translateY(calc(${t}em - 150%))`:`translateY(calc(${t}em + 50%))`,e>0?(this.barElement.classList.add("balance-anzeige-element__bar--negative"),this.barElement.classList.remove("balance-anzeige-element__bar--positive")):(this.barElement.classList.remove("balance-anzeige-element__bar--negative"),this.barElement.classList.add("balance-anzeige-element__bar--positive"))}))}}customElements.define("balance-anzeige-element",g);var m=n(347),f=n.n(m),v=n(718);class y extends HTMLElement{constructor(){super(),this.innerHTML=f(),this.personenRenderer=new v.T(this,(e=>e.id),(e=>new g))}connectedCallback(){}disconnectedCallback(){}setBalance(e){this.personen=e,this.balanceRange=Math.max(...Object.values(e).map((e=>Math.abs(e.balance)))),this.updatesStyle()}updatesStyle(){this.personenRenderer.update(this.personen,((e,t)=>{e.setAttribute(d,t.name),e.setAttribute(p,""+t.balance),e.setAttribute(k,""+this.balanceRange)}))}}customElements.define("balance-anzeige",y);var w=n(2),S=n.n(w),E=n(723),z=n.n(E);const _="beschreibung",C="wert",A="bezahlende-person",L="empfaenger",M=new u.a(z());class x extends HTMLElement{constructor(){super(),this.attributeStore={beschreibung:null,bezahlendePerson:null,empfaenger:null,wert:null},this.appendChild(M.get()),this.beschreibungElement=this.querySelector('[data-ref="beschreibung"]'),this.bezahlendePersonElement=this.querySelector('[data-ref="bezahlende-person"]'),this.empfaengerElement=this.querySelector('[data-ref="empfaenger"]'),this.wertElement=this.querySelector('[data-ref="wert"]')}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}checkChanged(e,t){let n=t();return this.attributeStore[e]!=n&&(this.attributeStore[e]=n,!0)}updateAttributes(){[this.checkChanged("bezahlendePerson",(()=>this.getAttribute(A))),this.checkChanged("beschreibung",(()=>this.getAttribute(_))),this.checkChanged("wert",(()=>parseFloat(this.getAttribute(C)))),this.checkChanged("empfaenger",(()=>this.getAttribute(L)))].some((e=>e))&&this.updatesStyle()}static get observedAttributes(){return[_,A,C,L]}updatesStyle(){this.beschreibungElement.innerText=this.attributeStore.beschreibung,this.bezahlendePersonElement.innerText=this.attributeStore.bezahlendePerson,this.wertElement.innerText=h(this.attributeStore.wert),this.empfaengerElement.innerText=this.attributeStore.empfaenger}}function T(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function q(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function D(e){q(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function I(e){q(1,arguments);var t=D(e);return t.setHours(0,0,0,0),t}function N(e,t){q(1,arguments);var n=t||{},r=n.locale,s=r&&r.options&&r.options.weekStartsOn,i=null==s?0:T(s),a=null==n.weekStartsOn?i:T(n.weekStartsOn);if(!(a>=0&&a<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=D(e),l=o.getDay(),c=(l<a?7:0)+l-a;return o.setDate(o.getDate()-c),o.setHours(0,0,0,0),o}function B(e,t){const n=new Map;return e.forEach((e=>{const r=e[t],s=n.get(r);s?s.push(e):n.set(r,[e])})),n}customElements.define("bezahlung-card",x);var H=n(989),K=n.n(H);class P extends HTMLElement{constructor(){super(),this.innerHTML=K(),this.container=this.querySelector('[data-ref="container"]'),this.titleElement=this.querySelector('[data-ref="title"]'),this.bezahlungenRenderer=new v.T(this.container,(e=>e.id),(e=>new x))}connectedCallback(){}disconnectedCallback(){}setBezahlungen(e){this.bezahlungenRenderer.update(e,((e,t)=>{e.setAttribute(_,t.beschreibung),e.setAttribute(C,""+t.wert),e.setAttribute(A,t.bezahlendePersonName),e.setAttribute(L,t.empfaenger)}))}set title(e){this.titleElement.innerText=e}}customElements.define("bezahlungen-group",P);class O extends HTMLElement{constructor(){super(),this.minTage=3,this.minEintraege=20,this.all=!1,this.innerHTML=S(),this.bezahlungenContainer=this.querySelector("#bezahlungen-container"),this.showMoreButton=this.querySelector("#show-more"),this.showMoreClick=this.showMoreClick.bind(this),this.groupRenderer=new v.T(this.bezahlungenContainer,(e=>""+e[0]),(()=>new P))}connectedCallback(){this.showMoreButton.addEventListener("click",this.showMoreClick)}disconnectedCallback(){}setShowMoreButtonDisplay(){this.bezahlungen&&(this.showMoreButton.style.display=this.bezahlungen.length>this.anzahlEintraege?"inline":"none")}showMoreClick(){let e=this.bezahlungenContainer.lastElementChild;this.anzahlEintraege+=20,e&&e.scrollIntoView(),this.setShowMoreButtonDisplay()}formatEmpfaenger(e,t){return e.empfaengerIds.length==t.length?"alle":e.empfaengerIds.map((e=>t.find((t=>t.id==e)).name)).join(", ")}setBezahlungen(e,t){this.bezahlungen=e,this.personen=t,this.setShowMoreButtonDisplay(),this.render()}render(){let e=this.bezahlungen.sort(((e,t)=>+t.zeitpunkt-+e.zeitpunkt)),t=e;this.all||(t=e.filter((e=>e.zeitpunkt>function(e,t){q(2,arguments);var n=D(e),r=T(t);return isNaN(r)?new Date(NaN):r?(n.setDate(n.getDate()+r),n):n}(I(Date.now()),-this.minTage))),t.length<this.minEintraege&&(t=e.slice(0,this.minEintraege)));let n=t.map((e=>({bezahlendePersonName:this.personen.find((t=>t.id==e.bezahlendePersonId)).name,wert:e.wert,beschreibung:e.beschreibung,empfaenger:this.formatEmpfaenger(e,this.personen),tag:+I(e.zeitpunkt),id:e.id,woche:+N(e.zeitpunkt)}))),r=!1,s=Array.of(...B(n,"tag").entries());s.reduce(((e,t)=>e+t[1].length),0)/s.length<3&&(s=Array.of(...B(n,"woche").entries()),r=!0);let i=s.sort(((e,t)=>t[0]-e[0]));this.groupRenderer.update(i,((e,t)=>{e.setBezahlungen(t[1]),e.title=r?this.formatWeek(new Date(t[0])):this.formatDay(new Date(t[0]))}))}get anzahlEintraege(){return this.minEintraege}set anzahlEintraege(e){this.minEintraege=e,this.render()}formatWeek(e){let t,n=function(e,t){q(1,arguments);var n=t||{},r=n.locale,s=r&&r.options&&r.options.weekStartsOn,i=null==s?0:T(s),a=null==n.weekStartsOn?i:T(n.weekStartsOn);if(!(a>=0&&a<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=D(e),l=o.getDay(),c=6+(l<a?-7:0)-(l-a);return o.setDate(o.getDate()+c),o.setHours(23,59,59,999),o}(e);const r=e=>new Intl.DateTimeFormat(["de-AT"],{day:"numeric",month:"long"}).format(e);return t=n.getMonth()==e.getMonth()?`${new Intl.DateTimeFormat(["de-AT"],{day:"numeric"}).format(e)}. - ${r(n)}`:`${r(e)} - ${r(n)}`,t}formatDay(e){return new Intl.DateTimeFormat(["de-AT"],{weekday:"short",year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}}customElements.define("bezahlungen-view",O);const j=Symbol("Comlink.proxy"),R=Symbol("Comlink.endpoint"),F=Symbol("Comlink.releaseProxy"),W=Symbol("Comlink.thrown"),$=e=>"object"==typeof e&&null!==e||"function"==typeof e,G=new Map([["proxy",{canHandle:e=>$(e)&&e[j],serialize(e){const{port1:t,port2:n}=new MessageChannel;return Y(e,t),[n,[n]]},deserialize:e=>(e.start(),Z(e))}],["throw",{canHandle:e=>$(e)&&W in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function Y(e,t=self){t.addEventListener("message",(function n(r){if(!r||!r.data)return;const{id:s,type:i,path:a}=Object.assign({path:[]},r.data),o=(r.data.argumentList||[]).map(te);let l;try{const t=a.slice(0,-1).reduce(((e,t)=>e[t]),e),n=a.reduce(((e,t)=>e[t]),e);switch(i){case 0:l=n;break;case 1:t[a.slice(-1)[0]]=te(r.data.value),l=!0;break;case 2:l=n.apply(t,o);break;case 3:l=function(e){return Object.assign(e,{[j]:!0})}(new n(...o));break;case 4:{const{port1:t,port2:n}=new MessageChannel;Y(e,n),l=function(e,t){return Q.set(e,t),e}(t,[t])}break;case 5:l=void 0}}catch(e){l={value:e,[W]:0}}Promise.resolve(l).catch((e=>({value:e,[W]:0}))).then((e=>{const[r,a]=ee(e);t.postMessage(Object.assign(Object.assign({},r),{id:s}),a),5===i&&(t.removeEventListener("message",n),V(t))}))})),t.start&&t.start()}function V(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function Z(e,t){return X(e,[],t)}function U(e){if(e)throw new Error("Proxy has been released and is not useable")}function X(e,t=[],n=function(){}){let r=!1;const s=new Proxy(n,{get(n,i){if(U(r),i===F)return()=>ne(e,{type:5,path:t.map((e=>e.toString()))}).then((()=>{V(e),r=!0}));if("then"===i){if(0===t.length)return{then:()=>s};const n=ne(e,{type:0,path:t.map((e=>e.toString()))}).then(te);return n.then.bind(n)}return X(e,[...t,i])},set(n,s,i){U(r);const[a,o]=ee(i);return ne(e,{type:1,path:[...t,s].map((e=>e.toString())),value:a},o).then(te)},apply(n,s,i){U(r);const a=t[t.length-1];if(a===R)return ne(e,{type:4}).then(te);if("bind"===a)return X(e,t.slice(0,-1));const[o,l]=J(i);return ne(e,{type:2,path:t.map((e=>e.toString())),argumentList:o},l).then(te)},construct(n,s){U(r);const[i,a]=J(s);return ne(e,{type:3,path:t.map((e=>e.toString())),argumentList:i},a).then(te)}});return s}function J(e){const t=e.map(ee);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const Q=new WeakMap;function ee(e){for(const[t,n]of G)if(n.canHandle(e)){const[r,s]=n.serialize(e);return[{type:3,name:t,value:r},s]}return[{type:0,value:e},Q.get(e)||[]]}function te(e){switch(e.type){case 3:return G.get(e.name).deserialize(e.value);case 0:return e.value}}function ne(e,t,n){return new Promise((r=>{const s=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===s&&(e.removeEventListener("message",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:s},t),n)}))}var re=function(e,t,n,r){return new(n||(n=Promise))((function(s,i){function a(e){try{l(r.next(e))}catch(e){i(e)}}function o(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((r=r.apply(e,t||[])).next())}))};class se{constructor(e){this.id=e,this.type=14}}class ie{constructor(e,t){this.kontokorrentId=e,this.bezahlungen=t,this.type=15}}class ae{constructor(e){this.kontokorrentId=e,this.type=16}}class oe{constructor(e){this.kontokorrentId=e,this.type=19}}class le{constructor(e,t){this.kontokorrentId=e,this.balance=t,this.type=17}}class ce{constructor(e,t,n){this.store=e,this.apiClient=t,this.db=n}refreshBezahlungen(e){return re(this,void 0,void 0,(function*(){let t=yield this.db.getAktionen(e);this.store.dispatch(new ie(e,function(e){let t={},n=e.sort(((e,t)=>e.laufendeNummer-t.laufendeNummer));for(let e of n)e.bearbeiteteBezahlungId&&delete t[e.bearbeiteteBezahlungId],e.geloeschteBezahlungId?delete t[e.geloeschteBezahlungId]:t[e.bezahlung.id]=e.bezahlung;return Object.values(t)}(t)))}))}calculateBalance(e){return re(this,void 0,void 0,(function*(){let t=yield(yield this.getWorkerApi()).calculateBalance(e);this.store.dispatch(new le(e,t))}))}refreshKontokorrent(e){return re(this,void 0,void 0,(function*(){yield Promise.all([this.refreshBezahlungen(e),this.calculateBalance(e)])}))}kontokorrentSynchronisieren(e){return re(this,void 0,void 0,(function*(){this.store.dispatch(new ae(e));let t=yield(yield this.getWorkerApi()).getLaufendeNummer(e),n=yield this.apiClient.getAktionen(e,t);n.success&&(yield this.db.addAktionen(e,n.aktionen),n.aktionen.length>0&&(yield this.refreshKontokorrent(e))),this.store.dispatch(new oe(e))}))}getWorkerApi(){return re(this,void 0,void 0,(function*(){if(this.workerApi)return this.workerApi;const e=new Worker(new URL(n.p+n.u(726),n.b));return this.workerApi=Z(e),this.workerApi}))}kontokorrentOeffnen(e){return re(this,void 0,void 0,(function*(){if(null!=(yield this.db.getKontokorrent(e))){this.store.dispatch(new se(e));let t=[];t.push(this.db.setZuletztGesehenerKontokorrentId(e)),t.push(this.refreshKontokorrent(e)),t.push(this.kontokorrentSynchronisieren(e)),yield Promise.all(t)}}))}}var he=n(114);class ue extends HTMLElement{constructor(){super(),this.innerHTML=s(),this.appBar=this.querySelector(o.W),this.balanceAnzeige=this.querySelector("#balance-anzeige"),this.bezahlungenView=this.querySelector("#bezahlungen-view"),this.kontokorrentSpinner=this.querySelector("#spinner")}addServices(e){this.store=e.store,this.routingActionCreator=(0,i.b)(e),this.kontokorrentActionCreator=function(e){return e.get("KontokorrentActionCreator",(e=>new ce(e.store,e.apiClient,e.db)))}(e),this.kontokorrentListenActionCreator=(0,he.d8)(e),this.appBar.addServices(e)}connectedCallback(){this.kontokorrentIdParameter||this.kontokorrentListenActionCreator.navigiereZuLetztGesehenem(!0),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.routingActionCreator.navigateKontokorrent(e.detail)})),(0,a.G)(this.querySelectorAll("#eintragen-desktop, #eintragen-mobile"),this.routingActionCreator),this.applyStoreState(this.store.state)}applyStoreState(e){this.kontokorrent=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId],this.kontokorrent&&(document.title=`${this.kontokorrent.name} - Kontokorrent`,this.kontokorrent.personen&&(this.balanceAnzeige.setBalance(this.kontokorrent.personen),this.bezahlungenView.setBezahlungen(this.kontokorrent.bezahlungen,this.kontokorrent.personen)),this.kontokorrentSpinner.style.display=this.kontokorrent.synchronisieren?"flex":"none")}setRouteParameters(e){this.kontokorrentActionCreator.kontokorrentOeffnen(e),this.kontokorrentIdParameter=e}disconnectedCallback(){this.subscription()}}customElements.define("kontokorrent-page",ue)},699:function(e,t,n){"use strict";function r(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:function(){return r}})},414:function(e,t,n){"use strict";class r extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(e){"Escape"==e.key&&this.hide()}clickListener(e){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",r)},718:function(e,t,n){"use strict";n.d(t,{T:function(){return r}});class r{constructor(e,t,n){this.listElement=e,this.keySelector=t,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(e,t){let n=new Map,r=e=>n.get(e)||(()=>{let t=this.keySelector(e);return n.set(e,t),t})();for(let n of Array.from(this.listElement.children)){let s=n,i=e.find((e=>this.elementToKey.get(s)==r(e)));i?t(s,i):this.listElement.removeChild(s)}let s=null,i=new Map;for(let n of e){let e=r(n),a=this.keyToElement.get(e);a||(a=this.createElement(n),t(a,n),this.elementToKey.set(a,e)),i.set(e,a),null==s&&a!=this.listElement.firstElementChild?this.listElement.prepend(a):null!=s&&s.nextElementSibling!=a&&s.insertAdjacentElement("afterend",a),s=a}this.keyToElement=i}}},317:function(e,t,n){"use strict";n.d(t,{a:function(){return r}});class r{constructor(e){this.template=e}get(){return null==this.instance&&(this.instance=document.createElement("template"),this.instance.innerHTML=this.template),document.importNode(this.instance.content,!0)}}}}]);
//# sourceMappingURL=f234360af1fb1c9de184.bundle.js.map