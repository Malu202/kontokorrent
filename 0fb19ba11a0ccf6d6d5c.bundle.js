"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[215],{6215:function(e,t,n){n.r(t),n.d(t,{CreateKontokorrent:function(){return h}});var s=n(9773),r=n(2887);class i extends HTMLElement{constructor(){super(),this.rendered=!1}connectedCallback(){this.rendered||(this.innerHTML='<input type="text" id="name" placehoder="Name"/> <button id="remove" class="button"> <span class="material-icons"> delete </span> entfernen </button>',this.rendered=!0,this.removeButton=this.querySelector("#remove"),this.nameInput=this.querySelector("#name")),this.nameInput.addEventListener("change",(()=>{this.dispatchEvent(new Event("change"))})),this.removeButton.addEventListener("click",(()=>{this.dispatchEvent(new CustomEvent("onremove"))}))}get name(){return this.nameInput.value}disconnectedCallback(){}}const o="app-personen-listen-eintrag";customElements.define(o,i);class a extends HTMLElement{constructor(){super(),this.rendered=!1}get personen(){let e=[];return this.personenListe.querySelectorAll(o).forEach((t=>e.push(t.name))),e}connectedCallback(){this.rendered||(this.innerHTML='<ul id="personen-liste" class="mdc-list mdc-list--non-interactive"> </ul> <button type="button" class="button" id="add-person"> <span class="material-icons"> add </span> Person hinzufügen </button>',this.addPersonButton=this.querySelector("#add-person"),this.personenListe=this.querySelector("#personen-liste"),this.rendered=!0),this.addPersonButton.addEventListener("click",(()=>{let e=document.createElement("li"),t=new i;e.appendChild(t),this.personenListe.appendChild(e),t.querySelector("input").focus(),t.addEventListener("onremove",(()=>{this.personenListe.removeChild(e)}))}))}disconnectedCallback(){}}customElements.define("app-personen-liste",a);var c=n(886),l=n(6604),d=(n(4227),n(1480),n(2204));n(2545);class h extends HTMLElement{constructor(){super(),this.rendered=!1,this.kontokorrentId=(0,c.Z)()}addServices(e){this.store=e.store,this.routingActionCreator=(0,s.b)(e),this.accountActionCreator=(0,r.gg)(e),this.kontokorrentHinzufuegenActionCreator=(0,l.Jj)(e)}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<div class="create-event-box" id="create-event-box"> <h1>Gruppe erstellen</h1> <div id="empty-name-error" class="alert alert--error" style="display:none">Für alle Personen Namen angeben</div> <div id="person-count-error" class="alert alert--error" style="display:none">Mindestens zwei Personen angeben </div> <div id="event-create-error" class="alert alert--error" style="display:none">Kontokorrent konnte nicht erstellt werden</div> <div id="event-name-duplicate" class="alert alert--error" style="display:none">Ein Kontokorrent mit diesem Namen exisitert bereits</div> <div id="event-name-required-error" class="alert alert--error" style="display:none">Eventname angeben</div> <div id="event-name-error" class="alert alert--error" style="display:none">Name: Nur Groß-/Kleinbuchstaben (A-Z, a-z) und Zahlen</div> <div id="person-name-duplicate-error" class="alert alert--error" style="display:none">Personennamen müssen unterschiedlich sein</div> <div id="account-creation-failed" class="alert alert--error" style="display:none">Account konnte nicht erstellt werden</div> <label for="event-name" class="create-event-box__label">Anzeigename</label> <div class="create-event-box__input-with-tip"> <input type="text" id="event-name" name="event-name"> <tip-button popup-id="eventNameExplainer" title="Eventname erklärung"> <span class="material-icons"> info </span> </tip-button> <app-popup id="eventNameExplainer" class="tip tip--with-input"> Wie soll die Gruppe heißen? Groß- und Kleinbuchstaben (A-Z, a-z) sowie Zahlen sind erlaubt. Der Name wir auch zum Einloggen verwendet dabei wird Groß-/Kleinschreibung ignoriert. </app-popup> </div> <label class="create-event-box__label">Personen</label> <app-personen-liste id="personen-liste"></app-personen-liste> <div id="creating" class="create-event-box__processing"> <app-spinner> </app-spinner></div> <div> <button id="create-button" class="button">Erstellen</button> </div> <div> <a id="home-button" class="button" href=""> <span class="material-icons"> home </span> zurück </a> </div> </div>',this.personenListe=this.querySelector("#personen-liste"),this.emptyNameError=this.querySelector("#empty-name-error"),this.eventCreateError=this.querySelector("#event-create-error"),this.personCountError=this.querySelector("#person-count-error"),this.eventNameRequiredError=this.querySelector("#event-name-required-error"),this.eventNameError=this.querySelector("#event-name-error"),this.createButton=this.querySelector("#create-button"),this.eventName=this.querySelector("#event-name"),this.creating=this.querySelector("#creating"),this.eventNameDuplicate=this.querySelector("#event-name-duplicate"),this.accountCreationFailed=this.querySelector("#account-creation-failed"),this.personNameDuplicateError=this.querySelector("#person-name-duplicate-error")),this.createButton.addEventListener("click",this.createEvent.bind(this)),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.applyStoreState(this.store.state),(0,d.G)(this.querySelectorAll("a"),this.routingActionCreator)}async createEvent(){let e=this.eventName.value,t=this.personenListe.personen;this.eventNameRequiredError.style.display=e?"none":"block";let n=t.length>=2;this.personCountError.style.display=n?"none":"block";let s=t.some((e=>!e));this.emptyNameError.style.display=s?"block":"none";let r=(this.eventName.value||"").toLowerCase(),i=r&&!/^[a-z0-9]+$/.test(r);this.eventNameError.style.display=i?"block":"none";let o=t.some(((e,n)=>t.indexOf(e)!=n));this.personNameDuplicateError.style.display=o?"block":"none",!e||!n||s||i||o?document.scrollingElement.scroll({top:0,behavior:"smooth"}):await this.accountActionCreator.ensureAccount()&&await this.kontokorrentHinzufuegenActionCreator.kontokorrentErstellen(this.kontokorrentId,this.eventName.value,r,t)&&await this.routingActionCreator.navigateKontokorrentById(this.kontokorrentId)}applyStoreState(e){this.creating.style.display=e.kontokorrents.creating||e.account.accountCreating?"flex":"none",this.eventCreateError.style.display=e.kontokorrents.creationFailed?"block":"none",this.eventNameDuplicate.style.display=e.kontokorrents.creationFailed&&e.kontokorrents.creationFailed.exists?"block":"none",this.accountCreationFailed.style.display=!e.account.accountCreating&&e.account.accountCreationFailed?"block":"none"}disconnectedCallback(){this.subscription()}}customElements.define("app-create-event",h)},2545:function(){class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).innerHTML='<style>.spinner{animation:rotate 2s linear infinite;height:100%}.spinner .path{stroke:var(--spinner-color);stroke-linecap:round;animation:dash 1.5s ease-in-out infinite}@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}</style> <svg class="spinner" viewBox="0 0 50 50"> <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle> </svg>'}connectedCallback(){}disconnectedCallback(){}}customElements.define("app-spinner",e)},2204:function(e,t,n){function s(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:function(){return s}})},4227:function(e,t,n){class s extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(e){"Escape"==e.key&&this.hide()}clickListener(e){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",s)},1480:function(e,t,n){const s="popup-id";class r extends HTMLElement{constructor(){super(),this.clickListener=this.clickListener.bind(this)}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.popupId=this.getAttribute(s)}static get observedAttributes(){return[s]}connectedCallback(){this.addEventListener("click",this.clickListener)}clickListener(e){document.querySelector("#".concat(this.popupId)).toggle(),e.stopPropagation()}disconnectedCallback(){this.removeEventListener("click",this.clickListener)}}customElements.define("tip-button",r)},6604:function(e,t,n){n.d(t,{Jj:function(){return u}});var s=n(886);class r{constructor(e){this.exists=e,this.type=7}}class i{constructor(){this.type=8}}class o{constructor(e){this.kontokorrent=e,this.type=21}}class a{constructor(e){this.notFound=e,this.type=9}}class c{constructor(){this.type=10}}class l{constructor(e){this.kontokorrents=e,this.type=20}}class d{constructor(){this.type=18}}class h{constructor(){this.type=37}}class p{constructor(e,t,n){this.store=e,this.apiClient=t,this.db=n}loginPageGeoeffnet(){this.store.dispatch(new d)}nichtGefundenPageGeoeffnet(){this.store.dispatch(new h)}async kontokorrentErstellen(e,t,n,a){let c={name:t,id:e,oeffentlicherName:n,personen:a.map((e=>({name:e,id:(0,s.Z)()})))};this.store.dispatch(new i);let l=await this.apiClient.neuerKontokorrent(c);return l.success?(await this.db.addKontokorrent({id:e,name:t,personen:c.personen,oeffentlicherName:n}),this.store.dispatch(new o({id:e,name:t,personen:c.personen,oeffentlicherName:n})),!0):(this.store.dispatch(new r(l.exists)),!1)}async kontokorrentHinzufuegen(e){let t=await this.db.getPerOeffentlichName(e);if(null!=t)return t.id;this.store.dispatch(new c);try{let t=await this.apiClient.kontokorrentHinzufuegen(e,null);if(null!=t){let e=await this.db.setKontokorrents(t.map((e=>({id:e.id,name:e.name,personen:e.personen,oeffentlicherName:e.oeffentlicherName}))));return this.store.dispatch(new l(t)),e[0]}this.store.dispatch(new a(!0))}catch(e){this.store.dispatch(new a(!1))}return!1}}function u(e){return e.get("KontokorrentHinzufuegenActionCreator",(e=>new p(e.store,e.apiClient,e.db)))}}}]);
//# sourceMappingURL=0fb19ba11a0ccf6d6d5c.bundle.js.map