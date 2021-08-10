"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[895],{3682:function(e,t,r){function n(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}r.d(t,{Z:function(){return n}})},3752:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(4327),i=r(3682);function a(e){(0,i.Z)(1,arguments);var t=(0,n.Z)(e);return t.setHours(23,59,59,999),t}},443:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(9429),i=r(3682);function a(e,t){(0,i.Z)(2,arguments);var r=(0,n.Z)(e),a=(0,n.Z)(t);return r.getTime()===a.getTime()}},9429:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(4327),i=r(3682);function a(e){(0,i.Z)(1,arguments);var t=(0,n.Z)(e);return t.setHours(0,0,0,0),t}},4327:function(e,t,r){r.d(t,{Z:function(){return i}});var n=r(3682);function i(e){(0,n.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}},3811:function(e,t,r){r.r(t),r.d(t,{BezahlungPage:function(){return l}});var n=r(9773),i=r(7160),a=r(7426),o=r(2204),s=r(4729),h=r(7030);class l extends HTMLElement{constructor(){super(),this.betreffVorschlagDebouncer=new h.d,this.dataLoaded=!1,this.innerHTML='<app-bar></app-bar> <div id="bezahlung__edit" class="bezahlung__edit"> <div class="bezahlung-page-menu"> <a id="zurueck-zum-kontokorrent" class="button"> <span class="material-icons"> arrow_back </span> zurück </a> <button class="button" title="speichern" id="bezahlung__delete"> <span class="material-icons"> delete </span> löschen </button> <button class="button" title="speichern" id="bezahlung__update"> <span class="material-icons"> save </span> speichern </button> </div> <div class="bezahlung__form-container" id="bezahlung__form-container"> <div id="update-error" class="alert alert--error" hidden> Zahlung konnte nicht bearbeitet werden. </div> <div id="delete-error" class="alert alert--error" hidden> Zahlung konnte nicht bearbeitet werden. </div> <div id="bezahlung-nicht-gefunden-error" class="alert alert--error" hidden> Zahlung konnte nicht gefunden werden. </div> <div id="bezahlung-zwischengespeichert-error" class="alert alert--error" hidden> Zahlung kann nicht geöffnet werden, weil sie noch synchronisiert wird. </div> <div id="bezahlung-geloescht-error" class="alert alert--error" hidden> Zahlung kann nicht verändert werden, weil sie gelöscht wurde. </div> <div id="bezahlung-bearbeitet-error" class="alert alert--error" hidden> Zahlung kann nicht verändert werden, weil sie bereits bearbeitet wurde. </div> <bezahlung-eintragen-form> </bezahlung-eintragen-form> </div> </div> <div class="bezahlung__progress" id="bezahlung__updating"> <span class="spinner"></span> <span>wird gespeichert</span> </div> <div class="bezahlung__progress" id="bezahlung__deleting"> <span class="spinner"></span> <span>wird gelöscht</span> </div> <app-popup id="update-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Geänderte Bezahlung speichern? </p> <div class="dialog__button-pane"> <button id="abort-update" class="button">Abbrechen</button> <button id="confirm-update" class="button">Speichern</button> </div> </div> </app-popup> <app-popup id="delete-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Bezahlung löschen? </p> <div class="dialog__button-pane"> <button id="abort-delete" class="button">Abbrechen</button> <button id="confirm-delete" class="button">Löschen</button> </div> </div> </app-popup>',this.zurueckLink=this.querySelector("#zurueck-zum-kontokorrent"),this.appBar=this.querySelector(i.W),this.bezahlungEintragenForm=this.querySelector(s.R),this.bezahlungNichtGefundenError=this.querySelector("#bezahlung-nicht-gefunden-error"),this.bezahlungZwischengespeichertError=this.querySelector("#bezahlung-zwischengespeichert-error"),this.bezahlungGeloeschtError=this.querySelector("#bezahlung-geloescht-error"),this.bezahlungBearbeitetError=this.querySelector("#bezahlung-bearbeitet-error"),this.updateButton=this.querySelector("#bezahlung__update"),this.deleteButton=this.querySelector("#bezahlung__delete"),this.editingSection=this.querySelector("#bezahlung__edit"),this.updatingSection=this.querySelector("#bezahlung__updating"),this.deletingSection=this.querySelector("#bezahlung__deleting"),this.updateError=this.querySelector("#update-error"),this.deleteError=this.querySelector("#delete-error"),this.formContainer=this.querySelector("#bezahlung__form-container")}addServices(e){this.store=e.store,this.routingActionCreator=(0,n.b)(e),this.bezahlungActionCreator=(0,a.xN)(e),this.appBar.addServices(e)}connectedCallback(){this.kontokorrentsSubscription=this.store.subscribe("kontokorrents",(e=>this.applyStoreState(e))),this.beschreibungVorschlagSubscription=this.store.subscribe("beschreibungVorschlaege",(e=>this.beschreibungVorschlaegeChanged(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.routingActionCreator.navigateKontokorrent(e.detail)})),(0,o.G)([this.zurueckLink],this.routingActionCreator),this.beschreibungVorschlaegeChanged(this.store.state),this.bezahlungEintragenForm.addEventListener("betreffChanged",(e=>this.betreffChanged(e.detail))),this.updateDialog=this.querySelector("#update-dialog"),this.deleteDialog=this.querySelector("#delete-dialog"),this.querySelector("#bezahlung__update").addEventListener("click",(e=>{this.bezahlungEintragenForm.validate()?this.updateDialog.show():this.formContainer.scroll({top:0,behavior:"smooth"}),e.stopPropagation()})),this.querySelector("#confirm-update").addEventListener("click",(async()=>{this.updateDialog.hide();let e=this.bezahlungEintragenForm.getData();await this.bezahlungActionCreator.bezahlungBearbeiten(this.kontokorrentIdParameter,this.bezahlungIdParameter,e),this.routingActionCreator.navigateKontokorrent(this.kontokorrentIdParameter)})),this.querySelector("#abort-update").addEventListener("click",(()=>{this.updateDialog.hide()})),this.querySelector("#bezahlung__delete").addEventListener("click",(e=>{this.deleteDialog.show(),e.stopPropagation()})),this.querySelector("#confirm-delete").addEventListener("click",(async()=>{this.deleteDialog.hide(),await this.bezahlungActionCreator.bezahlungLoeschen(this.kontokorrentIdParameter,this.bezahlungIdParameter),this.routingActionCreator.navigateKontokorrent(this.kontokorrentIdParameter)})),this.querySelector("#abort-delete").addEventListener("click",(()=>{this.deleteDialog.hide()}))}async betreffChanged(e){try{await this.betreffVorschlagDebouncer.trigger(200)}catch(e){}this.bezahlungActionCreator.getBeschreibungVorschlaege(this.kontokorrentIdParameter,e)}beschreibungVorschlaegeChanged(e){var t;(null===(t=e.beschreibungVorschlaege)||void 0===t?void 0:t.kontokorrentId)==this.kontokorrentIdParameter?this.bezahlungEintragenForm.beschreibungVorschlaege=e.beschreibungVorschlaege.vorschlaege.slice(0,10):this.bezahlungEintragenForm.beschreibungVorschlaege=[]}applyStoreState(e){let t=!1,r=!1,n=!1,i=!1,a=!1;if(this.kontokorrentIdParameter&&this.bezahlungIdParameter){let o=e.kontokorrents.kontokorrents[this.kontokorrentIdParameter];if(o){this.bezahlungEintragenForm.personen=o.personen;let e=o.angezeigteBezahlung[this.bezahlungIdParameter];e&&(this.bezahlungNichtGefundenError.hidden=0!=e.bearbeitungsStatus,this.bezahlungZwischengespeichertError.hidden=1!=e.bearbeitungsStatus,this.bezahlungGeloeschtError.hidden=3!=e.bearbeitungsStatus,this.bezahlungBearbeitetError.hidden=2!=e.bearbeitungsStatus,t=4==e.bearbeitungsStatus,r=0==e.updateStatus,i=2==e.updateStatus,n=0==e.deleteStatus,a=2==e.deleteStatus);let s=o.bezahlungen.find((e=>e.id==this.bezahlungIdParameter));o.personen&&o.personen.length>0&&s&&!this.dataLoaded&&(this.dataLoaded=!0,this.bezahlungEintragenForm.setData(s))}}this.updateButton.style.visibility=t?"visible":"collapse",this.deleteButton.style.visibility=t?"visible":"collapse",this.updatingSection.style.display=r?"":"none",this.deletingSection.style.display=n?"":"none",this.editingSection.style.display=r||n?"none":"",this.bezahlungEintragenForm.style.display=t?"":"none",this.updateError.hidden=!i,this.deleteError.hidden=!a}setRouteParameters(e,t){this.kontokorrentIdParameter=e,this.bezahlungIdParameter=t,this.zurueckLink.href="kontokorrents/".concat(e),this.bezahlungActionCreator.bezahlungGeoeffnet(e,t)}disconnectedCallback(){this.kontokorrentsSubscription(),this.beschreibungVorschlagSubscription()}}customElements.define("bezahlung-page",l)},7030:function(e,t,r){r.d(t,{d:function(){return n}}),r(3948);class n{constructor(){}timeout(e){return new Promise((t=>{setTimeout((()=>{t()}),e)}))}aborter(){let e={aborted:!1,promise:null},t=new Promise(((t,r)=>{this.abort=()=>{e.aborted=!1,r()}}));return e.promise=t,e}async trigger(e){this.abort&&this.abort();let t=this.aborter();try{await Promise.race([this.timeout(e),t.promise])}catch(e){throw new Error("aborted")}}}},3753:function(e,t,r){r(2109)({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}})}}]);
//# sourceMappingURL=fd019372791c92182a90.bundle.js.map