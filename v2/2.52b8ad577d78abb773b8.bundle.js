(self.webpackJsonp=self.webpackJsonp||[]).push([[2],[,,,,,,,,,,,,,,,function(t,e,n){"use strict";function o(t,e){t.forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),e.navigate(t.getAttribute("href"))})})}n.d(e,"a",(function(){return o}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));class o{constructor(t,e,n){this.listElement=t,this.keySelector=e,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(t,e){let n=new Map,o=t=>n.get(t)||(()=>{let e=this.keySelector(t);return n.set(t,e),e})();for(let n of Array.from(this.listElement.children)){let s=n,r=t.find(t=>this.elementToKey.get(s)==o(t));r?e(s,r):this.listElement.removeChild(s)}let s=null,r=new Map;for(let n of t){let t=o(n),i=this.keyToElement.get(t);i||(i=this.createElement(n),e(i,n),this.elementToKey.set(i,t)),r.set(t,i),null==s&&i!=this.listElement.firstElementChild?this.listElement.prepend(i):null!=s&&s.nextElementSibling!=i&&s.insertAdjacentElement("afterend",i),s=i}this.keyToElement=r}}},function(t,e,n){"use strict";class o extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(t){"Escape"==t.key&&this.hide()}clickListener(t){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",o)},function(t,e){t.exports='<header class="app-bar"> <kontokorrent-select class="app-bar__kontokorrent-select"></kontokorrent-select> <nav class="app-bar__links"> <button id="logout-button" class="app-bar__link" title="Logout"> <span class="material-icons"> exit_to_app </span> </button> <a href="info" class="app-bar__link" title="Informationen über diese App"> <span class="material-icons"> info </span> </a> </nav> </header> <app-popup id="logout-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class="dialog__button-pane"> <button id="abort-logout" class="button">Abbrechen</button> <button id="confirm-logout" class="button">Ausloggen</button> </div> </div> </app-popup>'},function(t,e,n){},function(t,e){t.exports='<div class="kontokorrent-select-wrapper"> <div class="kontokorrent-select"> <h1 data-ref="kontokorrent-name" class="kontokorrent-select__name">Kontokorrent</h1> <button class="kontokorrent-select__choose" title="anderen Kontokorrent wählen"> <span class="material-icons"> arrow_drop_down </span> </button> </div> <app-popup class="kontokorrent-select__popup"> <kontokorrent-select-list></kontokorrent-select-list> <div class="kontokorrent-select__buttons"> <button id="add-kontokorrent" class="button">weiteren hinzufügen</button> </div> </app-popup> </div>'},function(t,e,n){},function(t,e){t.exports='<ol data-ref="list" class="kontokorrent-select-list"> </ol>'},function(t,e,n){},function(t,e){t.exports='<a data-ref="link" class="kontokorrent-select-list__entry"> <span data-ref="name"></span> </a>'},,function(t,e,n){"use strict";n.d(e,"a",(function(){return E}));var o=n(18),s=n.n(o),r=(n(19),n(1)),i=n(15),a=n(20),l=n.n(a),c=(n(21),n(22)),h=n.n(c),u=(n(23),n(7)),d=n(16),k=n(24),p=n.n(k);class b extends HTMLElement{constructor(){super(),this.innerHTML=p.a,this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.clickEvent=this.clickEvent.bind(this)}connectedCallback(){this.link.addEventListener("click",this.clickEvent)}clickEvent(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(t,e){this.kontokorrent=t,this.name.innerText=t.name,this.link.href="kontokorrents/"+t.id,this.link.classList.toggle("kontokorrent-select-list__entry--active",e)}}customElements.define("kontokorrent-select-list-entry",b);class f extends HTMLElement{constructor(){super(),this.innerHTML=h.a,this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new d.a(this.list,t=>t.id,()=>{let t=document.createElement("li");return t.appendChild(new b),t})}connectedCallback(){}disconnectedCallback(){}update(){this.kontokorrentsRenderer.update(this._kontokorrents,(t,e)=>{t.firstChild.update(e,this._activeKontokorrentId==e.id)})}set kontokorrents(t){this._kontokorrents=Object(u.a)(t,t=>t.name),this.update()}set activeKontokorrentId(t){this._activeKontokorrentId=t,this.update()}}customElements.define("kontokorrent-select-list",f);n(17);class g extends HTMLElement{constructor(){super(),this.innerHTML=l.a,this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector("kontokorrent-select-list"),this.addButton=this.querySelector("#add-kontokorrent"),this._kontokorrents=null}connectedCallback(){this.popup=this.querySelector("app-popup"),this.updateAttributes(),this.addEventListener("click",t=>{this.popup.contains(event.target)||(this.popup.toggle(),t.stopPropagation())}),this.addButton.addEventListener("click",t=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))}),this.kontokorrentSelectList.addEventListener("gotokontokorrent",()=>{this.popup.hide()})}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(t){this.kontokorrentSelectList.kontokorrents=t,this._kontokorrents=t,this.updatesStyle()}updatesStyle(){if(this._kontokorrents&&this._kontokorrents.length){let t=this._kontokorrents.find(t=>t.id==this.activeKontokorrentId);this.kontokorrentName.innerText=t?t.name:"(Kontokorrent wählen)"}}}customElements.define("kontokorrent-select",g);var v=n(6),m=function(t,e,n,o){return new(n||(n=Promise))((function(s,r){function i(t){try{l(o.next(t))}catch(t){r(t)}}function a(t){try{l(o.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}l((o=o.apply(t,e||[])).next())}))};class y extends HTMLElement{constructor(){super(),this.innerHTML=s.a,this.kontokorrentSelect=this.querySelector("kontokorrent-select"),this.logoutDialog=this.querySelector("#logout-dialog")}connectedCallback(){this.querySelector("#logout-button").addEventListener("click",t=>{this.logoutDialog.toggle(),t.stopPropagation()}),this.querySelector("#confirm-logout").addEventListener("click",()=>m(this,void 0,void 0,(function*(){yield this.accountActionCreator.logout()}))),this.querySelector("#abort-logout").addEventListener("click",()=>{this.logoutDialog.hide()}),Object(i.a)(this.querySelectorAll("a"),this.routingActionCreator),this.subscription=this.store.subscribe(null,t=>this.applyStoreState(t)),this.applyStoreState(this.store.state),this.kontokorrentSelect.addEventListener("addkontokorrent",()=>{this.routingActionCreator.navigateLogin()})}applyStoreState(t){this.kontokorrentSelect.kontokorrents=Object.values(t.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",t.kontokorrents.activeKontokorrentId)}addServices(t){this.store=t.store,this.routingActionCreator=Object(r.a)(t),this.accountActionCreator=Object(v.a)(t)}disconnectedCallback(){this.subscription()}}const E="app-bar";customElements.define(E,y)},,,,,,,,,,,,,,,,,,,,,function(t,e){t.exports='<app-bar></app-bar> <div class="bezahlungen-page-menu"> <a id="zurueck-zum-kontokorrent" class="button"> <span class="material-icons"> arrow_back </span> zurück </a> <button class="button" title="speichern"> <span class="material-icons"> save </span> speichern </button> </div> <div class="bezahlungen-page__form-container"> <bezahlung-eintragen-form> </bezahlung-eintragen-form> </div>'},function(t,e,n){},function(t,e){t.exports='<form novalidate class="bezahlung-eintragen-form"> <label for="betrag" class="bezahlung-eintragen-form__label">Betrag</label> <input name="betrag" id="betrag" type="number" novalidate step="any"> <label for="zahlende-person" class="bezahlung-eintragen-form__label">Diese Person zahlt</label> <div id="zahlende-person-auswahl"></div> <label for="empfaenger" class="bezahlung-eintragen-form__label">für diese Personen</label> TODO checkboxen <label for="betreff" class="bezahlung-eintragen-form__label">Betreff</label> <input name="betreff" id="betreff" required="" type="text"> </form>'},function(t,e,n){},function(t,e){t.exports='<input type="radio" class="bezahlende-person-radio__input"/> <label class="bezahlende-person-radio"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/> </svg> <span data-ref="label"></span> </label>'},function(t,e,n){},,,,function(t,e,n){"use strict";n.r(e),n.d(e,"BezahlungEintragenPage",(function(){return v}));var o=n(47),s=n.n(o),r=n(1),i=n(26),a=(n(48),function(t,e,n,o){return new(n||(n=Promise))((function(s,r){function i(t){try{l(o.next(t))}catch(t){r(t)}}function a(t){try{l(o.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}l((o=o.apply(t,e||[])).next())}))});class l{constructor(t){this.kontokorrentId=t,this.type=6}}class c{constructor(t,e){this.store=t,this.db=e}bezahlungEintragenGeoeffnet(){return a(this,void 0,void 0,(function*(){let t=this.store.state.kontokorrents.activeKontokorrentId||(yield this.db.getZuletztGesehenerKontokorrentId());this.store.dispatch(new l(t))}))}bezahlungEintragenKontokorrentChanged(t){return a(this,void 0,void 0,(function*(){this.store.dispatch(new l(t)),yield this.db.setZuletztGesehenerKontokorrentId(t)}))}}var h=n(15),u=n(49),d=n.n(u),k=(n(50),n(16)),p=n(51),b=n.n(p);n(52);class f extends HTMLElement{constructor(){super(),this.innerHTML=b.a,this.input=this.querySelector("input"),this.personLabel=this.querySelector('[data-ref="label"]'),this.label=this.querySelector("label")}connectedCallback(){}disconnectedCallback(){}set radioName(t){this.input.name=t}set person(t){this.input.value=t.id,this.personLabel.innerText=t.name,this.input.id=t.id,this.label.setAttribute("for",t.id)}}customElements.define("bezahlende-person-radio-button",f);class g extends HTMLElement{constructor(){super(),this.innerHTML=d.a,this.zahlendePersonRenderer=new k.a(this.querySelector("#zahlende-person-auswahl"),t=>t.id,t=>new f)}connectedCallback(){}disconnectedCallback(){}set personen(t){this.zahlendePersonRenderer.update(t,(t,e)=>{t.person=e,t.radioName="bezahlende-person"})}}customElements.define("bezahlung-eintragen-form",g);class v extends HTMLElement{constructor(){super(),this.innerHTML=s.a,this.zurueckLink=this.querySelector("#zurueck-zum-kontokorrent"),this.appBar=this.querySelector(i.a),this.bezahlungEintragenForm=this.querySelector("bezahlung-eintragen-form")}addServices(t){this.store=t.store,this.routingActionCreator=Object(r.a)(t),this.bezahlungActionCreator=function(t){return t.get("BezahlungActionCreator",t=>new c(t.store,t.db))}(t),this.appBar.addServices(t)}connectedCallback(){this.subscription=this.store.subscribe("kontokorrents",t=>this.applyStoreState(t)),this.appBar.addEventListener("gotokontokorrent",t=>{this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(t.detail)}),this.bezahlungActionCreator.bezahlungEintragenGeoeffnet(),Object(h.a)([this.zurueckLink],this.routingActionCreator),this.applyStoreState(this.store.state)}applyStoreState(t){this.zurueckLink.href=t.kontokorrents.activeKontokorrentId?"kontokorrents/"+t.kontokorrents.activeKontokorrentId:null,t.kontokorrents.activeKontokorrentId&&(this.bezahlungEintragenForm.personen=t.kontokorrents.kontokorrents[t.kontokorrents.activeKontokorrentId].personen)}disconnectedCallback(){this.subscription()}}customElements.define("bezahlung-eintragen-page",v)}]]);
//# sourceMappingURL=2.52b8ad577d78abb773b8.bundle.js.map