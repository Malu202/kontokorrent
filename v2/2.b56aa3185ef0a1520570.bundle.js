(self.webpackJsonp=self.webpackJsonp||[]).push([[2],{33:function(t,e,n){"use strict";function o(t,e){t.forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),e.navigate(t.getAttribute("href"))})})}n.d(e,"a",(function(){return o}))},34:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));class o{constructor(t,e,n){this.listElement=t,this.keySelector=e,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(t,e){let n=new Map,o=t=>n.get(t)||(()=>{let e=this.keySelector(t);return n.set(t,e),e})();for(let n of Array.from(this.listElement.children)){let s=n,r=t.find(t=>this.elementToKey.get(s)==o(t));r?e(s,r):this.listElement.removeChild(s)}let s=null,r=new Map;for(let n of t){let t=o(n),i=this.keyToElement.get(t);i||(i=this.createElement(n),e(i,n),this.elementToKey.set(i,t)),r.set(t,i),null==s&&i!=this.listElement.firstElementChild?this.listElement.prepend(i):null!=s&&s.nextElementSibling!=i&&s.insertAdjacentElement("afterend",i),s=i}this.keyToElement=r}}},35:function(t,e,n){"use strict";class o extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(t){"Escape"==t.key&&this.hide()}clickListener(t){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",o)},36:function(t,e){t.exports='<header class=app-bar> <kontokorrent-select class=app-bar__kontokorrent-select></kontokorrent-select> <nav class=app-bar__links> <button id=logout-button class=app-bar__link title=Logout> <span class=material-icons> exit_to_app </span> </button> <a href=info class=app-bar__link title="Informationen über diese App"> <span class=material-icons> info </span> </a> </nav> </header> <app-popup id=logout-dialog> <div class=dialog__backdrop></div> <div class=dialog> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class=dialog__button-pane> <button id=abort-logout class=button>Abbrechen</button> <button id=confirm-logout class=button>Ausloggen</button> </div> </div> </app-popup>'},37:function(t,e,n){},38:function(t,e){t.exports='<div class=kontokorrent-select-wrapper> <div class=kontokorrent-select> <h1 data-ref=kontokorrent-name class=kontokorrent-select__name>Kontokorrent</h1> <button class=kontokorrent-select__choose title="anderen Kontokorrent wählen"> <span class=material-icons> arrow_drop_down </span> </button> </div> <app-popup class=kontokorrent-select__popup> <kontokorrent-select-list></kontokorrent-select-list> <div class=kontokorrent-select__buttons> <button id=add-kontokorrent class=button>weiteren hinzufügen</button> </div> </app-popup> </div>'},39:function(t,e,n){},40:function(t,e){t.exports="<ol data-ref=list class=kontokorrent-select-list> </ol>"},41:function(t,e,n){},42:function(t,e){t.exports="<a data-ref=link class=kontokorrent-select-list__entry> <span data-ref=name></span> </a>"},43:function(t,e,n){"use strict";n.d(e,"a",(function(){return E}));var o=n(36),s=n.n(o),r=(n(37),n(1)),i=n(33),a=n(38),c=n.n(a),l=(n(39),n(40)),u=n.n(l),k=(n(41),n(9)),h=n(34),d=n(42),p=n.n(d);class b extends HTMLElement{constructor(){super(),this.innerHTML=p.a,this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.clickEvent=this.clickEvent.bind(this)}connectedCallback(){this.link.addEventListener("click",this.clickEvent)}clickEvent(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(t,e){this.kontokorrent=t,this.name.innerText=t.name,this.link.href="kontokorrents/"+t.id,this.link.classList.toggle("kontokorrent-select-list__entry--active",e)}}customElements.define("kontokorrent-select-list-entry",b);class v extends HTMLElement{constructor(){super(),this.innerHTML=u.a,this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new h.a(this.list,t=>t.id,()=>{let t=document.createElement("li");return t.appendChild(new b),t})}connectedCallback(){}disconnectedCallback(){}update(){this.kontokorrentsRenderer.update(this._kontokorrents,(t,e)=>{t.firstChild.update(e,this._activeKontokorrentId==e.id)})}set kontokorrents(t){this._kontokorrents=Object(k.a)(t,t=>t.name),this.update()}set activeKontokorrentId(t){this._activeKontokorrentId=t,this.update()}}customElements.define("kontokorrent-select-list",v);n(35);class f extends HTMLElement{constructor(){super(),this.innerHTML=c.a,this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector("kontokorrent-select-list"),this.addButton=this.querySelector("#add-kontokorrent"),this._kontokorrents=null}connectedCallback(){this.popup=this.querySelector("app-popup"),this.updateAttributes(),this.addEventListener("click",t=>{this.popup.contains(event.target)||(this.popup.toggle(),t.stopPropagation())}),this.addButton.addEventListener("click",t=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))}),this.kontokorrentSelectList.addEventListener("gotokontokorrent",()=>{this.popup.hide()})}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(t){this.kontokorrentSelectList.kontokorrents=t,this._kontokorrents=t,this.updatesStyle()}updatesStyle(){if(this._kontokorrents&&this._kontokorrents.length){let t=this._kontokorrents.find(t=>t.id==this.activeKontokorrentId);this.kontokorrentName.innerText=t?t.name:"(Kontokorrent wählen)"}}}customElements.define("kontokorrent-select",f);var g=n(7),m=function(t,e,n,o){return new(n||(n=Promise))((function(s,r){function i(t){try{c(o.next(t))}catch(t){r(t)}}function a(t){try{c(o.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((o=o.apply(t,e||[])).next())}))};class y extends HTMLElement{constructor(){super(),this.innerHTML=s.a,this.kontokorrentSelect=this.querySelector("kontokorrent-select"),this.logoutDialog=this.querySelector("#logout-dialog")}connectedCallback(){document.body.classList.add("body--app-bar"),this.querySelector("#logout-button").addEventListener("click",t=>{this.logoutDialog.toggle(),t.stopPropagation()}),this.querySelector("#confirm-logout").addEventListener("click",()=>m(this,void 0,void 0,(function*(){yield this.accountActionCreator.logout()}))),this.querySelector("#abort-logout").addEventListener("click",()=>{this.logoutDialog.hide()}),Object(i.a)(this.querySelectorAll("a"),this.routingActionCreator),this.subscription=this.store.subscribe(null,t=>this.applyStoreState(t)),this.applyStoreState(this.store.state),this.kontokorrentSelect.addEventListener("addkontokorrent",()=>{this.routingActionCreator.navigateLogin()})}applyStoreState(t){this.kontokorrentSelect.kontokorrents=Object.values(t.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",t.kontokorrents.activeKontokorrentId)}addServices(t){this.store=t.store,this.routingActionCreator=Object(r.a)(t),this.accountActionCreator=Object(g.a)(t)}disconnectedCallback(){document.body.classList.remove("body--app-bar"),this.subscription()}}const E="app-bar";customElements.define(E,y)},60:function(t,e){t.exports="<app-bar></app-bar> <a id=zurueck-zum-kontokorrent>zurück zum Kontokorrent</a>"},61:function(t,e,n){},67:function(t,e,n){"use strict";n.r(e),n.d(e,"BezahlungEintragenPage",(function(){return k}));var o=n(60),s=n.n(o),r=n(1),i=n(43),a=(n(61),function(t,e,n,o){return new(n||(n=Promise))((function(s,r){function i(t){try{c(o.next(t))}catch(t){r(t)}}function a(t){try{c(o.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((o=o.apply(t,e||[])).next())}))});class c{constructor(t){this.kontokorrentId=t,this.type=6}}class l{constructor(t,e){this.store=t,this.db=e}bezahlungEintragenGeoeffnet(){return a(this,void 0,void 0,(function*(){let t=this.store.state.kontokorrents.activeKontokorrentId||(yield this.db.getZuletztGesehenerKontokorrentId());this.store.dispatch(new c(t))}))}bezahlungEintragenKontokorrentChanged(t){return a(this,void 0,void 0,(function*(){this.store.dispatch(new c(t)),yield this.db.setZuletztGesehenerKontokorrentId(t)}))}}var u=n(33);class k extends HTMLElement{constructor(){super(),this.innerHTML=s.a,this.zurueckLink=this.querySelector("#zurueck-zum-kontokorrent"),this.appBar=this.querySelector(i.a)}addServices(t){this.store=t.store,this.routingActionCreator=Object(r.a)(t),this.bezahlungActionCreator=function(t){return t.get("BezahlungActionCreator",t=>new l(t.store,t.db))}(t),this.appBar.addServices(t)}connectedCallback(){this.subscription=this.store.subscribe("kontokorrents",t=>this.applyStoreState(t)),this.appBar.addEventListener("gotokontokorrent",t=>{this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(t.detail)}),this.bezahlungActionCreator.bezahlungEintragenGeoeffnet(),Object(u.a)([this.zurueckLink],this.routingActionCreator)}applyStoreState(t){this.zurueckLink.href=t.kontokorrents.activeKontokorrentId?"kontokorrents/"+t.kontokorrents.activeKontokorrentId:null}disconnectedCallback(){this.subscription()}}customElements.define("bezahlung-eintragen-page",k)}}]);
//# sourceMappingURL=2.b56aa3185ef0a1520570.bundle.js.map