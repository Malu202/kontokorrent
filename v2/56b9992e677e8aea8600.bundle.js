(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[634],{882:(e,t,n)=>{"use strict";function s(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}n.d(t,{Z:()=>s})},119:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var s=n(13),a=n(882);function r(e){(0,a.Z)(1,arguments);var t=(0,s.Z)(e);return t.setHours(0,0,0,0),t}},13:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var s=n(882);function a(e){(0,s.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}},543:e=>{e.exports='<header class="app-bar"> <kontokorrent-select class="app-bar__kontokorrent-select"></kontokorrent-select> <nav class="app-bar__links"> <button id="logout-button" class="app-bar__link" title="Logout"> <span class="material-icons"> exit_to_app </span> </button> <a href="info" class="app-bar__link" title="Informationen über diese App"> <span class="material-icons"> info </span> </a> </nav> </header> <app-popup id="logout-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class="dialog__button-pane"> <button id="abort-logout" class="button">Abbrechen</button> <button id="confirm-logout" class="button">Ausloggen</button> </div> </div> </app-popup>'},347:e=>{e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},400:e=>{e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},723:e=>{e.exports='<div class="bezahlung-card__beschreibung"> <div data-ref="beschreibung"></div> <div class="bezahlung-card__personen"> <span data-ref="bezahlende-person"></span> für <span data-ref="empfaenger"></span> </div> </div> <div class="bezahlung-card__wert"> <span data-ref="wert"></span>€ </div> <div class="bezahlung-card__status"> <span class="material-icons" data-ref="icon-done" style="display:none"> done </span> <span class="material-icons" data-ref="icon-done-all" style="display:none"> done_all </span> <span class="material-icons" data-ref="icon-sync" style="display:none"> sync </span> </div>'},989:e=>{e.exports='<h3 data-ref="title" class="bezahlungen-group__title">Gruppe</h3> <div class="bezahlungen-group__container" data-ref="container"></div>'},2:e=>{e.exports='<div id="bezahlungen-container"> </div> <button id="show-more" class="button">Mehr anzeigen</button>'},250:e=>{e.exports='<app-bar></app-bar> <div style="display:none" id="login-expired">Google-Login abgelaufen: zum Synchronisieren neu anmelden</div> <balance-anzeige id="balance-anzeige"></balance-anzeige> <div class="kontokorrentpage-menu"> <a id="eintragen-desktop" class="floating-action-button floating-action-button--embed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a> <span class="kontokorrentpage-menu__sync-display" id="spinner" style="display:none"> <div class="spinner"></div> synchronisieren </span> </div> <bezahlungen-view id="bezahlungen-view"></bezahlungen-view> <a id="eintragen-mobile" class="floating-action-button floating-action-button--fixed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a>'},149:e=>{e.exports='<div class="kontokorrent-select-wrapper"> <div class="kontokorrent-select"> <h1 data-ref="kontokorrent-name" class="kontokorrent-select__name">Kontokorrent</h1> <button class="kontokorrent-select__choose" title="anderen Kontokorrent wählen"> <span class="material-icons"> arrow_drop_down </span> </button> </div> <app-popup class="kontokorrent-select__popup"> <kontokorrent-select-list></kontokorrent-select-list> <div class="kontokorrent-select__buttons"> <button id="add-kontokorrent" class="button">weiteren hinzufügen</button> </div> </app-popup> </div>'},100:e=>{e.exports='<ol data-ref="list" class="kontokorrent-select-list"> </ol>'},463:e=>{e.exports='<a data-ref="link" class="kontokorrent-select-list__entry"> <span data-ref="name"></span> </a>'},778:(e,t,n)=>{"use strict";n.d(t,{W:()=>S});var s=n(543),a=n.n(s),r=n(445),i=n(699),o=n(149),l=n.n(o),c=n(100),h=n.n(c),u=n(600),d=n(718),p=n(463),k=n.n(p);class b extends HTMLElement{constructor(){super(),this.innerHTML=k(),this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.clickEvent=this.clickEvent.bind(this)}connectedCallback(){this.link.addEventListener("click",this.clickEvent)}clickEvent(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(e,t){this.kontokorrent=e,this.name.innerText=e.name,this.link.href=`kontokorrents/${e.id}`,this.link.classList.toggle("kontokorrent-select-list__entry--active",t)}}customElements.define("kontokorrent-select-list-entry",b);class g extends HTMLElement{constructor(){super(),this.innerHTML=h(),this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new d.T(this.list,(e=>e.id),(()=>{let e=document.createElement("li");return e.appendChild(new b),e}))}connectedCallback(){}disconnectedCallback(){}update(){this.kontokorrentsRenderer.update(this._kontokorrents,((e,t)=>{e.firstChild.update(t,this._activeKontokorrentId==t.id)}))}set kontokorrents(e){this._kontokorrents=(0,u.T)(e,(e=>e.name)),this.update()}set activeKontokorrentId(e){this._activeKontokorrentId=e,this.update()}}const m="kontokorrent-select-list";customElements.define(m,g),n(414);class f extends HTMLElement{constructor(){super(),this.innerHTML=l(),this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector(m),this.addButton=this.querySelector("#add-kontokorrent"),this._kontokorrents=null}connectedCallback(){this.popup=this.querySelector("app-popup"),this.updateAttributes(),this.addEventListener("click",(e=>{this.popup.contains(event.target)||(this.popup.toggle(),e.stopPropagation())})),this.addButton.addEventListener("click",(e=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))})),this.kontokorrentSelectList.addEventListener("gotokontokorrent",(()=>{this.popup.hide()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(e){this.kontokorrentSelectList.kontokorrents=e,this._kontokorrents=e,this.updatesStyle()}updatesStyle(){if(this._kontokorrents&&this._kontokorrents.length){let e=this._kontokorrents.find((e=>e.id==this.activeKontokorrentId));this.kontokorrentName.innerText=e?e.name:"(Kontokorrent wählen)"}}}const y="kontokorrent-select";customElements.define(y,f);var v=n(928);class w extends HTMLElement{constructor(){super(),this.innerHTML=a(),this.kontokorrentSelect=this.querySelector(y),this.logoutDialog=this.querySelector("#logout-dialog")}connectedCallback(){this.querySelector("#logout-button").addEventListener("click",(e=>{this.logoutDialog.toggle(),e.stopPropagation()})),this.querySelector("#confirm-logout").addEventListener("click",(async()=>{await this.accountActionCreator.logout()})),this.querySelector("#abort-logout").addEventListener("click",(()=>{this.logoutDialog.hide()})),(0,i.G)(this.querySelectorAll("a"),this.routingActionCreator),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.applyStoreState(this.store.state),this.kontokorrentSelect.addEventListener("addkontokorrent",(()=>{this.routingActionCreator.navigateLogin()}))}applyStoreState(e){this.kontokorrentSelect.kontokorrents=Object.values(e.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",e.kontokorrents.activeKontokorrentId)}addServices(e){this.store=e.store,this.routingActionCreator=(0,r.b)(e),this.accountActionCreator=(0,v.gg)(e)}disconnectedCallback(){this.subscription()}}const S="app-bar";customElements.define(S,w)},527:(e,t,n)=>{"use strict";n.r(t),n.d(t,{KontokorrentPage:()=>de});var s=n(250),a=n.n(s),r=n(445),i=n(699),o=n(778),l=n(400),c=n.n(l);function h(e){var t,n,s,a,r=""+(2,n=(t=e.toString()).indexOf("E"),a=0,(s=t.indexOf("e"))>-1?(a=parseFloat(t.substring(s+1)),t=t.substring(0,s)):n>-1&&(a=parseFloat(t.substring(n+1)),t=t.substring(0,n)),Number(Math.round(Number(t+"e"+(a+2)))+"e-2")),i=r.toString().indexOf(".");return-1!=i&&1==r.toString().length-(i+1)&&(r+="0"),r}var u=n(317);const d="person-name",p="balance",k="balance-range",b=new u.a(c());class g extends HTMLElement{constructor(){super(),this.appendChild(b.get()),this.personNameElement=this.querySelector('[data-ref="person-name"]'),this.balanceTextElement=this.querySelector('[data-ref="balance-text"]'),this.balanceContainerElement=this.querySelector('[data-ref="balance-container"]'),this.barElement=this.querySelector('[data-ref="bar"]')}connectedCallback(){requestAnimationFrame((()=>{this.barElement.style.transform="scaleY(0)",this.updatesStyle()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.personName=this.getAttribute(d),this.balance=parseFloat(this.getAttribute(p)),this.balanceRange=Math.max(2,parseFloat(this.getAttribute(k))),this.updatesStyle()}static get observedAttributes(){return[d,p,k]}updatesStyle(){requestAnimationFrame((()=>{this.personNameElement.innerText=this.personName,this.balanceTextElement.innerText=h(this.balance);let e=Math.sign(this.balance)*Math.abs(this.balance)/this.balanceRange,t=1.9*e;this.barElement.style.transform=`scaleY(${e})`,this.balanceContainerElement.style.transform=Math.sign(this.balance)<0?`translateY(calc(${t}em - 150%))`:`translateY(calc(${t}em + 50%))`,e>0?(this.barElement.classList.add("balance-anzeige-element__bar--negative"),this.barElement.classList.remove("balance-anzeige-element__bar--positive")):(this.barElement.classList.remove("balance-anzeige-element__bar--negative"),this.barElement.classList.add("balance-anzeige-element__bar--positive"))}))}}customElements.define("balance-anzeige-element",g);var m=n(347),f=n.n(m),y=n(718);class v extends HTMLElement{constructor(){super(),this.innerHTML=f(),this.personenRenderer=new y.T(this,(e=>e.id),(e=>new g))}connectedCallback(){}disconnectedCallback(){}setBalance(e){this.personen=e,this.balanceRange=Math.max(...Object.values(e).map((e=>Math.abs(e.balance)))),this.updatesStyle()}updatesStyle(){this.personenRenderer.update(this.personen,((e,t)=>{e.setAttribute(d,t.name),e.setAttribute(p,""+t.balance),e.setAttribute(k,""+this.balanceRange)}))}}customElements.define("balance-anzeige",v);var w=n(2),S=n.n(w),E=n(723),z=n.n(E),_=n(1);const C="beschreibung",A="wert",L="bezahlende-person",M="empfaenger",T="status",x=new u.a(z());class q extends HTMLElement{constructor(){super(),this.attributeStore={beschreibung:null,bezahlendePerson:null,empfaenger:null,wert:null,status:null},this.appendChild(x.get()),this.beschreibungElement=this.querySelector('[data-ref="beschreibung"]'),this.bezahlendePersonElement=this.querySelector('[data-ref="bezahlende-person"]'),this.empfaengerElement=this.querySelector('[data-ref="empfaenger"]'),this.wertElement=this.querySelector('[data-ref="wert"]'),this.doneElement=this.querySelector('[data-ref="icon-done"]'),this.doneAllElement=this.querySelector('[data-ref="icon-done-all"]'),this.syncElement=this.querySelector('[data-ref="icon-sync"]')}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}checkChanged(e,t){let n=t();return this.attributeStore[e]!=n&&(this.attributeStore[e]=n,!0)}updateAttributes(){[this.checkChanged("bezahlendePerson",(()=>this.getAttribute(L))),this.checkChanged("beschreibung",(()=>this.getAttribute(C))),this.checkChanged("wert",(()=>parseFloat(this.getAttribute(A)))),this.checkChanged("empfaenger",(()=>this.getAttribute(M))),this.checkChanged("status",(()=>this.getAttribute(T)))].some((e=>e))&&this.updatesStyle()}static get observedAttributes(){return[C,L,A,M,T]}updatesStyle(){this.beschreibungElement.innerText=this.attributeStore.beschreibung,this.bezahlendePersonElement.innerText=this.attributeStore.bezahlendePerson,this.wertElement.innerText=h(this.attributeStore.wert),this.empfaengerElement.innerText=this.attributeStore.empfaenger,this.doneAllElement.style.display=this.attributeStore.status==_.Z.Gespeichert?"inline":"none",this.doneElement.style.display=this.attributeStore.status==_.Z.Zwischengespeichert?"inline":"none",this.syncElement.style.display=this.attributeStore.status==_.Z.Speichern?"inline":"none"}}function I(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}customElements.define("bezahlung-card",q);var D=n(13),N=n(882),B=n(119);function H(e,t){(0,N.Z)(1,arguments);var n=t||{},s=n.locale,a=s&&s.options&&s.options.weekStartsOn,r=null==a?0:I(a),i=null==n.weekStartsOn?r:I(n.weekStartsOn);if(!(i>=0&&i<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=(0,D.Z)(e),l=o.getDay(),c=(l<i?7:0)+l-i;return o.setDate(o.getDate()-c),o.setHours(0,0,0,0),o}function K(e,t){const n=new Map;return e.forEach((e=>{const s=e[t],a=n.get(s);a?a.push(e):n.set(s,[e])})),n}var O=n(989),P=n.n(O);class Z extends HTMLElement{constructor(){super(),this.innerHTML=P(),this.container=this.querySelector('[data-ref="container"]'),this.titleElement=this.querySelector('[data-ref="title"]'),this.bezahlungenRenderer=new y.T(this.container,(e=>e.id),(e=>new q))}connectedCallback(){}disconnectedCallback(){}setBezahlungen(e){this.bezahlungenRenderer.update(e,((e,t)=>{e.setAttribute(C,t.beschreibung),e.setAttribute(A,""+t.wert),e.setAttribute(L,t.bezahlendePersonName),e.setAttribute(M,t.empfaenger),e.setAttribute(T,t.status)}))}set title(e){this.titleElement.innerText=e}}customElements.define("bezahlungen-group",Z);class j extends HTMLElement{constructor(){super(),this.minTage=3,this.minEintraege=20,this.all=!1,this.innerHTML=S(),this.bezahlungenContainer=this.querySelector("#bezahlungen-container"),this.showMoreButton=this.querySelector("#show-more"),this.showMoreClick=this.showMoreClick.bind(this),this.groupRenderer=new y.T(this.bezahlungenContainer,(e=>""+e[0]),(()=>new Z))}connectedCallback(){this.showMoreButton.addEventListener("click",this.showMoreClick)}disconnectedCallback(){}setShowMoreButtonDisplay(){this.bezahlungen&&(this.showMoreButton.style.display=this.bezahlungen.length>this.anzahlEintraege?"inline":"none")}showMoreClick(){let e=this.bezahlungenContainer.lastElementChild;this.anzahlEintraege+=20,e&&e.scrollIntoView(),this.setShowMoreButtonDisplay()}formatEmpfaenger(e,t){return e.empfaengerIds.length==t.length?"alle":e.empfaengerIds.map((e=>t.find((t=>t.id==e)).name)).join(", ")}setBezahlungen(e,t){this.bezahlungen=e,this.personen=t,this.setShowMoreButtonDisplay(),this.render()}render(){let e=this.bezahlungen.sort(((e,t)=>+t.zeitpunkt-+e.zeitpunkt)),t=e;this.all||(t=e.filter((e=>e.zeitpunkt>function(e,t){(0,N.Z)(2,arguments);var n=(0,D.Z)(e),s=I(t);return isNaN(s)?new Date(NaN):s?(n.setDate(n.getDate()+s),n):n}((0,B.Z)(Date.now()),-this.minTage))),t.length<this.minEintraege&&(t=e.slice(0,this.minEintraege)));let n=t.map((e=>({bezahlendePersonName:this.personen.find((t=>t.id==e.bezahlendePersonId)).name,wert:e.wert,beschreibung:e.beschreibung,empfaenger:this.formatEmpfaenger(e,this.personen),tag:+(0,B.Z)(e.zeitpunkt),id:e.id,woche:+H(e.zeitpunkt),status:e.status}))),s=!1,a=Array.of(...K(n,"tag").entries());a.reduce(((e,t)=>e+t[1].length),0)/a.length<3&&(a=Array.of(...K(n,"woche").entries()),s=!0);let r=a.sort(((e,t)=>t[0]-e[0]));this.groupRenderer.update(r,((e,t)=>{e.setBezahlungen(t[1]),e.title=s?this.formatWeek(new Date(t[0])):this.formatDay(new Date(t[0]))}))}get anzahlEintraege(){return this.minEintraege}set anzahlEintraege(e){this.minEintraege=e,this.render()}formatWeek(e){let t,n=function(e,t){(0,N.Z)(1,arguments);var n=t||{},s=n.locale,a=s&&s.options&&s.options.weekStartsOn,r=null==a?0:I(a),i=null==n.weekStartsOn?r:I(n.weekStartsOn);if(!(i>=0&&i<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=(0,D.Z)(e),l=o.getDay(),c=6+(l<i?-7:0)-(l-i);return o.setDate(o.getDate()+c),o.setHours(23,59,59,999),o}(e);const s=e=>new Intl.DateTimeFormat(["de-AT"],{day:"numeric",month:"long"}).format(e);return t=n.getMonth()==e.getMonth()?`${new Intl.DateTimeFormat(["de-AT"],{day:"numeric"}).format(e)}. - ${s(n)}`:`${s(e)} - ${s(n)}`,t}formatDay(e){return new Intl.DateTimeFormat(["de-AT"],{weekday:"short",year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}}customElements.define("bezahlungen-view",j);const R=Symbol("Comlink.proxy"),F=Symbol("Comlink.endpoint"),W=Symbol("Comlink.releaseProxy"),G=Symbol("Comlink.thrown"),$=e=>"object"==typeof e&&null!==e||"function"==typeof e,Y=new Map([["proxy",{canHandle:e=>$(e)&&e[R],serialize(e){const{port1:t,port2:n}=new MessageChannel;return V(e,t),[n,[n]]},deserialize:e=>(e.start(),X(e))}],["throw",{canHandle:e=>$(e)&&G in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function V(e,t=self){t.addEventListener("message",(function n(s){if(!s||!s.data)return;const{id:a,type:r,path:i}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(se);let l;try{const t=i.slice(0,-1).reduce(((e,t)=>e[t]),e),n=i.reduce(((e,t)=>e[t]),e);switch(r){case 0:l=n;break;case 1:t[i.slice(-1)[0]]=se(s.data.value),l=!0;break;case 2:l=n.apply(t,o);break;case 3:l=function(e){return Object.assign(e,{[R]:!0})}(new n(...o));break;case 4:{const{port1:t,port2:n}=new MessageChannel;V(e,n),l=function(e,t){return te.set(e,t),e}(t,[t])}break;case 5:l=void 0}}catch(e){l={value:e,[G]:0}}Promise.resolve(l).catch((e=>({value:e,[G]:0}))).then((e=>{const[s,i]=ne(e);t.postMessage(Object.assign(Object.assign({},s),{id:a}),i),5===r&&(t.removeEventListener("message",n),U(t))}))})),t.start&&t.start()}function U(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function X(e,t){return Q(e,[],t)}function J(e){if(e)throw new Error("Proxy has been released and is not useable")}function Q(e,t=[],n=function(){}){let s=!1;const a=new Proxy(n,{get(n,r){if(J(s),r===W)return()=>ae(e,{type:5,path:t.map((e=>e.toString()))}).then((()=>{U(e),s=!0}));if("then"===r){if(0===t.length)return{then:()=>a};const n=ae(e,{type:0,path:t.map((e=>e.toString()))}).then(se);return n.then.bind(n)}return Q(e,[...t,r])},set(n,a,r){J(s);const[i,o]=ne(r);return ae(e,{type:1,path:[...t,a].map((e=>e.toString())),value:i},o).then(se)},apply(n,a,r){J(s);const i=t[t.length-1];if(i===F)return ae(e,{type:4}).then(se);if("bind"===i)return Q(e,t.slice(0,-1));const[o,l]=ee(r);return ae(e,{type:2,path:t.map((e=>e.toString())),argumentList:o},l).then(se)},construct(n,a){J(s);const[r,i]=ee(a);return ae(e,{type:3,path:t.map((e=>e.toString())),argumentList:r},i).then(se)}});return a}function ee(e){const t=e.map(ne);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const te=new WeakMap;function ne(e){for(const[t,n]of Y)if(n.canHandle(e)){const[s,a]=n.serialize(e);return[{type:3,name:t,value:s},a]}return[{type:0,value:e},te.get(e)||[]]}function se(e){switch(e.type){case 3:return Y.get(e.name).deserialize(e.value);case 0:return e.value}}function ae(e,t,n){return new Promise((s=>{const a=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===a&&(e.removeEventListener("message",t),s(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:a},t),n)}))}class re{constructor(e){this.id=e,this.type=14}}class ie{constructor(e,t){this.kontokorrentId=e,this.bezahlungen=t,this.type=15}}class oe{constructor(e){this.kontokorrentId=e,this.type=16}}class le{constructor(e){this.kontokorrentId=e,this.type=19}}class ce{constructor(e,t){this.kontokorrentId=e,this.balance=t,this.type=17}}class he{constructor(e,t,n){this.store=e,this.apiClient=t,this.db=n}async refreshBezahlungen(e){let t=function(e){let t={},n=e.sort(((e,t)=>e.laufendeNummer-t.laufendeNummer));for(let e of n)e.bearbeiteteBezahlungId&&delete t[e.bearbeiteteBezahlungId],e.geloeschteBezahlungId?delete t[e.geloeschteBezahlungId]:t[e.bezahlung.id]=e.bezahlung;return Object.values(t)}(await this.db.getAktionen(e)).map((e=>Object.assign(Object.assign({},e),{status:_.Z.Gespeichert}))),n=(await this.db.getZwischengespeicherteBezahlungenForKontokorrent(e)).map((e=>({status:_.Z.Zwischengespeichert,beschreibung:e.beschreibung,bezahlendePersonId:e.bezahlendePersonId,empfaengerIds:e.empfaengerIds,id:e.id,wert:e.wert,zeitpunkt:e.zeitpunkt})));this.store.dispatch(new ie(e,[...t,...n]))}async calculateBalance(e){let t=await(await this.getWorkerApi()).calculateBalance(e);this.store.dispatch(new ce(e,t))}async refreshKontokorrent(e){await Promise.all([this.refreshBezahlungen(e),this.calculateBalance(e)])}async kontokorrentSynchronisieren(e){this.store.dispatch(new oe(e));let t=await(await this.getWorkerApi()).getLaufendeNummer(e),n=await this.apiClient.getAktionen(e,t);n.success&&(await this.db.addAktionen(e,n.aktionen),n.aktionen.length>0&&await this.refreshKontokorrent(e)),this.store.dispatch(new le(e))}async getWorkerApi(){if(this.workerApi)return this.workerApi;const e=new Worker(new URL(n.p+n.u(726),n.b));return this.workerApi=X(e),this.workerApi}async kontokorrentOeffnen(e){if(null!=await this.db.getKontokorrent(e)){this.store.dispatch(new re(e));let t=[];t.push(this.db.setZuletztGesehenerKontokorrentId(e)),t.push(this.refreshKontokorrent(e)),t.push(this.kontokorrentSynchronisieren(e)),await Promise.all(t)}}}var ue=n(114);class de extends HTMLElement{constructor(){super(),this.innerHTML=a(),this.appBar=this.querySelector(o.W),this.balanceAnzeige=this.querySelector("#balance-anzeige"),this.bezahlungenView=this.querySelector("#bezahlungen-view"),this.kontokorrentSpinner=this.querySelector("#spinner")}addServices(e){this.store=e.store,this.routingActionCreator=(0,r.b)(e),this.kontokorrentActionCreator=function(e){return e.get("KontokorrentActionCreator",(e=>new he(e.store,e.apiClient,e.db)))}(e),this.kontokorrentListenActionCreator=(0,ue.d8)(e),this.appBar.addServices(e)}connectedCallback(){this.kontokorrentIdParameter||this.kontokorrentListenActionCreator.navigiereZuLetztGesehenem(!0),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.routingActionCreator.navigateKontokorrent(e.detail)})),(0,i.G)(this.querySelectorAll("#eintragen-desktop, #eintragen-mobile"),this.routingActionCreator),this.applyStoreState(this.store.state)}applyStoreState(e){this.kontokorrent=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId],this.kontokorrent&&(document.title=`${this.kontokorrent.name} - Kontokorrent`,this.kontokorrent.personen&&(this.balanceAnzeige.setBalance(this.kontokorrent.personen),this.bezahlungenView.setBezahlungen(this.kontokorrent.bezahlungen,this.kontokorrent.personen)),this.kontokorrentSpinner.style.display=this.kontokorrent.synchronisieren?"flex":"none")}setRouteParameters(e){this.kontokorrentActionCreator.kontokorrentOeffnen(e),this.kontokorrentIdParameter=e}disconnectedCallback(){this.subscription()}}customElements.define("kontokorrent-page",de)},699:(e,t,n)=>{"use strict";function s(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:()=>s})},414:(e,t,n)=>{"use strict";class s extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(e){"Escape"==e.key&&this.hide()}clickListener(e){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",s)},718:(e,t,n)=>{"use strict";n.d(t,{T:()=>s});class s{constructor(e,t,n){this.listElement=e,this.keySelector=t,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(e,t){let n=new Map,s=e=>n.get(e)||(()=>{let t=this.keySelector(e);return n.set(e,t),t})();for(let n of Array.from(this.listElement.children)){let a=n,r=e.find((e=>this.elementToKey.get(a)==s(e)));r?t(a,r):this.listElement.removeChild(a)}let a=null,r=new Map;for(let n of e){let e=s(n),i=this.keyToElement.get(e);i||(i=this.createElement(n),t(i,n),this.elementToKey.set(i,e)),r.set(e,i),null==a&&i!=this.listElement.firstElementChild?this.listElement.prepend(i):null!=a&&a.nextElementSibling!=i&&a.insertAdjacentElement("afterend",i),a=i}this.keyToElement=r}}},317:(e,t,n)=>{"use strict";n.d(t,{a:()=>s});class s{constructor(e){this.template=e}get(){return null==this.instance&&(this.instance=document.createElement("template"),this.instance.innerHTML=this.template),document.importNode(this.instance.content,!0)}}}}]);
//# sourceMappingURL=56b9992e677e8aea8600.bundle.js.map