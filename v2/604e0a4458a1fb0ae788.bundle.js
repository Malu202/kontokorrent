"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[41],{3520:function(e,t,n){n.d(t,{x:function(){return s}});const r=new(n(5022).a)('<input type="radio" class="bezahlende-person-radio__input"/> <label class="bezahlende-person-radio"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/> </svg> <span data-ref="label"></span> </label>');class s extends HTMLElement{constructor(){super(),this.templateInstance=r.getInstance()}connectedCallback(){this.templateInstance.apply(this)&&(this.input=this.querySelector("input"),this.personLabel=this.querySelector('[data-ref="label"]'),this.label=this.querySelector("label"),this.update())}disconnectedCallback(){}set radioName(e){this._radioName=e}set person(e){this.personName=e.name,this.personId=e.id,this.update()}update(){this.templateInstance.isApplied()&&(this.input.value=this.personId,this.personLabel.innerText=this.personName,this.input.id=this.personId,this.label.setAttribute("for",this.personId),this.input.name=this._radioName)}}customElements.define("bezahlende-person-radio-button",s)},4729:function(e,t,n){n.d(t,{R:function(){return f}}),n(3948),n(5306);var r=n(6029),s=n(3520),i=n(5022);const a=new i.a('<div class="mdc-touch-target-wrapper"> <div class="mdc-checkbox mdc-checkbox--touch"> <input type="checkbox" class="mdc-checkbox__native-control"/> <div class="mdc-checkbox__background"> <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"> <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/> </svg> <div class="mdc-checkbox__mixedmark"></div> </div> <div class="mdc-checkbox__ripple"></div> </div> </div>'),h="checkbox-id",l="checkbox-name";class o extends HTMLElement{constructor(){super(),this.templateInstance=a.getInstance()}connectedCallback(){this.templateInstance.apply(this)&&(this.nativeControl=this.querySelector(".mdc-checkbox__native-control"),this.updateAttributes())}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.nativeControl&&(this.nativeControl.id=this.getAttribute(h),this.nativeControl.name=this.getAttribute(l))}static get observedAttributes(){return[h,l]}}customElements.define("mdc-checkbox",o);const c=new i.a("<mdc-checkbox></mdc-checkbox> <label></label>");class d extends HTMLElement{constructor(){super(),this.templateInstance=c.getInstance()}set person(e){this.personName=e.name,this.checkboxId="empfaenger-".concat(e.id),this.update()}connectedCallback(){this.templateInstance.apply(this)&&(this.mdcCheckBox=this.querySelector("mdc-checkbox"),this.label=this.querySelector("label"),this.update())}disconnectedCallback(){}update(){this.templateInstance.isApplied()&&(this.label.innerText=this.personName,this.label.setAttribute("for",this.checkboxId),this.mdcCheckBox.setAttribute("checkbox-id",this.checkboxId),this.mdcCheckBox.setAttribute("checkbox-name",this.checkboxId))}}function u(e){var t=new Date(e);return t.setMinutes(e.getMinutes()-e.getTimezoneOffset()),t.toJSON().slice(0,10)}customElements.define("empfaenger-checkbox",d),n(3753);var b=n(443),g=n(3752);class p extends HTMLElement{constructor(){super(),this.validationRequested=!1,this._personen=[],this.vorschlaege=[],this.rendered=!1,this.bezahlungSet=!1}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<form novalidate class="bezahlung-eintragen-form" id="bezahlung-eintragen-form"> <div id="betreff-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betreff">Betreff</label> angegeben werden.</div> <div id="betrag-invalid-error" class="alert alert--error" hidden> Der <label class="alert__field-label" for="betrag">Betrag</label> ist ungültig.</div> <div id="betrag-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betrag">Betrag</label> angegeben werden.</div> <span id="zahlende-person-missing-error" class="alert alert--error" hidden>Wähle eine Person aus die bezahlt. </span> <div id="empfaenger-missing-error" class="alert alert--error" hidden>Wähle Personen aus für die bezahlt wird. </div> <label for="betrag" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Betrag</label> <input name="betrag" id="betrag" type="number" novalidate step="any"> <label for="zahlende-person" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Diese Person zahlt</label> <div id="zahlende-person-auswahl"></div> <div class="bezahlung-eintragen-form__empfaenger-row"> <label for="empfaenger" class="bezahlung-eintragen-form__label">für diese Personen</label> <mdc-checkbox checkbox-id="alle" checkbox-name="alle" id="alle-check"></mdc-checkbox> <label for="alle">alle</label> </div> <div id="empfaenger-auswahl"></div> <label for="betreff" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Betreff</label> <div id="beschreibung-vorschlaege" class="bezahlung-eintragen-form__vorschlaege"></div> <input name="betreff" id="betreff" required="" autocomplete="off" type="text"> <label for="datum" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Datum</label> <input name="datum" id="datum" required="" type="date"> </form>',this.empfaengerAuswahl=this.querySelector("#empfaenger-auswahl"),this.zahlendePersonRenderer=new r.T(this.querySelector("#zahlende-person-auswahl"),(e=>e.id),(e=>new s.x)),this.empfaengerRenderer=new r.T(this.empfaengerAuswahl,(e=>e.id),(e=>new d)),this.beschreibungVorschlaegeRenderer=new r.T(this.querySelector("#beschreibung-vorschlaege"),(e=>e),(e=>{let t=document.createElement("button");return t.className="bezahlung-eintragen-form__vorschlag",t.innerText=e,t.type="button",t.addEventListener("click",(t=>{this.completeBetreff(e)})),t})),this.datum=this.querySelector("#datum"),this.datum.value=u(new Date),this.betrag=this.querySelector("#betrag"),this.betreff=this.querySelector("#betreff"),this.zahlendePersonMissingError=this.querySelector("#zahlende-person-missing-error"),this.betreffMissingError=this.querySelector("#betreff-missing-error"),this.betragMissingError=this.querySelector("#betrag-missing-error"),this.betragInvalidError=this.querySelector("#betrag-invalid-error"),this.empfaengerMissingError=this.querySelector("#empfaenger-missing-error"),this.form=this.querySelector("#bezahlung-eintragen-form"),this.alleCheck=this.querySelector("#alle-check"),this.update()),this.formInputListener=()=>this.onFormInput(),this.form.addEventListener("input",this.formInputListener),this.betrag.focus(),this.alleClickListener=()=>this.alleClick(),this.alleCheck.addEventListener("input",this.alleClickListener),this.betreffInputListener=()=>{this.dispatchEvent(new CustomEvent("betreffChanged",{detail:this.betreff.value}))},this.betreff.addEventListener("input",this.betreffInputListener),this.betreffKeyDownListener=e=>this.betreffKeyDown(e),this.betreff.addEventListener("keydown",this.betreffKeyDownListener)}betreffKeyDown(e){var t;"Enter"==e.code&&(null===(t=this.vorschlaege)||void 0===t?void 0:t.length)>0&&this.completeBetreff(this.vorschlaege[0])}completeBetreff(e){this.betreff.value=e,this.betreffInputListener(),this.betreff.focus(),this.validateWhileManipulating()}alleClick(){let e=this.form.alle.checked;for(let t of this.empfaengerCheckboxen)t.checked=e}disconnectedCallback(){this.form.removeEventListener("input",this.formInputListener),this.alleCheck.removeEventListener("input",this.alleClickListener),this.betreff.removeEventListener("input",this.betreffInputListener),this.betreff.removeEventListener("keydown",this.betreffKeyDownListener)}onFormInput(){this.validateWhileManipulating()}validate(){if(!this.rendered)return!1;this.validationRequested=!0;let e=this.parseBetrag(),t=e.valid;return this.betragInvalidError.hidden=e.valid||e.empty,this.validateWhileManipulating()&&t}getDatum(){let e=this.datum.valueAsDate;return!e||(0,b.Z)(e,new Date)?new Date:(0,g.Z)(e)}getData(){return this.rendered?{betrag:this.parseBetrag().value,betreff:this.betreff.value,empfaenger:this.selectedEmpfaenger,bezahlendePerson:this.bezahlendePerson.value,datum:this.getDatum()}:null}setData(e){this.bezahlung=e,this.update()}parseBetrag(){this.betrag.setAttribute("type","text");let e=this.betrag.value;if(this.betrag.setAttribute("type","number"),""==e)return{valid:!1,empty:!0};e=e.replace(",","."),e=e.replace(/ /g,"");let t=parseFloat(e);return isNaN(t)?{valid:!1,empty:!1}:{valid:!0,value:t}}get bezahlendePerson(){return this.form["bezahlende-person"]}get empfaengerCheckboxen(){return this._personen.map((e=>this.form["empfaenger-"+e.id]))}get selectedEmpfaenger(){return this._personen.filter((e=>this.form["empfaenger-"+e.id].checked)).map((e=>e.id))}validateWhileManipulating(){let e={betragValid:!!this.betrag.value,betreffValid:!!this.betreff.value,zahlendePersonValid:!!this.bezahlendePerson.value,empfaengerValid:this.selectedEmpfaenger.length>0};return this.betragMissingError.hidden=!this.validationRequested||e.betragValid,this.betreffMissingError.hidden=!this.validationRequested||e.betreffValid,this.zahlendePersonMissingError.hidden=!this.validationRequested||e.zahlendePersonValid,this.empfaengerMissingError.hidden=!this.validationRequested||e.empfaengerValid,!Object.values(e).some((e=>0==e))}set personen(e){this._personen=e,this.update()}set beschreibungVorschlaege(e){this.vorschlaege=e,this.update()}update(){if(this.rendered){if(!this.bezahlungSet&&this.bezahlung){this.bezahlungSet=!0,this.betreff.value=this.bezahlung.beschreibung,this.bezahlendePerson.value=this.bezahlung.bezahlendePersonId;for(let e of this._personen)this.form["empfaenger-"+e.id].checked=!!this.bezahlung.empfaengerIds.find((t=>t==e.id));this.form.alle.checked=!this.empfaengerCheckboxen.some((e=>!e.checked)),this.datum.value=u(this.bezahlung.zeitpunkt),this.betrag.value="".concat(this.bezahlung.wert)}this.zahlendePersonRenderer.update(this._personen,((e,t)=>{e.person=t,e.radioName="bezahlende-person"})),this.empfaengerRenderer.update(this._personen,((e,t)=>{e.person=t})),this.beschreibungVorschlaegeRenderer.update(this.vorschlaege,(()=>{}))}}}const f="bezahlung-eintragen-form";customElements.define(f,p)},2204:function(e,t,n){function r(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:function(){return r}})},8059:function(e,t,n){n.d(t,{G:function(){return s}}),n(3948),n(285);class r{constructor(e){this.store=e}getWorker(){return this.worker||(this.worker=new Worker(new URL(n.p+n.u(81),n.b)),this.worker.addEventListener("message",(e=>{var t;if("statedispatch"==(null===(t=e.data)||void 0===t?void 0:t.type)){let t=e.data.msg;this.store.dispatch(t)}}))),this.worker}getBeschreibungVorschlaege(e,t){let n={kontokorrentId:e,type:1,eingabe:t};this.getWorker().postMessage(n)}resetBeschreibungenCache(){this.getWorker().postMessage({type:2})}kontokorrentOeffnen(e){let t={type:0,oeffentlicherName:e};this.getWorker().postMessage(t)}ausgleichRechnen(e,t){let n={type:3,oeffentlicherName:e,ausgleichOptions:t};this.getWorker().postMessage(n)}}function s(e){return e.get("WorkerService",(e=>new r(e.store)))}},7426:function(e,t,n){n.d(t,{xN:function(){return w}});var r=n(8843);class s{constructor(e,t){this.apiClient=e,this.db=t}async bezahlungAnlegen(e,t){let n=await this.apiClient.neueBezahlung(e,t);return this.db.addAktionen(e,[n]),n}async bezahlungBearbeiten(e,t){let n=await this.apiClient.bezahlungBearbeiten(e,t);return this.db.addAktionen(e,[n]),n}async bezahlungLoeschen(e,t){let n=await this.apiClient.bezahlungLoeschen(e,t);return this.db.addAktionen(e,[n]),n}}var i=n(886),a=n(5075),h=n(8059),l=n(9773);class o{constructor(e){this.kontokorrentId=e,this.type=6}}class c{constructor(e,t,n,r){this.kontokorrentId=e,this.bezahlungId=t,this.bearbeitungsStatus=n,this.bezahlung=r,this.type=28}}class d{constructor(e){this.kontokorrentId=e,this.type=22}}class u{constructor(e,t){this.kontokorrentId=e,this.bezahlung=t,this.type=23}}class b{constructor(e){this.kontokorrentId=e,this.type=24}}class g{constructor(e,t){this.kontokorrentId=e,this.bezahlungId=t,this.type=29}}class p{constructor(e,t,n){this.kontokorrentId=e,this.bearbeiteteBezahlungId=t,this.bezahlung=n,this.type=30}}class f{constructor(e,t){this.kontokorrentId=e,this.bezahlungId=t,this.type=31}}class m{constructor(e,t){this.kontokorrentId=e,this.bezahlungId=t,this.type=32}}class k{constructor(e,t){this.kontokorrentId=e,this.geloeschteBezahlungId=t,this.type=33}}class z{constructor(e,t){this.kontokorrentId=e,this.bezahlungId=t,this.type=34}}class v{constructor(e,t,n,r,s){this.store=e,this.db=t,this.bezahlungenService=n,this.workerService=r,this.routingActionCreator=s}async bezahlungGeoeffnet(e,t){let n=await this.db.getPerOeffentlichName(e);if(n){let e=await this.db.getBearbeitungsStatus(n.id,t),r=null;if(e.aktion){let t=e.aktion;r={beschreibung:t.bezahlung.beschreibung,bezahlendePersonId:t.bezahlung.bezahlendePersonId,empfaengerIds:t.bezahlung.empfaengerIds,id:t.bezahlung.id,status:a.Z.Gespeichert,wert:t.bezahlung.wert,zeitpunkt:t.bezahlung.zeitpunkt}}this.store.dispatch(new c(n.id,t,e.status,r)),this.workerService.getBeschreibungVorschlaege(n.id,r?r.beschreibung:null)}else this.routingActionCreator.navigateHome()}async bezahlungEintragenGeoeffnet(){let e=this.store.state.kontokorrents.activeKontokorrentId||await this.db.getZuletztGesehenerKontokorrentId();this.store.dispatch(new o(e)),this.workerService.getBeschreibungVorschlaege(e,null)}async bezahlungEintragenKontokorrentChanged(e){this.store.dispatch(new o(e)),await this.db.setZuletztGesehenerKontokorrentId(e),this.workerService.getBeschreibungVorschlaege(e,null)}async bezahlungHinzufuegen(e,t){let n=(0,i.Z)();await this.bezahlungPerSyncHinzufuegen(e,n,t)||await this.bezahlungDirektHinzufuegen(e,t,n),this.workerService.resetBeschreibungenCache()}async bezahlungPerSyncHinzufuegen(e,t,n){if(!("serviceWorker"in navigator)||!("SyncManager"in window))return console.log("background sync not supported"),!1;{let s=await navigator.serviceWorker.ready;try{let i={beschreibung:n.betreff,bezahlendePersonId:n.bezahlendePerson,empfaengerIds:n.empfaenger,id:t,wert:n.betrag,zeitpunkt:n.datum,kontokorrentId:e};await this.db.bezahlungZwischenspeichern(i),await s.sync.register(r.D),this.store.dispatch(new u(e,{beschreibung:i.beschreibung,bezahlendePersonId:i.bezahlendePersonId,empfaengerIds:i.empfaengerIds,id:i.id,wert:i.wert,zeitpunkt:i.zeitpunkt,status:a.Z.Zwischengespeichert}))}catch(e){return console.warn("background sync not allowed"),await this.db.zwischengespeicherteBezahlungErledigt(t),!1}}return!0}async bezahlungDirektHinzufuegen(e,t,n=null){let r={beschreibung:t.betreff,bezahlendePersonId:t.bezahlendePerson,empfaengerIds:t.empfaenger,id:n||(0,i.Z)(),wert:t.betrag,zeitpunkt:t.datum};this.store.dispatch(new d(e));try{let t=await this.bezahlungenService.bezahlungAnlegen(e,r);this.store.dispatch(new u(e,{beschreibung:t.bezahlung.beschreibung,bezahlendePersonId:t.bezahlung.bezahlendePersonId,empfaengerIds:t.bezahlung.empfaengerIds,id:t.bezahlung.id,wert:t.bezahlung.wert,zeitpunkt:t.bezahlung.zeitpunkt,status:a.Z.Gespeichert}))}catch(t){throw console.error(t),this.store.dispatch(new b(e)),t}}async bezahlungBearbeiten(e,t,n){let r={beschreibung:n.betreff,bezahlendePersonId:n.bezahlendePerson,empfaengerIds:n.empfaenger,id:t,wert:n.betrag,zeitpunkt:n.datum};this.store.dispatch(new g(e,t));try{let t=await this.bezahlungenService.bezahlungBearbeiten(e,r);this.store.dispatch(new p(e,t.bearbeiteteBezahlungId,{beschreibung:t.bezahlung.beschreibung,bezahlendePersonId:t.bezahlung.bezahlendePersonId,empfaengerIds:t.bezahlung.empfaengerIds,id:t.bezahlung.id,wert:t.bezahlung.wert,zeitpunkt:t.bezahlung.zeitpunkt,status:a.Z.Gespeichert}))}catch(n){throw console.error(n),this.store.dispatch(new f(e,t)),n}this.workerService.resetBeschreibungenCache()}async bezahlungLoeschen(e,t){this.store.dispatch(new m(e,t));try{let n=await this.bezahlungenService.bezahlungLoeschen(e,t);this.store.dispatch(new k(e,n.geloeschteBezahlungId))}catch(n){throw console.error(n),this.store.dispatch(new z(e,t)),n}}getBeschreibungVorschlaege(e,t){this.workerService.getBeschreibungVorschlaege(e,t)}}function w(e){return e.get("BezahlungActionCreator",(e=>new v(e.store,e.db,function(e){return e.get("NeueBezahlungService",(e=>new s(e.apiClient,e.db)))}(e),(0,h.G)(e),(0,l.b)(e))))}},5022:function(e,t,n){n.d(t,{a:function(){return r}});class r{constructor(e){this.template=e}_get(){return null==this.instance&&(this.instance=document.createElement("template"),this.instance.innerHTML=this.template),document.importNode(this.instance.content,!0)}getInstance(){return new class{constructor(e){this.r=e,this.applied=!1}apply(e){return!this.applied&&(e.appendChild(this.r._get()),this.applied=!0,!0)}isApplied(){return this.applied}}(this)}}}}]);
//# sourceMappingURL=604e0a4458a1fb0ae788.bundle.js.map