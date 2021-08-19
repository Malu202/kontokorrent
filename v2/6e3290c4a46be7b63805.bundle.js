"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[824],{7160:function(t,e,n){n.d(e,{W:function(){return k}});var o=n(9773),s=n(1173),i=n(6029);class r extends HTMLElement{constructor(){super(),this.rendered=!1,this.isActive=!1}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<a data-ref="link" class="kontokorrent-select-list__entry"> <span data-ref="name"></span> </a>',this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.updateStyle()),this.clickEvent=this.clickEvent.bind(this),this.link.addEventListener("click",this.clickEvent)}clickEvent(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(t,e){this.kontokorrent=t,this.isActive=e,this.updateStyle()}updateStyle(){this.rendered&&this.kontokorrent&&(this.name.innerText=this.kontokorrent.name,this.link.href="kontokorrents/".concat(this.kontokorrent.id),this.link.classList.toggle("kontokorrent-select-list__entry--active",this.isActive))}}customElements.define("kontokorrent-select-list-entry",r);class a extends HTMLElement{constructor(){super(),this.rendered=!1}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<ol data-ref="list" class="kontokorrent-select-list"> </ol>',this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new i.T(this.list,(t=>t.id),(()=>{let t=document.createElement("li");return t.appendChild(new r),t})),this.update())}disconnectedCallback(){}update(){this.rendered&&this.kontokorrentsRenderer.update(this._kontokorrents,((t,e)=>{t.firstChild.update(e,this._activeKontokorrentId==e.id)}))}set kontokorrents(t){this._kontokorrents=(0,s.T)(t,(t=>t.name)),this.update()}set activeKontokorrentId(t){this._activeKontokorrentId=t,this.update()}}const c="kontokorrent-select-list";customElements.define(c,a),n(4227);class l extends HTMLElement{constructor(){super(),this._kontokorrents=null,this.rendered=!1}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<div class="kontokorrent-select-wrapper"> <div class="kontokorrent-select"> <h1 data-ref="kontokorrent-name" class="kontokorrent-select__name">Kontokorrent</h1> <button class="kontokorrent-select__choose" title="anderen Kontokorrent wählen"> <span class="material-icons"> arrow_drop_down </span> </button> </div> <app-popup class="kontokorrent-select__popup"> <kontokorrent-select-list></kontokorrent-select-list> <div class="kontokorrent-select__buttons"> <button id="add-kontokorrent" class="button">weiteren hinzufügen</button> </div> </app-popup> </div>',this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector(c),this.addButton=this.querySelector("#add-kontokorrent"),this.popup=this.querySelector("app-popup")),this.updateAttributes(),this.addEventListener("click",(t=>{this.popup.contains(event.target)||(this.popup.toggle(),t.stopPropagation())})),this.addButton.addEventListener("click",(t=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))})),this.kontokorrentSelectList.addEventListener("gotokontokorrent",(()=>{this.popup.hide()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(t){this.kontokorrentSelectList.kontokorrents=t,this._kontokorrents=t,this.updatesStyle()}updatesStyle(){if(this.rendered&&this._kontokorrents&&this._kontokorrents.length){let t=this._kontokorrents.find((t=>t.id==this.activeKontokorrentId));t?(this.kontokorrentName.innerText=t.name,this.kontokorrentName.classList.remove("kontokorrent-select__name--unselected")):(this.kontokorrentName.innerText="(Kontokorrent wählen)",this.kontokorrentName.classList.add("kontokorrent-select__name--unselected"))}}}const h="kontokorrent-select";customElements.define(h,l);var d=n(2887);class u extends HTMLElement{constructor(){super(),this.rendered=!1}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<header class="app-bar"> <kontokorrent-select class="app-bar__kontokorrent-select"></kontokorrent-select> <nav class="app-bar__links"> <button id="logout-button" class="app-bar__link" title="Logout"> <span class="material-icons"> exit_to_app </span> </button> <a href="info" class="app-bar__link" title="Informationen über diese App"> <span class="material-icons"> info </span> </a> </nav> </header> <app-popup id="logout-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class="dialog__button-pane"> <button id="abort-logout" class="button">Abbrechen</button> <button id="confirm-logout" class="button">Ausloggen</button> </div> </div> </app-popup>',this.kontokorrentSelect=this.querySelector(h),this.logoutDialog=this.querySelector("#logout-dialog"),this.store&&this.applyStoreState(this.store.state)),this.querySelector("#logout-button").addEventListener("click",(t=>{this.logoutDialog.toggle(),t.stopPropagation()})),this.querySelector("#confirm-logout").addEventListener("click",(async()=>{await this.accountActionCreator.logout()})),this.querySelector("#abort-logout").addEventListener("click",(()=>{this.logoutDialog.hide()})),this.querySelectorAll("a").forEach((t=>{t.addEventListener("click",(e=>{e.preventDefault(),this.routingActionCreator.navigate(t.getAttribute("href"))}))})),this.kontokorrentSelect.addEventListener("addkontokorrent",(()=>{this.routingActionCreator.navigateLogin()}))}applyStoreState(t){this.rendered&&(this.kontokorrentSelect.kontokorrents=Object.values(t.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",t.kontokorrents.activeKontokorrentId))}addServices(t){this.store=t.store,this.routingActionCreator=(0,o.b)(t),this.accountActionCreator=(0,d.gg)(t),this.subscription=this.store.subscribe(null,(t=>this.applyStoreState(t))),this.applyStoreState(this.store.state)}disconnectedCallback(){this.subscription&&(this.subscription(),this.subscription=null)}}const k="app-bar";customElements.define(k,u)},2824:function(t,e,n){n.r(e),n.d(e,{KontokorrentNichtGefunden:function(){return a}}),n(3948),n(285);var o=n(6047),s=n(9773),i=n(7160),r=n(6604);class a extends HTMLElement{constructor(){super(),this.rendered=!1}addServices(t){this.store=t.store,this.routingActionCreator=(0,s.b)(t),this.kontokorrentHinzufuegenActionCreator=(0,r.Jj)(t),this.serviceLocator=t}connectedCallback(){if(!this.rendered){this.rendered=!0,this.innerHTML='<app-bar></app-bar> <div class="kontokorrent-hinzufuegen-section"> Möchtest du den öffentlichen Kontokorrent <strong><span id="oeffentlicher-name"></span></strong> hinzufügen? </div> <div class="kontokorrent-hinzufuegen-section"> <div id="notFoundError" class="alert alert--error" style="display:none">Kontokorrent wurde nicht gefunden</div> <button class="button button--raised" id="hinzufuegen-btn"> hinzufügen </button> </div> <div class="hinzufuegen__progress" id="hinzufuegen__progress"> <span class="spinner"></span> <span>wird hinzugefügt</span> </div>',this.oeffentlicherKontokorrentLabel=this.querySelector("#oeffentlicher-name"),this.hinzufuegenBtn=this.querySelector("#hinzufuegen-btn"),this.notFoundError=this.querySelector("#notFoundError"),this.processing=this.querySelector("#hinzufuegen__progress"),this.appBar=this.querySelector(i.W),this.appBar.addServices(this.serviceLocator);let t=new URLSearchParams(window.location.search);t.has(o.Cc)&&(this.oeffentlicherName=t.get(o.Cc),this.oeffentlicherKontokorrentLabel.innerText=this.oeffentlicherName)}this.appBar.addEventListener("gotokontokorrent",(async t=>{await this.routingActionCreator.navigateKontokorrentById(t.detail)})),this.hinzufuegenClickListener=()=>this.hinzufuegen(),this.hinzufuegenBtn.addEventListener("click",this.hinzufuegenClickListener),this.subscription=this.store.subscribe(null,(t=>this.applyStoreState(t))),this.applyStoreState(this.store.state),this.kontokorrentHinzufuegenActionCreator.nichtGefundenPageGeoeffnet()}async hinzufuegen(){let t=await this.kontokorrentHinzufuegenActionCreator.kontokorrentHinzufuegen(this.oeffentlicherName);t&&await this.routingActionCreator.navigateKontokorrentById(t)}applyStoreState(t){this.notFoundError.style.display=!t.kontokorrents.hinzufuegen&&t.kontokorrents.hinzufuegenFailed&&t.kontokorrents.hinzufuegenFailed.kontokorrentNotFound?"block":"none";let e=t.kontokorrents.hinzufuegen||t.account.accountCreating;this.processing.style.display=e?"flex":"none",this.hinzufuegenBtn.style.display=e?"none":"inline-flex"}disconnectedCallback(){this.subscription(),this.hinzufuegenBtn.removeEventListener("click",this.hinzufuegenClickListener)}}customElements.define("kontokorrent-nicht-gefunden",a)},4227:function(t,e,n){class o extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(t){"Escape"==t.key&&this.hide()}clickListener(t){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",o)},6604:function(t,e,n){n.d(e,{Jj:function(){return k}});var o=n(886);class s{constructor(t){this.exists=t,this.type=7}}class i{constructor(){this.type=8}}class r{constructor(t){this.kontokorrent=t,this.type=21}}class a{constructor(t){this.notFound=t,this.type=9}}class c{constructor(){this.type=10}}class l{constructor(t){this.kontokorrents=t,this.type=20}}class h{constructor(){this.type=18}}class d{constructor(){this.type=37}}class u{constructor(t,e,n){this.store=t,this.apiClient=e,this.db=n}loginPageGeoeffnet(){this.store.dispatch(new h)}nichtGefundenPageGeoeffnet(){this.store.dispatch(new d)}async kontokorrentErstellen(t,e,n,a){let c={name:e,id:t,oeffentlicherName:n,personen:a.map((t=>({name:t,id:(0,o.Z)()})))};this.store.dispatch(new i);let l=await this.apiClient.neuerKontokorrent(c);return l.success?(await this.db.addKontokorrent({id:t,name:e,personen:c.personen,oeffentlicherName:n}),this.store.dispatch(new r({id:t,name:e,personen:c.personen,oeffentlicherName:n})),!0):(this.store.dispatch(new s(l.exists)),!1)}async kontokorrentHinzufuegen(t){let e=await this.db.getPerOeffentlichName(t);if(null!=e)return e.id;this.store.dispatch(new c);try{let e=await this.apiClient.kontokorrentHinzufuegen(t,null);if(null!=e){let t=await this.db.setKontokorrents(e.map((t=>({id:t.id,name:t.name,personen:t.personen,oeffentlicherName:t.oeffentlicherName}))));return this.store.dispatch(new l(e)),t[0]}this.store.dispatch(new a(!0))}catch(t){this.store.dispatch(new a(!1))}return!1}}function k(t){return t.get("KontokorrentHinzufuegenActionCreator",(t=>new u(t.store,t.apiClient,t.db)))}},6029:function(t,e,n){n.d(e,{T:function(){return o}}),n(3948);class o{constructor(t,e,n){this.listElement=t,this.keySelector=e,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(t,e){let n=new Map,o=t=>n.get(t)||(()=>{let e=this.keySelector(t);return n.set(t,e),e})();for(let n of Array.from(this.listElement.children)){let s=n,i=t.find((t=>this.elementToKey.get(s)==o(t)));i?e(s,i):this.listElement.removeChild(s)}let s=null,i=new Map;for(let n of t){let t=o(n),r=this.keyToElement.get(t);r||(r=this.createElement(n),e(r,n),this.elementToKey.set(r,t)),i.set(t,r),null==s&&r!=this.listElement.firstElementChild?this.listElement.prepend(r):null!=s&&s.nextElementSibling!=r&&s.insertAdjacentElement("afterend",r),s=r}this.keyToElement=i}}}}]);
//# sourceMappingURL=6e3290c4a46be7b63805.bundle.js.map