(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[76],{2582:function(e,t,r){"use strict";r.r(t),r.d(t,{BezahlungEintragenPage:function(){return R}});var n=r(2663),i=r.n(n),s=r(9773),a=r(426);class o{constructor(e,t){this.apiClient=e,this.db=t}async bezahlungAnlegen(e,t){let r=await this.apiClient.neueBezahlung(e,t);return this.db.addAktionen(e,[r]),r}}var l=r(886),h=r(5075),c=r(2390);class d{constructor(e){this.kontokorrentId=e,this.type=6}}class u{constructor(e){this.kontokorrentId=e,this.type=22}}class g{constructor(e,t){this.kontokorrentId=e,this.bezahlung=t,this.type=23}}class b{constructor(e){this.kontokorrentId=e,this.type=24}}class f{constructor(e,t,r,n){this.store=e,this.db=t,this.neueBezahlungService=r,this.workerService=n}async bezahlungEintragenGeoeffnet(){let e=this.store.state.kontokorrents.activeKontokorrentId||await this.db.getZuletztGesehenerKontokorrentId();this.store.dispatch(new d(e)),await(await this.workerService.getWorker()).getBeschreibungVorschlaege(e,null)}async bezahlungEintragenKontokorrentChanged(e){this.store.dispatch(new d(e)),await this.db.setZuletztGesehenerKontokorrentId(e),await(await this.workerService.getWorker()).getBeschreibungVorschlaege(e,null)}async bezahlungHinzufuegen(e,t){let r=!1,n=(0,l.Z)(),i={beschreibung:t.betreff,bezahlendePersonId:t.bezahlendePerson,empfaengerIds:t.empfaenger,id:n,wert:t.betrag,zeitpunkt:t.datum};if("serviceWorker"in navigator&&"SyncManager"in window){let i=await navigator.serviceWorker.ready;try{let r={beschreibung:t.betreff,bezahlendePersonId:t.bezahlendePerson,empfaengerIds:t.empfaenger,id:n,wert:t.betrag,zeitpunkt:t.datum,kontokorrentId:e};await this.db.bezahlungZwischenspeichern(r),await i.sync.register("NeueBezahlungBackgroundSync"),this.store.dispatch(new g(e,{beschreibung:r.beschreibung,bezahlendePersonId:r.bezahlendePersonId,empfaengerIds:r.empfaengerIds,id:r.id,wert:r.wert,zeitpunkt:r.zeitpunkt,status:h.Z.Zwischengespeichert}))}catch(e){console.warn("background sync not allowed"),await this.db.zwischengespeicherteBezahlungErledigt(n),r=!0}}else console.log("background sync not supported"),r=!0;if(r){this.store.dispatch(new u(e));try{let t=await this.neueBezahlungService.bezahlungAnlegen(e,i);this.store.dispatch(new g(e,{beschreibung:t.bezahlung.beschreibung,bezahlendePersonId:t.bezahlung.bezahlendePersonId,empfaengerIds:t.bezahlung.empfaengerIds,id:t.bezahlung.id,wert:t.bezahlung.wert,zeitpunkt:t.bezahlung.zeitpunkt,status:h.Z.Gespeichert}))}catch(t){throw console.error(t),this.store.dispatch(new b(e)),t}}}async getBeschreibungVorschlaege(e,t){(await this.workerService.getWorker()).getBeschreibungVorschlaege(e,t)}}var p=r(2204),m=(r(5306),r(819)),k=r.n(m),v=r(6029),z=r(6510),w=r.n(z);class y extends HTMLElement{constructor(){super(),this.innerHTML=w(),this.input=this.querySelector("input"),this.personLabel=this.querySelector('[data-ref="label"]'),this.label=this.querySelector("label")}connectedCallback(){}disconnectedCallback(){}set radioName(e){this.input.name=e}set person(e){this.input.value=e.id,this.personLabel.innerText=e.name,this.input.id=e.id,this.label.setAttribute("for",e.id)}}customElements.define("bezahlende-person-radio-button",y);var _=r(8290),E=r.n(_),C=r(5022),S=r(2660),x=r.n(S);const I=new C.a(x()),L="checkbox-id",B="checkbox-name";class q extends HTMLElement{constructor(){super(),this.appendChild(I.get()),this.nativeControl=this.querySelector(".mdc-checkbox__native-control")}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.nativeControl.id=this.getAttribute(L),this.nativeControl.name=this.getAttribute(B)}static get observedAttributes(){return[L,B]}}customElements.define("mdc-checkbox",q);const A=new C.a(E());class V extends HTMLElement{constructor(){super(),this.appendChild(A.get()),this.mdcCheckBox=this.querySelector("mdc-checkbox"),this.label=this.querySelector("label")}set person(e){this.label.innerText=e.name;const t=`empfaenger-${e.id}`;this.label.setAttribute("for",t),this.mdcCheckBox.setAttribute("checkbox-id",t),this.mdcCheckBox.setAttribute("checkbox-name",t)}connectedCallback(){}disconnectedCallback(){}}customElements.define("empfaenger-checkbox",V),r(3753);var M=r(9429),P=r(3682),D=r(4327);class K extends HTMLElement{constructor(){var e,t;super(),this.validationRequested=!1,this.innerHTML=k(),this.empfaengerAuswahl=this.querySelector("#empfaenger-auswahl"),this.zahlendePersonRenderer=new v.T(this.querySelector("#zahlende-person-auswahl"),(e=>e.id),(e=>new y)),this.empfaengerRenderer=new v.T(this.empfaengerAuswahl,(e=>e.id),(e=>new V)),this.beschreibungVorschlaegeRenderer=new v.T(this.querySelector("#beschreibung-vorschlaege"),(e=>e),(e=>{let t=document.createElement("button");return t.className="bezahlung-eintragen-form__vorschlag",t.innerText=e,t.type="button",t.addEventListener("click",(t=>{this.completeBetreff(e)})),t})),this.datum=this.querySelector("#datum"),this.datum.value=(e=new Date,(t=new Date(e)).setMinutes(e.getMinutes()-e.getTimezoneOffset()),t.toJSON().slice(0,10)),this.betrag=this.querySelector("#betrag"),this.betreff=this.querySelector("#betreff"),this.zahlendePersonMissingError=this.querySelector("#zahlende-person-missing-error"),this.betreffMissingError=this.querySelector("#betreff-missing-error"),this.betragMissingError=this.querySelector("#betrag-missing-error"),this.betragInvalidError=this.querySelector("#betrag-invalid-error"),this.empfaengerMissingError=this.querySelector("#empfaenger-missing-error"),this.form=this.querySelector("#bezahlung-eintragen-form"),this.alleCheck=this.querySelector("#alle-check")}connectedCallback(){this.formInputListener=()=>this.onFormInput(),this.form.addEventListener("input",this.formInputListener),this.betrag.focus(),this.alleClickListener=()=>this.alleClick(),this.alleCheck.addEventListener("input",this.alleClickListener),this.betreffInputListener=()=>{this.dispatchEvent(new CustomEvent("betreffChanged",{detail:this.betreff.value}))},this.betreff.addEventListener("input",this.betreffInputListener),this.betreffKeyDownListener=e=>this.betreffKeyDown(e),this.betreff.addEventListener("keydown",this.betreffKeyDownListener)}betreffKeyDown(e){var t;"Enter"==e.code&&(null===(t=this.vorschlaege)||void 0===t?void 0:t.length)>0&&this.completeBetreff(this.vorschlaege[0])}completeBetreff(e){this.betreff.value=e,this.betreffInputListener(),this.betreff.focus(),this.validateWhileManipulating()}alleClick(){let e=this.form.alle.checked;for(let t of this.empfaengerCheckboxen)t.checked=e}disconnectedCallback(){this.form.removeEventListener("input",this.formInputListener),this.alleCheck.removeEventListener("input",this.alleClickListener),this.betreff.removeEventListener("input",this.betreffInputListener),this.betreff.removeEventListener("keydown",this.betreffKeyDownListener)}onFormInput(){this.validateWhileManipulating()}validate(){this.validationRequested=!0;let e=this.parseBetrag(),t=e.valid;return this.betragInvalidError.hidden=e.valid||e.empty,this.validateWhileManipulating()&&t}getDatum(){let e=this.datum.valueAsDate;return!e||function(e,t){(0,P.Z)(2,arguments);var r=(0,M.Z)(e),n=(0,M.Z)(t);return r.getTime()===n.getTime()}(e,new Date)?new Date:function(e){(0,P.Z)(1,arguments);var t=(0,D.Z)(e);return t.setHours(23,59,59,999),t}(e)}getData(){return{betrag:this.parseBetrag().value,betreff:this.betreff.value,empfaenger:this.selectedEmpfaenger,bezahlendePerson:this.bezahlendePerson.value,datum:this.getDatum()}}parseBetrag(){this.betrag.setAttribute("type","text");let e=this.betrag.value;if(this.betrag.setAttribute("type","number"),""==e)return{valid:!1,empty:!0};e=e.replace(",","."),e=e.replace(/ /g,"");let t=parseFloat(e);return isNaN(t)?{valid:!1,empty:!1}:{valid:!0,value:t}}get bezahlendePerson(){return this.form["bezahlende-person"]}get empfaengerCheckboxen(){return this._personen.map((e=>this.form["empfaenger-"+e.id]))}get selectedEmpfaenger(){return this._personen.filter((e=>this.form["empfaenger-"+e.id].checked)).map((e=>e.id))}validateWhileManipulating(){let e={betragValid:!!this.betrag.value,betreffValid:!!this.betreff.value,zahlendePersonValid:!!this.bezahlendePerson.value,empfaengerValid:this.selectedEmpfaenger.length>0};return this.betragMissingError.hidden=!this.validationRequested||e.betragValid,this.betreffMissingError.hidden=!this.validationRequested||e.betreffValid,this.zahlendePersonMissingError.hidden=!this.validationRequested||e.zahlendePersonValid,this.empfaengerMissingError.hidden=!this.validationRequested||e.empfaengerValid,!Object.values(e).some((e=>0==e))}set personen(e){this._personen=e,this.zahlendePersonRenderer.update(e,((e,t)=>{e.person=t,e.radioName="bezahlende-person"})),this.empfaengerRenderer.update(e,((e,t)=>{e.person=t}))}set beschreibungVorschlaege(e){this.vorschlaege=e,this.beschreibungVorschlaegeRenderer.update(e,(()=>{}))}}const T="bezahlung-eintragen-form";customElements.define(T,K);class H{constructor(){}timeout(e){return new Promise((t=>{setTimeout((()=>{t()}),e)}))}aborter(){let e={aborted:!1,promise:null},t=new Promise(((t,r)=>{this.abort=()=>{e.aborted=!1,r()}}));return e.promise=t,e}async trigger(e){this.abort&&this.abort();let t=this.aborter();try{await Promise.race([this.timeout(e),t.promise])}catch(e){throw new Error("aborted")}}}class R extends HTMLElement{constructor(){super(),this.betreffVorschlagDebouncer=new H,this.innerHTML=i(),this.zurueckLink=this.querySelector("#zurueck-zum-kontokorrent"),this.appBar=this.querySelector(a.W),this.bezahlungEintragenForm=this.querySelector(T),this.saveButton=this.querySelector("#bezahlung-eintragen__save"),this.editingSection=this.querySelector("#bezahlung-eintragen__edit"),this.savingSection=this.querySelector("#bezahlung-eintragen__saving"),this.saveError=this.querySelector("#save-error"),this.formContainer=this.querySelector("#bezahlung-eintragen__form-container")}addServices(e){this.store=e.store,this.routingActionCreator=(0,s.b)(e),this.bezahlungActionCreator=function(e){return e.get("BezahlungActionCreator",(e=>new f(e.store,e.db,function(e){return e.get("NeueBezahlungService",(e=>new o(e.apiClient,e.db)))}(e),(0,c.G)(e))))}(e),this.appBar.addServices(e)}connectedCallback(){this.kontokorrentsSubscription=this.store.subscribe("kontokorrents",(e=>this.applyStoreState(e))),this.beschreibungVorschlagSubscription=this.store.subscribe("beschreibungVorschlaege",(e=>this.beschreibungVorschlaegeChanged(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail)})),this.bezahlungActionCreator.bezahlungEintragenGeoeffnet(),(0,p.G)([this.zurueckLink],this.routingActionCreator),this.applyStoreState(this.store.state),this.saveEventListener=()=>this.save(),this.saveButton.addEventListener("click",this.saveEventListener),this.bezahlungEintragenForm.addEventListener("betreffChanged",(e=>this.betreffChanged(e.detail)))}async betreffChanged(e){try{await this.betreffVorschlagDebouncer.trigger(200)}catch(e){}await this.bezahlungActionCreator.getBeschreibungVorschlaege(this.kontokorrentId,e)}beschreibungVorschlaegeChanged(e){var t;(null===(t=e.beschreibungVorschlaege)||void 0===t?void 0:t.kontokorrentId)==this.kontokorrentId?this.bezahlungEintragenForm.beschreibungVorschlaege=e.beschreibungVorschlaege.vorschlaege.slice(0,10):this.bezahlungEintragenForm.beschreibungVorschlaege=[]}async save(){if(this.bezahlungEintragenForm.validate()){let e=this.bezahlungEintragenForm.getData();await this.bezahlungActionCreator.bezahlungHinzufuegen(this.kontokorrentId,e),this.routingActionCreator.navigateKontokorrent(this.kontokorrentId,!0)}else this.formContainer.scrollTop=0}applyStoreState(e){this.zurueckLink.href=e.kontokorrents.activeKontokorrentId?`kontokorrents/${e.kontokorrents.activeKontokorrentId}`:null,e.kontokorrents.activeKontokorrentId&&(this.bezahlungEintragenForm.personen=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].personen,this.editingSection.style.display=0==e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen?"none":"flex",this.savingSection.style.display=0!=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen?"none":"flex",this.saveError.hidden=2!=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen),this.kontokorrentId=e.kontokorrents.activeKontokorrentId}disconnectedCallback(){this.kontokorrentsSubscription(),this.beschreibungVorschlagSubscription(),this.saveButton.removeEventListener("click",this.saveEventListener)}}customElements.define("bezahlung-eintragen-page",R)},3753:function(e,t,r){"use strict";r(2109)({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}})},6510:function(e){e.exports='<input type="radio" class="bezahlende-person-radio__input"/> <label class="bezahlende-person-radio"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/> </svg> <span data-ref="label"></span> </label>'},819:function(e){e.exports='<form novalidate class="bezahlung-eintragen-form" id="bezahlung-eintragen-form"> <div id="betreff-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betreff">Betreff</label> angegeben werden.</div> <div id="betrag-invalid-error" class="alert alert--error" hidden> Der <label class="alert__field-label" for="betrag">Betrag</label> ist ungültig.</div> <div id="betrag-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betrag">Betrag</label> angegeben werden.</div> <span id="zahlende-person-missing-error" class="alert alert--error" hidden>Wähle eine Person aus die bezahlt. </span> <div id="empfaenger-missing-error" class="alert alert--error" hidden>Wähle Personen aus für die bezahlt wird. </div> <label for="betrag" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Betrag</label> <input name="betrag" id="betrag" type="number" novalidate step="any"> <label for="zahlende-person" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Diese Person zahlt</label> <div id="zahlende-person-auswahl"></div> <div class="bezahlung-eintragen-form__empfaenger-row"> <label for="empfaenger" class="bezahlung-eintragen-form__label">für diese Personen</label> <mdc-checkbox checkbox-id="alle" checkbox-name="alle" id="alle-check"></mdc-checkbox> <label for="alle">alle</label> </div> <div id="empfaenger-auswahl"></div> <label for="betreff" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Betreff</label> <div id="beschreibung-vorschlaege" class="bezahlung-eintragen-form__vorschlaege"></div> <input name="betreff" id="betreff" required="" autocomplete="off" type="text"> <label for="datum" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Datum</label> <input name="datum" id="datum" required="" type="date"> </form>'},2663:function(e){e.exports='<app-bar></app-bar> <div id="bezahlung-eintragen__edit" class="bezahlung-eintragen__edit"> <div class="bezahlungen-page-menu"> <a id="zurueck-zum-kontokorrent" class="button"> <span class="material-icons"> arrow_back </span> zurück </a> <button class="button" title="speichern" id="bezahlung-eintragen__save"> <span class="material-icons"> save </span> speichern </button> </div> <div class="bezahlung-eintragen__form-container" id="bezahlung-eintragen__form-container"> <div id="save-error" class="alert alert--error" hidden>Zahlung konnte nicht gespeichert werden. </div> <bezahlung-eintragen-form> </bezahlung-eintragen-form> </div> </div> <div id="bezahlung-eintragen__saving" class="bezahlung-eintragen__saving"> <span class="spinner"></span> <span>wird gespeichert</span> </div>'},8290:function(e){e.exports="<mdc-checkbox></mdc-checkbox> <label></label>"},2660:function(e){e.exports='<div class="mdc-touch-target-wrapper"> <div class="mdc-checkbox mdc-checkbox--touch"> <input type="checkbox" class="mdc-checkbox__native-control"/> <div class="mdc-checkbox__background"> <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"> <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/> </svg> <div class="mdc-checkbox__mixedmark"></div> </div> <div class="mdc-checkbox__ripple"></div> </div> </div>'}}]);
//# sourceMappingURL=b81674c3c940f387617b.bundle.js.map