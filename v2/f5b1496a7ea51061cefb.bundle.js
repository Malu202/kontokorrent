(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[988],{882:(e,t,n)=>{"use strict";function r(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}n.d(t,{Z:()=>r})},119:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(13),s=n(882);function i(e){(0,s.Z)(1,arguments);var t=(0,r.Z)(e);return t.setHours(0,0,0,0),t}},13:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(882);function s(e){(0,r.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}},543:e=>{e.exports='<header class="app-bar"> <kontokorrent-select class="app-bar__kontokorrent-select"></kontokorrent-select> <nav class="app-bar__links"> <button id="logout-button" class="app-bar__link" title="Logout"> <span class="material-icons"> exit_to_app </span> </button> <a href="info" class="app-bar__link" title="Informationen über diese App"> <span class="material-icons"> info </span> </a> </nav> </header> <app-popup id="logout-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class="dialog__button-pane"> <button id="abort-logout" class="button">Abbrechen</button> <button id="confirm-logout" class="button">Ausloggen</button> </div> </div> </app-popup>'},814:e=>{e.exports='<input type="radio" class="bezahlende-person-radio__input"/> <label class="bezahlende-person-radio"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/> </svg> <span data-ref="label"></span> </label>'},298:e=>{e.exports='<form novalidate class="bezahlung-eintragen-form" id="bezahlung-eintragen-form"> <div id="betreff-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betreff">Betreff</label> angegeben werden.</div> <div id="betrag-invalid-error" class="alert alert--error" hidden> Der <label class="alert__field-label" for="betrag">Betrag</label> ist ungültig.</div> <div id="betrag-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betrag">Betrag</label> angegeben werden.</div> <span id="zahlende-person-missing-error" class="alert alert--error" hidden>Wähle eine Person aus die bezahlt. </span> <div id="empfaenger-missing-error" class="alert alert--error" hidden>Wähle Personen aus für die bezahlt wird. </div> <label for="betrag" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Betrag</label> <input name="betrag" id="betrag" type="number" novalidate step="any"> <label for="zahlende-person" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Diese Person zahlt</label> <div id="zahlende-person-auswahl"></div> <div class="bezahlung-eintragen-form__empfaenger-row"> <label for="empfaenger" class="bezahlung-eintragen-form__label">für diese Personen</label> <mdc-checkbox checkbox-id="alle" checkbox-name="alle" id="alle-check"></mdc-checkbox> <label for="alle">alle</label> </div> <div id="empfaenger-auswahl"></div> <label for="betreff" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Betreff</label> <input name="betreff" id="betreff" required="" type="text"> <label for="datum" class="bezahlung-eintragen-form__label bezahlung-eintragen-form__row">Datum</label> <input name="datum" id="datum" required="" type="date"> </form>'},108:e=>{e.exports='<app-bar></app-bar> <div id="bezahlung-eintragen__edit" class="bezahlung-eintragen__edit"> <div class="bezahlungen-page-menu"> <a id="zurueck-zum-kontokorrent" class="button"> <span class="material-icons"> arrow_back </span> zurück </a> <button class="button" title="speichern" id="bezahlung-eintragen__save"> <span class="material-icons"> save </span> speichern </button> </div> <div class="bezahlung-eintragen__form-container" id="bezahlung-eintragen__form-container"> <div id="save-error" class="alert alert--error" hidden>Zahlung konnte nicht gespeichert werden. </div> <bezahlung-eintragen-form> </bezahlung-eintragen-form> </div> </div> <div id="bezahlung-eintragen__saving" class="bezahlung-eintragen__saving"> <span class="spinner"></span> <span>wird gespeichert</span> </div>'},358:e=>{e.exports="<mdc-checkbox></mdc-checkbox> <label></label>"},149:e=>{e.exports='<div class="kontokorrent-select-wrapper"> <div class="kontokorrent-select"> <h1 data-ref="kontokorrent-name" class="kontokorrent-select__name">Kontokorrent</h1> <button class="kontokorrent-select__choose" title="anderen Kontokorrent wählen"> <span class="material-icons"> arrow_drop_down </span> </button> </div> <app-popup class="kontokorrent-select__popup"> <kontokorrent-select-list></kontokorrent-select-list> <div class="kontokorrent-select__buttons"> <button id="add-kontokorrent" class="button">weiteren hinzufügen</button> </div> </app-popup> </div>'},100:e=>{e.exports='<ol data-ref="list" class="kontokorrent-select-list"> </ol>'},463:e=>{e.exports='<a data-ref="link" class="kontokorrent-select-list__entry"> <span data-ref="name"></span> </a>'},680:e=>{e.exports='<div class="mdc-touch-target-wrapper"> <div class="mdc-checkbox mdc-checkbox--touch"> <input type="checkbox" class="mdc-checkbox__native-control"/> <div class="mdc-checkbox__background"> <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"> <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/> </svg> <div class="mdc-checkbox__mixedmark"></div> </div> <div class="mdc-checkbox__ripple"></div> </div> </div>'},778:(e,t,n)=>{"use strict";n.d(t,{W:()=>_});var r=n(543),s=n.n(r),i=n(445),o=n(699),a=n(149),l=n.n(a),c=n(100),h=n.n(c),d=n(600),u=n(718),p=n(463),k=n.n(p);class g extends HTMLElement{constructor(){super(),this.innerHTML=k(),this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.clickEvent=this.clickEvent.bind(this)}connectedCallback(){this.link.addEventListener("click",this.clickEvent)}clickEvent(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(e,t){this.kontokorrent=e,this.name.innerText=e.name,this.link.href=`kontokorrents/${e.id}`,this.link.classList.toggle("kontokorrent-select-list__entry--active",t)}}customElements.define("kontokorrent-select-list-entry",g);class b extends HTMLElement{constructor(){super(),this.innerHTML=h(),this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new u.T(this.list,(e=>e.id),(()=>{let e=document.createElement("li");return e.appendChild(new g),e}))}connectedCallback(){}disconnectedCallback(){}update(){this.kontokorrentsRenderer.update(this._kontokorrents,((e,t)=>{e.firstChild.update(t,this._activeKontokorrentId==t.id)}))}set kontokorrents(e){this._kontokorrents=(0,d.T)(e,(e=>e.name)),this.update()}set activeKontokorrentId(e){this._activeKontokorrentId=e,this.update()}}const m="kontokorrent-select-list";customElements.define(m,b),n(414);class v extends HTMLElement{constructor(){super(),this.innerHTML=l(),this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector(m),this.addButton=this.querySelector("#add-kontokorrent"),this._kontokorrents=null}connectedCallback(){this.popup=this.querySelector("app-popup"),this.updateAttributes(),this.addEventListener("click",(e=>{this.popup.contains(event.target)||(this.popup.toggle(),e.stopPropagation())})),this.addButton.addEventListener("click",(e=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))})),this.kontokorrentSelectList.addEventListener("gotokontokorrent",(()=>{this.popup.hide()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(e){this.kontokorrentSelectList.kontokorrents=e,this._kontokorrents=e,this.updatesStyle()}updatesStyle(){if(this._kontokorrents&&this._kontokorrents.length){let e=this._kontokorrents.find((e=>e.id==this.activeKontokorrentId));this.kontokorrentName.innerText=e?e.name:"(Kontokorrent wählen)"}}}const f="kontokorrent-select";customElements.define(f,v);var z=n(928);class y extends HTMLElement{constructor(){super(),this.innerHTML=s(),this.kontokorrentSelect=this.querySelector(f),this.logoutDialog=this.querySelector("#logout-dialog")}connectedCallback(){this.querySelector("#logout-button").addEventListener("click",(e=>{this.logoutDialog.toggle(),e.stopPropagation()})),this.querySelector("#confirm-logout").addEventListener("click",(async()=>{await this.accountActionCreator.logout()})),this.querySelector("#abort-logout").addEventListener("click",(()=>{this.logoutDialog.hide()})),(0,o.G)(this.querySelectorAll("a"),this.routingActionCreator),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.applyStoreState(this.store.state),this.kontokorrentSelect.addEventListener("addkontokorrent",(()=>{this.routingActionCreator.navigateLogin()}))}applyStoreState(e){this.kontokorrentSelect.kontokorrents=Object.values(e.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",e.kontokorrents.activeKontokorrentId)}addServices(e){this.store=e.store,this.routingActionCreator=(0,i.b)(e),this.accountActionCreator=(0,z.gg)(e)}disconnectedCallback(){this.subscription()}}const _="app-bar";customElements.define(_,y)},450:(e,t,n)=>{"use strict";n.r(t),n.d(t,{BezahlungEintragenPage:()=>D});var r=n(108),s=n.n(r),i=n(445),o=n(778);class a{constructor(e,t){this.apiClient=e,this.db=t}async bezahlungAnlegen(e,t){let n=await this.apiClient.neueBezahlung(e,t);return this.db.addAktionen(e,[n]),n}}var l=n(586),c=n(1);class h{constructor(e){this.kontokorrentId=e,this.type=6}}class d{constructor(e){this.kontokorrentId=e,this.type=22}}class u{constructor(e,t){this.kontokorrentId=e,this.bezahlung=t,this.type=23}}class p{constructor(e){this.kontokorrentId=e,this.type=24}}class k{constructor(e,t,n){this.store=e,this.db=t,this.neueBezahlungService=n}async bezahlungEintragenGeoeffnet(){let e=this.store.state.kontokorrents.activeKontokorrentId||await this.db.getZuletztGesehenerKontokorrentId();this.store.dispatch(new h(e))}async bezahlungEintragenKontokorrentChanged(e){this.store.dispatch(new h(e)),await this.db.setZuletztGesehenerKontokorrentId(e)}async bezahlungHinzufuegen(e,t){let n=!1,r=(0,l.Z)(),s={beschreibung:t.betreff,bezahlendePersonId:t.bezahlendePerson,empfaengerIds:t.empfaenger,id:r,wert:t.betrag,zeitpunkt:t.datum};if("serviceWorker"in navigator&&"SyncManager"in window){let s=await navigator.serviceWorker.ready;try{let n={beschreibung:t.betreff,bezahlendePersonId:t.bezahlendePerson,empfaengerIds:t.empfaenger,id:r,wert:t.betrag,zeitpunkt:t.datum,kontokorrentId:e};await this.db.bezahlungZwischenspeichern(n),await s.sync.register("NeueBezahlungBackgroundSync"),this.store.dispatch(new u(e,{beschreibung:n.beschreibung,bezahlendePersonId:n.bezahlendePersonId,empfaengerIds:n.empfaengerIds,id:n.id,wert:n.wert,zeitpunkt:n.zeitpunkt,status:c.Z.Zwischengespeichert}))}catch(e){console.warn("background sync not allowed"),await this.db.zwischengespeicherteBezahlungErledigt(r),n=!0}}else console.log("background sync not supported"),n=!0;if(n){this.store.dispatch(new d(e));try{let t=await this.neueBezahlungService.bezahlungAnlegen(e,s);this.store.dispatch(new u(e,{beschreibung:t.bezahlung.beschreibung,bezahlendePersonId:t.bezahlung.bezahlendePersonId,empfaengerIds:t.bezahlung.empfaengerIds,id:t.bezahlung.id,wert:t.bezahlung.wert,zeitpunkt:t.bezahlung.zeitpunkt,status:c.Z.Gespeichert}))}catch(t){throw console.error(t),this.store.dispatch(new p(e)),t}}}}var g=n(699),b=n(298),m=n.n(b),v=n(718),f=n(814),z=n.n(f);class y extends HTMLElement{constructor(){super(),this.innerHTML=z(),this.input=this.querySelector("input"),this.personLabel=this.querySelector('[data-ref="label"]'),this.label=this.querySelector("label")}connectedCallback(){}disconnectedCallback(){}set radioName(e){this.input.name=e}set person(e){this.input.value=e.id,this.personLabel.innerText=e.name,this.input.id=e.id,this.label.setAttribute("for",e.id)}}customElements.define("bezahlende-person-radio-button",y);var _=n(358),w=n.n(_),E=n(317),S=n(680),L=n.n(S);const C=new E.a(L()),x="checkbox-id",q="checkbox-name";class I extends HTMLElement{constructor(){super(),this.appendChild(C.get()),this.nativeControl=this.querySelector(".mdc-checkbox__native-control")}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.nativeControl.id=this.getAttribute(x),this.nativeControl.name=this.getAttribute(q)}static get observedAttributes(){return[x,q]}}customElements.define("mdc-checkbox",I);const A=new E.a(w());class M extends HTMLElement{constructor(){super(),this.appendChild(A.get()),this.mdcCheckBox=this.querySelector("mdc-checkbox"),this.label=this.querySelector("label")}set person(e){this.label.innerText=e.name;const t=`empfaenger-${e.id}`;this.label.setAttribute("for",t),this.mdcCheckBox.setAttribute("checkbox-id",t),this.mdcCheckBox.setAttribute("checkbox-name",t)}connectedCallback(){}disconnectedCallback(){}}customElements.define("empfaenger-checkbox",M);var T=n(119),B=n(882),K=n(13);class H extends HTMLElement{constructor(){var e,t;super(),this.validationRequested=!1,this.innerHTML=m(),this.empfaengerAuswahl=this.querySelector("#empfaenger-auswahl"),this.zahlendePersonRenderer=new v.T(this.querySelector("#zahlende-person-auswahl"),(e=>e.id),(e=>new y)),this.empfaengerRenderer=new v.T(this.empfaengerAuswahl,(e=>e.id),(e=>new M)),this.datum=this.querySelector("#datum"),this.datum.value=(e=new Date,(t=new Date(e)).setMinutes(e.getMinutes()-e.getTimezoneOffset()),t.toJSON().slice(0,10)),this.betrag=this.querySelector("#betrag"),this.betreff=this.querySelector("#betreff"),this.zahlendePersonMissingError=this.querySelector("#zahlende-person-missing-error"),this.betreffMissingError=this.querySelector("#betreff-missing-error"),this.betragMissingError=this.querySelector("#betrag-missing-error"),this.betragInvalidError=this.querySelector("#betrag-invalid-error"),this.empfaengerMissingError=this.querySelector("#empfaenger-missing-error"),this.form=this.querySelector("#bezahlung-eintragen-form"),this.alleCheck=this.querySelector("#alle-check")}connectedCallback(){this.formInputListener=()=>this.onFormInput(),this.form.addEventListener("input",this.formInputListener),this.betrag.focus(),this.alleClickListener=()=>this.alleClick(),this.alleCheck.addEventListener("input",this.alleClickListener)}alleClick(){let e=this.form.alle.checked;for(let t of this.empfaengerCheckboxen)t.checked=e}disconnectedCallback(){this.form.removeEventListener("input",this.formInputListener),this.alleCheck.removeEventListener("input",this.alleClickListener)}onFormInput(){this.validateWhileManipulating()}validate(){this.validationRequested=!0;let e=this.parseBetrag(),t=e.valid;return this.betragInvalidError.hidden=e.valid||e.empty,this.validateWhileManipulating()&&t}getDatum(){let e=this.datum.valueAsDate;return!e||function(e,t){(0,B.Z)(2,arguments);var n=(0,T.Z)(e),r=(0,T.Z)(t);return n.getTime()===r.getTime()}(e,new Date)?new Date:function(e){(0,B.Z)(1,arguments);var t=(0,K.Z)(e);return t.setHours(23,59,59,999),t}(e)}getData(){return{betrag:this.parseBetrag().value,betreff:this.betreff.value,empfaenger:this.selectedEmpfaenger,bezahlendePerson:this.bezahlendePerson.value,datum:this.getDatum()}}parseBetrag(){this.betrag.setAttribute("type","text");let e=this.betrag.value;if(this.betrag.setAttribute("type","number"),""==e)return{valid:!1,empty:!0};e=e.replace(",","."),e=e.replace(/ /g,"");let t=parseFloat(e);return isNaN(t)?{valid:!1,empty:!1}:{valid:!0,value:t}}get bezahlendePerson(){return this.form["bezahlende-person"]}get empfaengerCheckboxen(){return this._personen.map((e=>this.form["empfaenger-"+e.id]))}get selectedEmpfaenger(){return this._personen.filter((e=>this.form["empfaenger-"+e.id].checked)).map((e=>e.id))}validateWhileManipulating(){let e={betragValid:!!this.betrag.value,betreffValid:!!this.betreff.value,zahlendePersonValid:!!this.bezahlendePerson.value,empfaengerValid:this.selectedEmpfaenger.length>0};return this.betragMissingError.hidden=!this.validationRequested||e.betragValid,this.betreffMissingError.hidden=!this.validationRequested||e.betreffValid,this.zahlendePersonMissingError.hidden=!this.validationRequested||e.zahlendePersonValid,this.empfaengerMissingError.hidden=!this.validationRequested||e.empfaengerValid,!Object.values(e).some((e=>0==e))}set personen(e){this._personen=e,this.zahlendePersonRenderer.update(e,((e,t)=>{e.person=t,e.radioName="bezahlende-person"})),this.empfaengerRenderer.update(e,((e,t)=>{e.person=t}))}}const P="bezahlung-eintragen-form";customElements.define(P,H);class D extends HTMLElement{constructor(){super(),this.innerHTML=s(),this.zurueckLink=this.querySelector("#zurueck-zum-kontokorrent"),this.appBar=this.querySelector(o.W),this.bezahlungEintragenForm=this.querySelector(P),this.saveButton=this.querySelector("#bezahlung-eintragen__save"),this.editingSection=this.querySelector("#bezahlung-eintragen__edit"),this.savingSection=this.querySelector("#bezahlung-eintragen__saving"),this.saveError=this.querySelector("#save-error"),this.formContainer=this.querySelector("#bezahlung-eintragen__form-container")}addServices(e){this.store=e.store,this.routingActionCreator=(0,i.b)(e),this.bezahlungActionCreator=function(e){return e.get("BezahlungActionCreator",(e=>new k(e.store,e.db,function(e){return e.get("NeueBezahlungService",(e=>new a(e.apiClient,e.db)))}(e))))}(e),this.appBar.addServices(e)}connectedCallback(){this.subscription=this.store.subscribe("kontokorrents",(e=>this.applyStoreState(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail)})),this.bezahlungActionCreator.bezahlungEintragenGeoeffnet(),(0,g.G)([this.zurueckLink],this.routingActionCreator),this.applyStoreState(this.store.state),this.saveEventListener=()=>this.save(),this.saveButton.addEventListener("click",this.saveEventListener)}async save(){if(this.bezahlungEintragenForm.validate()){let e=this.bezahlungEintragenForm.getData();await this.bezahlungActionCreator.bezahlungHinzufuegen(this.kontokorrentId,e),this.routingActionCreator.navigateKontokorrent(this.kontokorrentId,!0)}else this.formContainer.scrollTop=0}applyStoreState(e){this.zurueckLink.href=e.kontokorrents.activeKontokorrentId?`kontokorrents/${e.kontokorrents.activeKontokorrentId}`:null,e.kontokorrents.activeKontokorrentId&&(this.bezahlungEintragenForm.personen=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].personen,this.editingSection.style.display=0==e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen?"none":"flex",this.savingSection.style.display=0!=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen?"none":"flex",this.saveError.hidden=2!=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].bezahlungAnlegen),this.kontokorrentId=e.kontokorrents.activeKontokorrentId}disconnectedCallback(){this.subscription(),this.saveButton.removeEventListener("click",this.saveEventListener)}}customElements.define("bezahlung-eintragen-page",D)},699:(e,t,n)=>{"use strict";function r(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:()=>r})},414:(e,t,n)=>{"use strict";class r extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(e){"Escape"==e.key&&this.hide()}clickListener(e){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",r)},718:(e,t,n)=>{"use strict";n.d(t,{T:()=>r});class r{constructor(e,t,n){this.listElement=e,this.keySelector=t,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(e,t){let n=new Map,r=e=>n.get(e)||(()=>{let t=this.keySelector(e);return n.set(e,t),t})();for(let n of Array.from(this.listElement.children)){let s=n,i=e.find((e=>this.elementToKey.get(s)==r(e)));i?t(s,i):this.listElement.removeChild(s)}let s=null,i=new Map;for(let n of e){let e=r(n),o=this.keyToElement.get(e);o||(o=this.createElement(n),t(o,n),this.elementToKey.set(o,e)),i.set(e,o),null==s&&o!=this.listElement.firstElementChild?this.listElement.prepend(o):null!=s&&s.nextElementSibling!=o&&s.insertAdjacentElement("afterend",o),s=o}this.keyToElement=i}}},317:(e,t,n)=>{"use strict";n.d(t,{a:()=>r});class r{constructor(e){this.template=e}get(){return null==this.instance&&(this.instance=document.createElement("template"),this.instance.innerHTML=this.template),document.importNode(this.instance.content,!0)}}}}]);
//# sourceMappingURL=f5b1496a7ea51061cefb.bundle.js.map