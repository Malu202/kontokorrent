(self.webpackJsonp=self.webpackJsonp||[]).push([[4],{42:function(e,t){e.exports="<h1>Event erstellen</h1> <label for=event-name>Eventname</label> <input type=text id=event-name name=event-name> <label for=event-name>Oeffentlich</label> <input type=checkbox id=oeffentlich name=oeffentlich checked=checked> <div id=oeffentlich-box> <label for=oeffentlicher-name>Öffentlicher Name</label> <input type=text id=oeffentlicher-name name=oeffentlicher-name> </div> <div id=empty-name-error style=display:none>Für alle Personen Namen angeben</div> <div id=person-count-error style=display:none>Mindestens zwei Personen angeben</div> <div id=event-create-error style=display:none>Kontokorrent konnte nicht erstellt werden</div> <div id=event-name-duplicate style=display:none>Ein Kontokorrent mit diesem Namen exisitert bereits</div> <div id=event-name-error style=display:none>Eventname angeben</div> <div id=oeffentlicher-name-error style=display:none>Öfferntlicher Name: Nur Kleinbuchstaben und Zahlen</div> <div id=person-name-duplicate-error style=display:none>Personennamen müssen unterschiedlich sein</div> <div id=creating style=display:none>Wird erstellt</div> <div id=account-creation-failed style=display:none>Account konnte nicht erstellt werden</div> <app-personen-liste id=personen-liste></app-personen-liste> <button id=create-button>Erstellen</button>"},43:function(e,t){e.exports='<ul id=personen-liste class="mdc-list mdc-list--non-interactive"> </ul> <button type=button id=add-person>Person hinzufügen</button>'},44:function(e,t){e.exports="<input type=text id=name placehoder=Name /> <button id=remove>entfernen</button>"},60:function(e,t,n){"use strict";n.r(t),n.d(t,"CreateKontokorrent",(function(){return p}));var r=n(42),i=n.n(r),o=n(43),s=n.n(o),a=n(44),l=n.n(a);class c extends HTMLElement{constructor(){super(),this.innerHTML=l.a}connectedCallback(){this.removeButton=this.querySelector("#remove"),this.nameInput=this.querySelector("#name"),this.nameInput.addEventListener("change",()=>{this.dispatchEvent(new Event("change"))}),this.removeButton.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("onremove"))})}get name(){return this.nameInput.value}disconnectedCallback(){}}customElements.define("app-personen-listen-eintrag",c);class h extends HTMLElement{constructor(){super(),this.innerHTML=s.a}get personen(){let e=[];return this.personenListe.querySelectorAll("app-personen-listen-eintrag").forEach(t=>e.push(t.name)),e}connectedCallback(){this.addPersonButton=this.querySelector("#add-person"),this.personenListe=this.querySelector("#personen-liste"),this.addPersonButton.addEventListener("click",()=>{let e=document.createElement("li"),t=new c;e.appendChild(t),this.personenListe.appendChild(e),t.addEventListener("onremove",()=>{this.personenListe.removeChild(e)})})}disconnectedCallback(){}}customElements.define("app-personen-liste",h);var d=n(26),u=function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{l(r.next(e))}catch(e){o(e)}}function a(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))};class p extends HTMLElement{constructor(){super(),this.innerHTML=i.a,this.kontokorrentId=Object(d.a)(),this.oeffentlicherNameManuell=!1}addServices(e){this.store=e.store,this.routingActionCreator=e.routingActionCreator,this.accountActionCreator=e.accountActionCreator,this.kontokorrentsActionCreator=e.kontokorrentsActionCreator}connectedCallback(){this.personenListe=this.querySelector("#personen-liste"),this.emptyNameError=this.querySelector("#empty-name-error"),this.eventCreateError=this.querySelector("#event-create-error"),this.personCountError=this.querySelector("#person-count-error"),this.eventNameError=this.querySelector("#event-name-error"),this.createButton=this.querySelector("#create-button"),this.eventName=this.querySelector("#event-name"),this.creating=this.querySelector("#creating"),this.oeffentlicherName=this.querySelector("#oeffentlicher-name"),this.oeffentlich=this.querySelector("#oeffentlich"),this.oeffentlichBox=this.querySelector("#oeffentlich-box"),this.oeffentlicherNameError=this.querySelector("#oeffentlicher-name-error"),this.eventNameDuplicate=this.querySelector("#event-name-duplicate"),this.accountCreationFailed=this.querySelector("#account-creation-failed"),this.personNameDuplicateError=this.querySelector("#person-name-duplicate-error"),this.createButton.addEventListener("click",this.createEvent.bind(this)),this.oeffentlich.addEventListener("change",()=>{this.oeffentlichBox.style.display=this.oeffentlich.checked?"block":"none"}),this.eventName.addEventListener("change",()=>{this.oeffentlicherNameManuell||(this.oeffentlicherName.value=this.eventName.value)}),this.oeffentlicherName.addEventListener("change",()=>{this.oeffentlicherNameManuell=!0}),this.subscription=this.store.subscribe(null,e=>this.applyStoreState(e)),this.applyStoreState(this.store.state)}createEvent(){return u(this,void 0,void 0,(function*(){let e=this.eventName.value,t=this.personenListe.personen;this.eventNameError.style.display=e?"none":"block";let n=t.length>=2;this.personCountError.style.display=n?"none":"block";let r=t.some(e=>!e);this.emptyNameError.style.display=r?"block":"none";let i=this.oeffentlich.checked&&(!this.oeffentlicherName.value||!/^[a-z0-9]+$/.test(this.oeffentlicherName.value));this.oeffentlicherNameError.style.display=i?"block":"none";let o=t.some((e,n)=>t.indexOf(e)!=n);this.personNameDuplicateError.style.display=o?"block":"none",!e||!n||r||i||o||(yield this.accountActionCreator.ensureAccount())&&(yield this.kontokorrentsActionCreator.kontokorrentErstellen(this.kontokorrentId,this.eventName.value,this.oeffentlich.checked?this.oeffentlicherName.value:null,t))&&this.routingActionCreator.navigateKontokorrent(this.kontokorrentId)}))}applyStoreState(e){this.creating.style.display=e.kontokorrents.creating||e.account.accountCreating?"block":"none",this.eventCreateError.style.display=e.kontokorrents.creationFailed?"block":"none",this.eventNameDuplicate.style.display=e.kontokorrents.creationFailed&&e.kontokorrents.creationFailed.exists?"block":"none",this.accountCreationFailed.style.display=!e.account.accountCreating&&e.account.accountCreationFailed?"block":"none"}disconnectedCallback(){this.subscription()}}customElements.define("app-create-event",p)}}]);
//# sourceMappingURL=4.c05a71e5fc81764ad535.bundle.js.map