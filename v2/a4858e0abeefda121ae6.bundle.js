"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[182],{3682:function(e,t,n){function r(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}n.d(t,{Z:function(){return r}})},3752:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(4327),o=n(3682);function i(e){(0,o.Z)(1,arguments);var t=(0,r.Z)(e);return t.setHours(23,59,59,999),t}},443:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(9429),o=n(3682);function i(e,t){(0,o.Z)(2,arguments);var n=(0,r.Z)(e),i=(0,r.Z)(t);return n.getTime()===i.getTime()}},9429:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(4327),o=n(3682);function i(e){(0,o.Z)(1,arguments);var t=(0,r.Z)(e);return t.setHours(0,0,0,0),t}},4327:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(3682);function o(e){(0,r.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}},1363:function(e,t,n){n.r(t),n.d(t,{BezahlungEintragenPage:function(){return h}});var r=n(9773),o=n(7160),i=n(7426),s=n(2204),a=n(4729),c=n(7030);class h extends HTMLElement{constructor(){super(),this.betreffVorschlagDebouncer=new c.d,this.innerHTML='<app-bar></app-bar> <div id="bezahlung-eintragen__edit" class="bezahlung-eintragen__edit"> <div class="bezahlung-eintragen-page-menu"> <a id="zurueck-zum-kontokorrent" class="button"> <span class="material-icons"> arrow_back </span> zurück </a> <button class="button" title="speichern" id="bezahlung-eintragen__save"> <span class="material-icons"> save </span> speichern </button> </div> <div class="bezahlung-eintragen__form-container" id="bezahlung-eintragen__form-container"> <div id="save-error" class="alert alert--error" hidden>Zahlung konnte nicht gespeichert werden. </div> <bezahlung-eintragen-form> </bezahlung-eintragen-form> </div> </div> <div id="bezahlung-eintragen__saving" class="bezahlung-eintragen__saving"> <span class="spinner"></span> <span>wird gespeichert</span> </div>',this.zurueckLink=this.querySelector("#zurueck-zum-kontokorrent"),this.appBar=this.querySelector(o.W),this.bezahlungEintragenForm=this.querySelector(a.R),this.saveButton=this.querySelector("#bezahlung-eintragen__save"),this.editingSection=this.querySelector("#bezahlung-eintragen__edit"),this.savingSection=this.querySelector("#bezahlung-eintragen__saving"),this.saveError=this.querySelector("#save-error"),this.formContainer=this.querySelector("#bezahlung-eintragen__form-container")}addServices(e){this.store=e.store,this.routingActionCreator=(0,r.b)(e),this.bezahlungActionCreator=(0,i.xN)(e),this.appBar.addServices(e)}connectedCallback(){this.kontokorrentsSubscription=this.store.subscribe("kontokorrents",(e=>this.applyStoreState(e))),this.beschreibungVorschlagSubscription=this.store.subscribe("beschreibungVorschlaege",(e=>this.beschreibungVorschlaegeChanged(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail)})),this.bezahlungActionCreator.bezahlungEintragenGeoeffnet(),(0,s.G)([this.zurueckLink],this.routingActionCreator),this.applyStoreState(this.store.state),this.saveEventListener=()=>this.save(),this.saveButton.addEventListener("click",this.saveEventListener),this.bezahlungEintragenForm.addEventListener("betreffChanged",(e=>this.betreffChanged(e.detail)))}async betreffChanged(e){try{await this.betreffVorschlagDebouncer.trigger(200)}catch(e){}this.bezahlungActionCreator.getBeschreibungVorschlaege(this.kontokorrentId,e)}beschreibungVorschlaegeChanged(e){var t;(null===(t=e.beschreibungVorschlaege)||void 0===t?void 0:t.kontokorrentId)==this.kontokorrentId?this.bezahlungEintragenForm.beschreibungVorschlaege=e.beschreibungVorschlaege.vorschlaege.slice(0,10):this.bezahlungEintragenForm.beschreibungVorschlaege=[]}async save(){if(this.bezahlungEintragenForm.validate()){let e=this.bezahlungEintragenForm.getData();await this.bezahlungActionCreator.bezahlungHinzufuegen(this.kontokorrentId,e),this.routingActionCreator.navigateKontokorrent(this.kontokorrentId,!0)}else this.formContainer.scroll({top:0,behavior:"smooth"})}applyStoreState(e){this.zurueckLink.href=e.kontokorrents.activeKontokorrentId?"kontokorrents/".concat(e.kontokorrents.activeKontokorrentId):null,e.kontokorrents.activeKontokorrentId&&(this.bezahlungEintragenForm.personen=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].personen,this.editingSection.style.display=0==e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen?"none":"flex",this.savingSection.style.display=0!=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen?"none":"flex",this.saveError.hidden=2!=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen),this.kontokorrentId=e.kontokorrents.activeKontokorrentId}disconnectedCallback(){this.kontokorrentsSubscription(),this.beschreibungVorschlagSubscription(),this.saveButton.removeEventListener("click",this.saveEventListener)}}customElements.define("bezahlung-eintragen-page",h)},7030:function(e,t,n){n.d(t,{d:function(){return r}}),n(3948);class r{constructor(){}timeout(e){return new Promise((t=>{setTimeout((()=>{t()}),e)}))}aborter(){let e={aborted:!1,promise:null},t=new Promise(((t,n)=>{this.abort=()=>{e.aborted=!1,n()}}));return e.promise=t,e}async trigger(e){this.abort&&this.abort();let t=this.aborter();try{await Promise.race([this.timeout(e),t.promise])}catch(e){throw new Error("aborted")}}}},3753:function(e,t,n){n(2109)({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}})}}]);
//# sourceMappingURL=a4858e0abeefda121ae6.bundle.js.map