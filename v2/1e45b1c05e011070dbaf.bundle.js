(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[489],{4631:function(e,t,n){"use strict";n.r(t),n.d(t,{KontokorrentPage:function(){return Q}});var a=n(2477),s=n.n(a),r=n(9773),i=n(2204),o=n(426),l=n(4911),h=n.n(l);function c(e){var t,n,a,s,r=""+(2,n=(t=e.toString()).indexOf("E"),s=0,(a=t.indexOf("e"))>-1?(s=parseFloat(t.substring(a+1)),t=t.substring(0,a)):n>-1&&(s=parseFloat(t.substring(n+1)),t=t.substring(0,n)),Number(Math.round(Number(t+"e"+(s+2)))+"e-2")),i=r.toString().indexOf(".");return-1!=i&&1==r.toString().length-(i+1)&&(r+="0"),r}var u=n(5022);const d="person-name",b="balance",g="balance-range",p=new u.a(h());class m extends HTMLElement{constructor(){super(),this.appendChild(p.get()),this.personNameElement=this.querySelector('[data-ref="person-name"]'),this.balanceTextElement=this.querySelector('[data-ref="balance-text"]'),this.balanceContainerElement=this.querySelector('[data-ref="balance-container"]'),this.barElement=this.querySelector('[data-ref="bar"]')}connectedCallback(){requestAnimationFrame((()=>{this.barElement.style.transform="scaleY(0)",this.updatesStyle()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.personName=this.getAttribute(d),this.balance=parseFloat(this.getAttribute(b)),this.balanceRange=Math.max(2,parseFloat(this.getAttribute(g))),this.updatesStyle()}static get observedAttributes(){return[d,b,g]}updatesStyle(){requestAnimationFrame((()=>{this.personNameElement.innerText=this.personName,this.balanceTextElement.innerText=c(this.balance);let e=Math.sign(this.balance)*Math.abs(this.balance)/this.balanceRange,t=1.9*e;this.barElement.style.transform=`scaleY(${e})`,this.balanceContainerElement.style.transform=Math.sign(this.balance)<0?`translateY(calc(${t}em - 150%))`:`translateY(calc(${t}em + 50%))`,e>0?(this.barElement.classList.add("balance-anzeige-element__bar--negative"),this.barElement.classList.remove("balance-anzeige-element__bar--positive")):(this.barElement.classList.remove("balance-anzeige-element__bar--negative"),this.barElement.classList.add("balance-anzeige-element__bar--positive"))}))}}customElements.define("balance-anzeige-element",m);var k=n(2056),f=n.n(k),z=n(6029);class w extends HTMLElement{constructor(){super(),this.innerHTML=f(),this.personenRenderer=new z.T(this,(e=>e.id),(e=>new m))}connectedCallback(){}disconnectedCallback(){}setBalance(e){this.personen=e,this.balanceRange=Math.max(...Object.values(e).map((e=>Math.abs(e.balance)))),this.updatesStyle()}updatesStyle(){this.personenRenderer.update(this.personen,((e,t)=>{e.setAttribute(d,t.name),e.setAttribute(b,""+t.balance),e.setAttribute(g,""+this.balanceRange)}))}}customElements.define("balance-anzeige",w);var y=n(3920),v=n.n(y),S=n(8828),E=n.n(S),_=n(5075);const C="beschreibung",A="wert",x="bezahlende-person",M="empfaenger",T="status",B=new u.a(E());class I extends HTMLElement{constructor(){super(),this.attributeStore={beschreibung:null,bezahlendePerson:null,empfaenger:null,wert:null,status:null},this.appendChild(B.get()),this.beschreibungElement=this.querySelector('[data-ref="beschreibung"]'),this.bezahlendePersonElement=this.querySelector('[data-ref="bezahlende-person"]'),this.empfaengerElement=this.querySelector('[data-ref="empfaenger"]'),this.wertElement=this.querySelector('[data-ref="wert"]'),this.doneElement=this.querySelector('[data-ref="icon-done"]'),this.doneAllElement=this.querySelector('[data-ref="icon-done-all"]'),this.syncElement=this.querySelector('[data-ref="icon-sync"]')}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}checkChanged(e,t){let n=t();return this.attributeStore[e]!=n&&(this.attributeStore[e]=n,!0)}updateAttributes(){[this.checkChanged("bezahlendePerson",(()=>this.getAttribute(x))),this.checkChanged("beschreibung",(()=>this.getAttribute(C))),this.checkChanged("wert",(()=>parseFloat(this.getAttribute(A)))),this.checkChanged("empfaenger",(()=>this.getAttribute(M))),this.checkChanged("status",(()=>this.getAttribute(T)))].some((e=>e))&&this.updatesStyle()}static get observedAttributes(){return[C,x,A,M,T]}updatesStyle(){this.beschreibungElement.innerText=this.attributeStore.beschreibung,this.bezahlendePersonElement.innerText=this.attributeStore.bezahlendePerson,this.wertElement.innerText=c(this.attributeStore.wert),this.empfaengerElement.innerText=this.attributeStore.empfaenger,this.doneAllElement.style.display=this.attributeStore.status==_.Z.Gespeichert?"inline":"none",this.doneElement.style.display=this.attributeStore.status==_.Z.Zwischengespeichert?"inline":"none",this.syncElement.style.display=this.attributeStore.status==_.Z.Speichern?"inline":"none"}}function q(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}customElements.define("bezahlung-card",I);var L=n(4327),D=n(3682),N=n(9429);function Z(e,t){(0,D.Z)(1,arguments);var n=t||{},a=n.locale,s=a&&a.options&&a.options.weekStartsOn,r=null==s?0:q(s),i=null==n.weekStartsOn?r:q(n.weekStartsOn);if(!(i>=0&&i<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=(0,L.Z)(e),l=o.getDay(),h=(l<i?7:0)+l-i;return o.setDate(o.getDate()-h),o.setHours(0,0,0,0),o}function O(e,t){const n=new Map;return e.forEach((e=>{const a=e[t],s=n.get(a);s?s.push(e):n.set(a,[e])})),n}var P=n(5228),R=n.n(P);class H extends HTMLElement{constructor(){super(),this.innerHTML=R(),this.container=this.querySelector('[data-ref="container"]'),this.titleElement=this.querySelector('[data-ref="title"]'),this.bezahlungenRenderer=new z.T(this.container,(e=>e.id),(e=>new I))}connectedCallback(){}disconnectedCallback(){}setBezahlungen(e){this.bezahlungenRenderer.update(e,((e,t)=>{e.setAttribute(C,t.beschreibung),e.setAttribute(A,""+t.wert),e.setAttribute(x,t.bezahlendePersonName),e.setAttribute(M,t.empfaenger),e.setAttribute(T,t.status)}))}set title(e){this.titleElement.innerText=e}}customElements.define("bezahlungen-group",H);class F extends HTMLElement{constructor(){super(),this.minTage=3,this.minEintraege=20,this.all=!1,this.innerHTML=v(),this.bezahlungenContainer=this.querySelector("#bezahlungen-container"),this.showMoreButton=this.querySelector("#show-more"),this.showMoreClick=this.showMoreClick.bind(this),this.groupRenderer=new z.T(this.bezahlungenContainer,(e=>""+e[0]),(()=>new H))}connectedCallback(){this.showMoreButton.addEventListener("click",this.showMoreClick)}disconnectedCallback(){}setShowMoreButtonDisplay(){this.bezahlungen&&(this.showMoreButton.style.display=this.bezahlungen.length>this.anzahlEintraege?"inline":"none")}showMoreClick(){let e=this.bezahlungenContainer.lastElementChild;this.anzahlEintraege+=20,e&&e.scrollIntoView(),this.setShowMoreButtonDisplay()}formatEmpfaenger(e,t){return e.empfaengerIds.length==t.length?"alle":e.empfaengerIds.map((e=>t.find((t=>t.id==e)).name)).join(", ")}setBezahlungen(e,t){this.bezahlungen=e,this.personen=t,this.setShowMoreButtonDisplay(),this.render()}render(){let e=this.bezahlungen.sort(((e,t)=>+t.zeitpunkt-+e.zeitpunkt)),t=e;this.all||(t=e.filter((e=>e.zeitpunkt>function(e,t){(0,D.Z)(2,arguments);var n=(0,L.Z)(e),a=q(t);return isNaN(a)?new Date(NaN):a?(n.setDate(n.getDate()+a),n):n}((0,N.Z)(Date.now()),-this.minTage))),t.length<this.minEintraege&&(t=e.slice(0,this.minEintraege)));let n=t.map((e=>({bezahlendePersonName:this.personen.find((t=>t.id==e.bezahlendePersonId)).name,wert:e.wert,beschreibung:e.beschreibung,empfaenger:this.formatEmpfaenger(e,this.personen),tag:+(0,N.Z)(e.zeitpunkt),id:e.id,woche:+Z(e.zeitpunkt),status:e.status}))),a=!1,s=Array.of(...O(n,"tag").entries());s.reduce(((e,t)=>e+t[1].length),0)/s.length<3&&(s=Array.of(...O(n,"woche").entries()),a=!0);let r=s.sort(((e,t)=>t[0]-e[0]));this.groupRenderer.update(r,((e,t)=>{e.setBezahlungen(t[1]),e.title=a?this.formatWeek(new Date(t[0])):this.formatDay(new Date(t[0]))}))}get anzahlEintraege(){return this.minEintraege}set anzahlEintraege(e){this.minEintraege=e,this.render()}formatWeek(e){let t,n=function(e,t){(0,D.Z)(1,arguments);var n=t||{},a=n.locale,s=a&&a.options&&a.options.weekStartsOn,r=null==s?0:q(s),i=null==n.weekStartsOn?r:q(n.weekStartsOn);if(!(i>=0&&i<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var o=(0,L.Z)(e),l=o.getDay(),h=6+(l<i?-7:0)-(l-i);return o.setDate(o.getDate()+h),o.setHours(23,59,59,999),o}(e);const a=e=>new Intl.DateTimeFormat(["de-AT"],{day:"numeric",month:"long"}).format(e);return t=n.getMonth()==e.getMonth()?`${new Intl.DateTimeFormat(["de-AT"],{day:"numeric"}).format(e)}. - ${a(n)}`:`${a(e)} - ${a(n)}`,t}formatDay(e){return new Intl.DateTimeFormat(["de-AT"],{weekday:"short",year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}}customElements.define("bezahlungen-view",F);var K=n(2390);class G{constructor(e){this.id=e,this.type=14}}class ${constructor(e,t){this.kontokorrentId=e,this.bezahlungen=t,this.type=15}}class j{constructor(e){this.kontokorrentId=e,this.type=16}}class W{constructor(e){this.kontokorrentId=e,this.type=19}}class Y{constructor(e,t){this.kontokorrentId=e,this.balance=t,this.type=17}}class V{constructor(e,t,n,a){this.store=e,this.apiClient=t,this.db=n,this.workerService=a}async refreshBezahlungen(e){let t=function(e){let t={},n=e.sort(((e,t)=>e.laufendeNummer-t.laufendeNummer));for(let e of n)e.bearbeiteteBezahlungId&&delete t[e.bearbeiteteBezahlungId],e.geloeschteBezahlungId?delete t[e.geloeschteBezahlungId]:t[e.bezahlung.id]=e.bezahlung;return Object.values(t)}(await this.db.getAktionen(e)).map((e=>Object.assign(Object.assign({},e),{status:_.Z.Gespeichert}))),n=(await this.db.getZwischengespeicherteBezahlungenForKontokorrent(e)).map((e=>({status:_.Z.Zwischengespeichert,beschreibung:e.beschreibung,bezahlendePersonId:e.bezahlendePersonId,empfaengerIds:e.empfaengerIds,id:e.id,wert:e.wert,zeitpunkt:e.zeitpunkt})));this.store.dispatch(new $(e,[...t,...n]))}async calculateBalance(e){let t=await(await this.workerService.getWorker()).calculateBalance(e);this.store.dispatch(new Y(e,t))}async refreshKontokorrent(e){await Promise.all([this.refreshBezahlungen(e),this.calculateBalance(e)])}async kontokorrentSynchronisieren(e){this.store.dispatch(new j(e));let t=await(await this.workerService.getWorker()).getLaufendeNummer(e),n=await this.apiClient.getAktionen(e,t);n.success&&(await this.db.addAktionen(e,n.aktionen),n.aktionen.length>0&&await this.refreshKontokorrent(e)),this.store.dispatch(new W(e))}async kontokorrentOeffnen(e){if(null!=await this.db.getKontokorrent(e)){this.store.dispatch(new G(e));let t=[];t.push(this.db.setZuletztGesehenerKontokorrentId(e)),t.push(this.refreshKontokorrent(e)),t.push(this.kontokorrentSynchronisieren(e)),await Promise.all(t)}}}var J=n(1550);class Q extends HTMLElement{constructor(){super(),this.innerHTML=s(),this.appBar=this.querySelector(o.W),this.balanceAnzeige=this.querySelector("#balance-anzeige"),this.bezahlungenView=this.querySelector("#bezahlungen-view"),this.kontokorrentSpinner=this.querySelector("#spinner")}addServices(e){this.store=e.store,this.routingActionCreator=(0,r.b)(e),this.kontokorrentActionCreator=function(e){return e.get("KontokorrentActionCreator",(e=>new V(e.store,e.apiClient,e.db,(0,K.G)(e))))}(e),this.kontokorrentListenActionCreator=(0,J.d8)(e),this.appBar.addServices(e)}connectedCallback(){this.kontokorrentIdParameter||this.kontokorrentListenActionCreator.navigiereZuLetztGesehenem(!0),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.routingActionCreator.navigateKontokorrent(e.detail)})),(0,i.G)(this.querySelectorAll("#eintragen-desktop, #eintragen-mobile"),this.routingActionCreator),this.applyStoreState(this.store.state)}applyStoreState(e){this.kontokorrent=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId],this.kontokorrent&&(document.title=`${this.kontokorrent.name} - Kontokorrent`,this.kontokorrent.personen&&(this.balanceAnzeige.setBalance(this.kontokorrent.personen),this.bezahlungenView.setBezahlungen(this.kontokorrent.bezahlungen,this.kontokorrent.personen)),this.kontokorrentSpinner.style.display=this.kontokorrent.synchronisieren?"flex":"none")}setRouteParameters(e){this.kontokorrentActionCreator.kontokorrentOeffnen(e),this.kontokorrentIdParameter=e}disconnectedCallback(){this.subscription()}}customElements.define("kontokorrent-page",Q)},2056:function(e){e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},4911:function(e){e.exports='<div class="balance-anzeige-element__graphic-container"> <div class="balance-anzeige-element__bar" data-ref="bar"></div> <div class="balance-anzeige-element__horizontal-line"></div> <span class="balance-anzeige-element__balance" data-ref="balance-container"> <span data-ref="balance-text"></span>€ </span> </div> <div class="balance-anzeige-element__text-container"> <span data-ref="person-name" class="balance-anzeige-element__name"></span> </div>'},8828:function(e){e.exports='<div class="bezahlung-card__beschreibung"> <div data-ref="beschreibung"></div> <div class="bezahlung-card__personen"> <span data-ref="bezahlende-person"></span> für <span data-ref="empfaenger"></span> </div> </div> <div class="bezahlung-card__col2"> <div class="bezahlung-card__dummy"></div> <div class="bezahlung-card__wert"> <span data-ref="wert"></span>€ </div> <div class="bezahlung-card__status"> <span class="material-icons" data-ref="icon-done" style="display:none" title="lokal zwischengespeichert"> schedule </span> <span class="material-icons" data-ref="icon-done-all" style="display:none" title="synchronisiert"> done_all </span> <span class="material-icons" data-ref="icon-sync" style="display:none" title="synchronisieren..."> sync </span> </div> </div>'},5228:function(e){e.exports='<h3 data-ref="title" class="bezahlungen-group__title">Gruppe</h3> <div class="bezahlungen-group__container" data-ref="container"></div>'},3920:function(e){e.exports='<div id="bezahlungen-container"> </div> <button id="show-more" class="button">Mehr anzeigen</button>'},2477:function(e){e.exports='<app-bar></app-bar> <div style="display:none" id="login-expired">Google-Login abgelaufen: zum Synchronisieren neu anmelden</div> <balance-anzeige id="balance-anzeige"></balance-anzeige> <div class="kontokorrentpage-menu"> <a id="eintragen-desktop" class="floating-action-button floating-action-button--embed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a> <span class="kontokorrentpage-menu__sync-display" id="spinner" style="display:none"> <div class="spinner"></div> synchronisieren </span> </div> <bezahlungen-view id="bezahlungen-view"></bezahlungen-view> <a id="eintragen-mobile" class="floating-action-button floating-action-button--fixed" href="eintragen"> <span class="material-icons"> add </span> eintragen </a>'}}]);
//# sourceMappingURL=1e45b1c05e011070dbaf.bundle.js.map