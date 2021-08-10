"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[215],{6215:function(e,t,n){n.r(t),n.d(t,{CreateKontokorrent:function(){return d}});var i=n(9773),r=n(2887);class s extends HTMLElement{constructor(){super(),this.rendered=!1}connectedCallback(){this.rendered||(this.innerHTML='<input type="text" id="name" placehoder="Name"/> <button id="remove" class="button"> <span class="material-icons"> delete </span> entfernen </button>',this.rendered=!0,this.removeButton=this.querySelector("#remove"),this.nameInput=this.querySelector("#name")),this.nameInput.addEventListener("change",(()=>{this.dispatchEvent(new Event("change"))})),this.removeButton.addEventListener("click",(()=>{this.dispatchEvent(new CustomEvent("onremove"))}))}get name(){return this.nameInput.value}disconnectedCallback(){}}const o="app-personen-listen-eintrag";customElements.define(o,s);class a extends HTMLElement{constructor(){super(),this.rendered=!1}get personen(){let e=[];return this.personenListe.querySelectorAll(o).forEach((t=>e.push(t.name))),e}connectedCallback(){this.rendered||(this.innerHTML='<ul id="personen-liste" class="mdc-list mdc-list--non-interactive"> </ul> <button type="button" class="button" id="add-person"> <span class="material-icons"> add </span> Person hinzufügen </button>',this.addPersonButton=this.querySelector("#add-person"),this.personenListe=this.querySelector("#personen-liste"),this.rendered=!0),this.addPersonButton.addEventListener("click",(()=>{let e=document.createElement("li"),t=new s;e.appendChild(t),this.personenListe.appendChild(e),t.addEventListener("onremove",(()=>{this.personenListe.removeChild(e)}))}))}disconnectedCallback(){}}customElements.define("app-personen-liste",a);var l=n(886),c=n(6604),h=(n(4227),n(1480),n(2204));class d extends HTMLElement{constructor(){super(),this.innerHTML='<div class="create-event-box" id="create-event-box"> <h1>Gruppe erstellen</h1> <div id="empty-name-error" class="alert alert--error" style="display:none">Für alle Personen Namen angeben</div> <div id="person-count-error" class="alert alert--error" style="display:none">Mindestens zwei Personen angeben </div> <div id="event-create-error" class="alert alert--error" style="display:none">Kontokorrent konnte nicht erstellt werden</div> <div id="event-name-duplicate" class="alert alert--error" style="display:none">Ein Kontokorrent mit diesem Namen exisitert bereits</div> <div id="event-name-error" class="alert alert--error" style="display:none">Eventname angeben</div> <div id="oeffentlicher-name-error" class="alert alert--error" style="display:none">Öfferntlicher Name: Nur Kleinbuchstaben und Zahlen</div> <div id="person-name-duplicate-error" class="alert alert--error" style="display:none">Personennamen müssen unterschiedlich sein</div> <div id="account-creation-failed" class="alert alert--error" style="display:none">Account konnte nicht erstellt werden</div> <label for="event-name" class="create-event-box__label">Anzeigename</label> <div class="create-event-box__input-with-tip"> <input type="text" id="event-name" name="event-name"> <tip-button popup-id="eventNameExplainer" title="Eventname erklärung"> <span class="material-icons"> info </span> </tip-button> <app-popup id="eventNameExplainer" class="tip tip--with-input"> Wie soll die Gruppe heißen? Unter diesem Namen wird die Gruppe nach dem einloggen angezeigt. Kann, muss aber nicht mit dem öffentlichen Namen übereinstimmen. </app-popup> </div> <label for="event-name" class="create-event-box__label" style="display:none">Oeffentlich</label> <input type="checkbox" id="oeffentlich" name="oeffentlich" checked="checked" disabled="disabled" style="display:none"> <div id="oeffentlich-box"> <label for="oeffentlicher-name" class="create-event-box__label">Öffentlicher Name</label> <div class="create-event-box__input-with-tip"> <input type="text" id="oeffentlicher-name" name="oeffentlicher-name"> <tip-button popup-id="oeffentlicherNameExplainer" title="öffentlicher Name Erklärung"> <span class="material-icons"> info </span> </tip-button> <app-popup id="oeffentlicherNameExplainer" class="tip tip--with-input"> Gib hier den Namen, den die anderen Gruppenmitglieder verwenden um sich einzuloggen. ("Passwort") </app-popup> </div> </div> <label class="create-event-box__label">Personen</label> <app-personen-liste id="personen-liste"></app-personen-liste> <div id="creating" class="create-event-box__processing" style="display:none"> <span class="spinner"></span> </div> <div> <button id="create-button" class="button">Erstellen</button> </div> <div> <a id="home-button" class="button" href=""> <span class="material-icons"> home </span> zurück </a> </div> </div>',this.kontokorrentId=(0,l.Z)(),this.oeffentlicherNameManuell=!1}addServices(e){this.store=e.store,this.routingActionCreator=(0,i.b)(e),this.accountActionCreator=(0,r.gg)(e),this.kontokorrentHinzufuegenActionCreator=(0,c.Jj)(e)}connectedCallback(){let e=this;this.personenListe=e.querySelector("#personen-liste"),this.emptyNameError=e.querySelector("#empty-name-error"),this.eventCreateError=e.querySelector("#event-create-error"),this.personCountError=e.querySelector("#person-count-error"),this.eventNameError=e.querySelector("#event-name-error"),this.createButton=e.querySelector("#create-button"),this.eventName=e.querySelector("#event-name"),this.creating=e.querySelector("#creating"),this.oeffentlicherName=e.querySelector("#oeffentlicher-name"),this.oeffentlich=e.querySelector("#oeffentlich"),this.oeffentlichBox=e.querySelector("#oeffentlich-box"),this.oeffentlicherNameError=e.querySelector("#oeffentlicher-name-error"),this.eventNameDuplicate=e.querySelector("#event-name-duplicate"),this.accountCreationFailed=e.querySelector("#account-creation-failed"),this.personNameDuplicateError=e.querySelector("#person-name-duplicate-error"),this.createButton.addEventListener("click",this.createEvent.bind(this)),this.oeffentlich.addEventListener("change",(()=>{this.oeffentlichBox.style.display=this.oeffentlich.checked?"block":"none"})),this.eventName.addEventListener("change",(()=>{this.oeffentlicherNameManuell||(this.oeffentlicherName.value=(this.eventName.value||"").toLowerCase())})),this.oeffentlicherName.addEventListener("change",(()=>{this.oeffentlicherNameManuell=!0})),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.applyStoreState(this.store.state),(0,h.G)(e.querySelectorAll("a"),this.routingActionCreator)}async createEvent(){let e=this.eventName.value,t=this.personenListe.personen;this.eventNameError.style.display=e?"none":"block";let n=t.length>=2;this.personCountError.style.display=n?"none":"block";let i=t.some((e=>!e));this.emptyNameError.style.display=i?"block":"none";let r=this.oeffentlich.checked&&(!this.oeffentlicherName.value||!/^[a-z0-9]+$/.test(this.oeffentlicherName.value));this.oeffentlicherNameError.style.display=r?"block":"none";let s=t.some(((e,n)=>t.indexOf(e)!=n));this.personNameDuplicateError.style.display=s?"block":"none",!e||!n||i||r||s?document.scrollingElement.scroll({top:0,behavior:"smooth"}):await this.accountActionCreator.ensureAccount()&&await this.kontokorrentHinzufuegenActionCreator.kontokorrentErstellen(this.kontokorrentId,this.eventName.value,this.oeffentlich.checked?this.oeffentlicherName.value:null,t)&&this.routingActionCreator.navigateKontokorrent(this.kontokorrentId)}applyStoreState(e){this.creating.style.display=e.kontokorrents.creating||e.account.accountCreating?"block":"none",this.eventCreateError.style.display=e.kontokorrents.creationFailed?"block":"none",this.eventNameDuplicate.style.display=e.kontokorrents.creationFailed&&e.kontokorrents.creationFailed.exists?"block":"none",this.accountCreationFailed.style.display=!e.account.accountCreating&&e.account.accountCreationFailed?"block":"none"}disconnectedCallback(){this.subscription()}}customElements.define("app-create-event",d)},2204:function(e,t,n){function i(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:function(){return i}})},4227:function(e,t,n){class i extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(e){"Escape"==e.key&&this.hide()}clickListener(e){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",i)},1480:function(e,t,n){const i="popup-id";class r extends HTMLElement{constructor(){super(),this.clickListener=this.clickListener.bind(this)}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.popupId=this.getAttribute(i)}static get observedAttributes(){return[i]}connectedCallback(){this.addEventListener("click",this.clickListener)}clickListener(e){document.querySelector("#".concat(this.popupId)).toggle(),e.stopPropagation()}disconnectedCallback(){this.removeEventListener("click",this.clickListener)}}customElements.define("tip-button",r)},6604:function(e,t,n){n.d(t,{Jj:function(){return p}});var i=n(886);class r{constructor(e){this.exists=e,this.type=7}}class s{constructor(){this.type=8}}class o{constructor(e){this.kontokorrent=e,this.type=21}}class a{constructor(e){this.notFound=e,this.type=9}}class l{constructor(){this.type=10}}class c{constructor(e){this.kontokorrents=e,this.type=20}}class h{constructor(){this.type=18}}class d{constructor(e,t,n){this.store=e,this.apiClient=t,this.db=n}loginPageGeoeffnet(){this.store.dispatch(new h)}async kontokorrentErstellen(e,t,n,a){let l={name:t,id:e,oeffentlicherName:n,personen:a.map((e=>({name:e,id:(0,i.Z)()})))};this.store.dispatch(new s);let c=await this.apiClient.neuerKontokorrent(l);return c.success?(await this.db.addKontokorrent({id:e,name:t,personen:l.personen,oeffentlicherName:n}),this.store.dispatch(new o({id:e,name:t,personen:l.personen,oeffentlicherName:n})),!0):(this.store.dispatch(new r(c.exists)),!1)}async kontokorrentHinzufuegen(e){let t=await this.db.getPerOeffentlichName(e);if(null!=t)return t.id;this.store.dispatch(new l);try{let t=await this.apiClient.kontokorrentHinzufuegen(e,null);if(null!=t){let e=await this.db.setKontokorrents(t.map((e=>({id:e.id,name:e.name,personen:e.personen,oeffentlicherName:e.oeffentlicherName}))));return this.store.dispatch(new c(t)),e[0]}this.store.dispatch(new a(!0))}catch(e){this.store.dispatch(new a(!1))}return!1}}function p(e){return e.get("KontokorrentHinzufuegenActionCreator",(e=>new d(e.store,e.apiClient,e.db)))}}}]);
//# sourceMappingURL=8b374f4fac57c5aa95cb.bundle.js.map