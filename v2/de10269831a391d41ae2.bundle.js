(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[999],{882:(e,t,n)=>{"use strict";function r(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}n.d(t,{Z:()=>r})},119:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(13),s=n(882);function i(e){(0,s.Z)(1,arguments);var t=(0,r.Z)(e);return t.setHours(0,0,0,0),t}},13:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(882);function s(e){(0,r.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}},543:e=>{e.exports='<header class="app-bar"> <kontokorrent-select class="app-bar__kontokorrent-select"></kontokorrent-select> <nav class="app-bar__links"> <button id="logout-button" class="app-bar__link" title="Logout"> <span class="material-icons"> exit_to_app </span> </button> <a href="info" class="app-bar__link" title="Informationen über diese App"> <span class="material-icons"> info </span> </a> </nav> </header> <app-popup id="logout-dialog"> <div class="dialog__backdrop"></div> <div class="dialog"> <p> Wirklich aus allen Kontokorrents ausloggen? </p> <div class="dialog__button-pane"> <button id="abort-logout" class="button">Abbrechen</button> <button id="confirm-logout" class="button">Ausloggen</button> </div> </div> </app-popup>'},814:e=>{e.exports='<input type="radio" class="bezahlende-person-radio__input"/> <label class="bezahlende-person-radio"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M0 0h24v24H0z" fill="none"/> <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/> </svg> <span data-ref="label"></span> </label>'},298:e=>{e.exports='<form novalidate class="bezahlung-eintragen-form" id="bezahlung-eintragen-form"> <div id="betreff-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betreff">Betreff</label> angegeben werden.</div> <div id="betrag-invalid-error" class="alert alert--error" hidden> Der <label class="alert__field-label" for="betreff">Betrag</label> ist ungültig.</div> <div id="betrag-missing-error" class="alert alert--error" hidden>Es muss ein <label class="alert__field-label" for="betrag">Betrag</label> angegeben werden.</div> <span id="zahlende-person-missing-error" class="alert alert--error" hidden>Wähle eine Person aus die bezahlt. </span> <div id="empfaenger-missing-error" class="alert alert--error" hidden>Wähle Personen aus für die bezahlt wird. </div> <label for="betrag" class="bezahlung-eintragen-form__label">Betrag</label> <input name="betrag" id="betrag" type="number" novalidate step="any"> <label for="zahlende-person" class="bezahlung-eintragen-form__label">Diese Person zahlt</label> <div id="zahlende-person-auswahl"></div> <label for="empfaenger" class="bezahlung-eintragen-form__label">für diese Personen</label> <div id="empfaenger-auswahl"></div> <label for="betreff" class="bezahlung-eintragen-form__label">Betreff</label> <input name="betreff" id="betreff" required="" type="text"> <label for="datum" class="bezahlung-eintragen-form__label">Datum</label> <input name="datum" id="datum" required="" type="date"> </form>'},108:e=>{e.exports='<app-bar></app-bar> <div class="bezahlungen-page-menu"> <a id="zurueck-zum-kontokorrent" class="button"> <span class="material-icons"> arrow_back </span> zurück </a> <button class="button" title="speichern" id="bezahlung-eintragen__save"> <span class="material-icons"> save </span> speichern </button> </div> <div class="bezahlungen-page__form-container"> <bezahlung-eintragen-form> </bezahlung-eintragen-form> </div>'},358:e=>{e.exports="<mdc-checkbox></mdc-checkbox> <label></label>"},149:e=>{e.exports='<div class="kontokorrent-select-wrapper"> <div class="kontokorrent-select"> <h1 data-ref="kontokorrent-name" class="kontokorrent-select__name">Kontokorrent</h1> <button class="kontokorrent-select__choose" title="anderen Kontokorrent wählen"> <span class="material-icons"> arrow_drop_down </span> </button> </div> <app-popup class="kontokorrent-select__popup"> <kontokorrent-select-list></kontokorrent-select-list> <div class="kontokorrent-select__buttons"> <button id="add-kontokorrent" class="button">weiteren hinzufügen</button> </div> </app-popup> </div>'},100:e=>{e.exports='<ol data-ref="list" class="kontokorrent-select-list"> </ol>'},463:e=>{e.exports='<a data-ref="link" class="kontokorrent-select-list__entry"> <span data-ref="name"></span> </a>'},680:e=>{e.exports='<div class="mdc-touch-target-wrapper"> <div class="mdc-checkbox mdc-checkbox--touch"> <input type="checkbox" class="mdc-checkbox__native-control"/> <div class="mdc-checkbox__background"> <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"> <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/> </svg> <div class="mdc-checkbox__mixedmark"></div> </div> <div class="mdc-checkbox__ripple"></div> </div> </div>'},778:(e,t,n)=>{"use strict";n.d(t,{W:()=>S});var r=n(543),s=n.n(r),i=n(445),o=n(699),a=n(149),l=n.n(a),c=n(100),h=n.n(c),d=n(600),u=n(718),p=n(463),k=n.n(p);class b extends HTMLElement{constructor(){super(),this.innerHTML=k(),this.name=this.querySelector('[data-ref="name"]'),this.link=this.querySelector('[data-ref="link"]'),this.clickEvent=this.clickEvent.bind(this)}connectedCallback(){this.link.addEventListener("click",this.clickEvent)}clickEvent(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("gotokontokorrent",{detail:this.kontokorrent.id,bubbles:!0}))}disconnectedCallback(){this.link.removeEventListener("click",this.clickEvent)}update(e,t){this.kontokorrent=e,this.name.innerText=e.name,this.link.href=`kontokorrents/${e.id}`,this.link.classList.toggle("kontokorrent-select-list__entry--active",t)}}customElements.define("kontokorrent-select-list-entry",b);class g extends HTMLElement{constructor(){super(),this.innerHTML=h(),this.list=this.querySelector('[data-ref="list"]'),this._kontokorrents=[],this.kontokorrentsRenderer=new u.T(this.list,(e=>e.id),(()=>{let e=document.createElement("li");return e.appendChild(new b),e}))}connectedCallback(){}disconnectedCallback(){}update(){this.kontokorrentsRenderer.update(this._kontokorrents,((e,t)=>{e.firstChild.update(t,this._activeKontokorrentId==t.id)}))}set kontokorrents(e){this._kontokorrents=(0,d.T)(e,(e=>e.name)),this.update()}set activeKontokorrentId(e){this._activeKontokorrentId=e,this.update()}}const m="kontokorrent-select-list";customElements.define(m,g),n(414);class v extends HTMLElement{constructor(){super(),this.innerHTML=l(),this.kontokorrentName=this.querySelector('[data-ref="kontokorrent-name"]'),this.kontokorrentSelectList=this.querySelector(m),this.addButton=this.querySelector("#add-kontokorrent"),this._kontokorrents=null}connectedCallback(){this.popup=this.querySelector("app-popup"),this.updateAttributes(),this.addEventListener("click",(e=>{this.popup.contains(event.target)||(this.popup.toggle(),e.stopPropagation())})),this.addButton.addEventListener("click",(e=>{this.dispatchEvent(new CustomEvent("addkontokorrent"))})),this.kontokorrentSelectList.addEventListener("gotokontokorrent",(()=>{this.popup.hide()}))}disconnectedCallback(){}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.activeKontokorrentId=this.getAttribute("active-kontokorrent-id"),this.kontokorrentSelectList.activeKontokorrentId=this.activeKontokorrentId,this.updatesStyle()}static get observedAttributes(){return["active-kontokorrent-id"]}set kontokorrents(e){this.kontokorrentSelectList.kontokorrents=e,this._kontokorrents=e,this.updatesStyle()}updatesStyle(){if(this._kontokorrents&&this._kontokorrents.length){let e=this._kontokorrents.find((e=>e.id==this.activeKontokorrentId));this.kontokorrentName.innerText=e?e.name:"(Kontokorrent wählen)"}}}const f="kontokorrent-select";customElements.define(f,v);var y=n(928);class E extends HTMLElement{constructor(){super(),this.innerHTML=s(),this.kontokorrentSelect=this.querySelector(f),this.logoutDialog=this.querySelector("#logout-dialog")}connectedCallback(){this.querySelector("#logout-button").addEventListener("click",(e=>{this.logoutDialog.toggle(),e.stopPropagation()})),this.querySelector("#confirm-logout").addEventListener("click",(()=>{return e=this,t=void 0,r=function*(){yield this.accountActionCreator.logout()},new((n=void 0)||(n=Promise))((function(s,i){function o(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}l((r=r.apply(e,t||[])).next())}));var e,t,n,r})),this.querySelector("#abort-logout").addEventListener("click",(()=>{this.logoutDialog.hide()})),(0,o.G)(this.querySelectorAll("a"),this.routingActionCreator),this.subscription=this.store.subscribe(null,(e=>this.applyStoreState(e))),this.applyStoreState(this.store.state),this.kontokorrentSelect.addEventListener("addkontokorrent",(()=>{this.routingActionCreator.navigateLogin()}))}applyStoreState(e){this.kontokorrentSelect.kontokorrents=Object.values(e.kontokorrents.kontokorrents),this.kontokorrentSelect.setAttribute("active-kontokorrent-id",e.kontokorrents.activeKontokorrentId)}addServices(e){this.store=e.store,this.routingActionCreator=(0,i.b)(e),this.accountActionCreator=(0,y.gg)(e)}disconnectedCallback(){this.subscription()}}const S="app-bar";customElements.define(S,E)},528:(e,t,n)=>{"use strict";n.r(t),n.d(t,{BezahlungEintragenPage:()=>M});var r=n(108),s=n.n(r),i=n(445),o=n(778),a=function(e,t,n,r){return new(n||(n=Promise))((function(s,i){function o(e){try{l(r.next(e))}catch(e){i(e)}}function a(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}l((r=r.apply(e,t||[])).next())}))};class l{constructor(e){this.kontokorrentId=e,this.type=6}}class c{constructor(e,t){this.store=e,this.db=t}bezahlungEintragenGeoeffnet(){return a(this,void 0,void 0,(function*(){let e=this.store.state.kontokorrents.activeKontokorrentId||(yield this.db.getZuletztGesehenerKontokorrentId());this.store.dispatch(new l(e))}))}bezahlungEintragenKontokorrentChanged(e){return a(this,void 0,void 0,(function*(){this.store.dispatch(new l(e)),yield this.db.setZuletztGesehenerKontokorrentId(e)}))}}var h=n(699),d=n(298),u=n.n(d),p=n(718),k=n(814),b=n.n(k);class g extends HTMLElement{constructor(){super(),this.innerHTML=b(),this.input=this.querySelector("input"),this.personLabel=this.querySelector('[data-ref="label"]'),this.label=this.querySelector("label")}connectedCallback(){}disconnectedCallback(){}set radioName(e){this.input.name=e}set person(e){this.input.value=e.id,this.personLabel.innerText=e.name,this.input.id=e.id,this.label.setAttribute("for",e.id)}}customElements.define("bezahlende-person-radio-button",g);var m=n(358),v=n.n(m),f=n(317),y=n(680),E=n.n(y);const S=new f.a(E());class _ extends HTMLElement{constructor(){super(),this.appendChild(S.get()),this.nativeControl=this.querySelector(".mdc-checkbox__native-control")}connectedCallback(){}disconnectedCallback(){}set checkboxId(e){this.nativeControl.id=e}set checkboxName(e){this.nativeControl.name=e}}customElements.define("mdc-checkbox",_);const w=new f.a(v());class z extends HTMLElement{constructor(){super(),this.appendChild(w.get()),this.mdcCheckBox=this.querySelector("mdc-checkbox"),this.label=this.querySelector("label")}set person(e){this.label.innerText=e.name;const t=`empfaenger-${e.id}`;this.label.setAttribute("for",t),this.mdcCheckBox.checkboxId=t,this.mdcCheckBox.checkboxName=t}connectedCallback(){}disconnectedCallback(){}}customElements.define("empfaenger-checkbox",z);var L=n(119),x=n(882);class C extends HTMLElement{constructor(){var e,t;super(),this.validationRequested=!1,this.innerHTML=u(),this.empfaengerAuswahl=this.querySelector("#empfaenger-auswahl"),this.zahlendePersonRenderer=new p.T(this.querySelector("#zahlende-person-auswahl"),(e=>e.id),(e=>new g)),this.empfaengerRenderer=new p.T(this.empfaengerAuswahl,(e=>e.id),(e=>new z)),this.datum=this.querySelector("#datum"),this.datum.value=(e=new Date,(t=new Date(e)).setMinutes(e.getMinutes()-e.getTimezoneOffset()),t.toJSON().slice(0,10)),this.betrag=this.querySelector("#betrag"),this.betreff=this.querySelector("#betreff"),this.zahlendePersonMissingError=this.querySelector("#zahlende-person-missing-error"),this.betreffMissingError=this.querySelector("#betreff-missing-error"),this.betragMissingError=this.querySelector("#betrag-missing-error"),this.betragInvalidError=this.querySelector("#betrag-invalid-error"),this.empfaengerMissingError=this.querySelector("#empfaenger-missing-error"),this.form=this.querySelector("#bezahlung-eintragen-form")}connectedCallback(){this.formInputListener=()=>this.onFormInput(),this.form.addEventListener("input",this.formInputListener)}disconnectedCallback(){this.form.removeEventListener("input",this.formInputListener)}onFormInput(){this.validateWhileManipulating()}validate(){this.validationRequested=!0;let e=this.parseBetrag(),t=e.valid;return this.betragInvalidError.hidden=e.valid||e.empty,this.validateWhileManipulating()&&t}getDatum(){let e=this.datum.valueAsDate;return!e||function(e,t){(0,x.Z)(2,arguments);var n=(0,L.Z)(e),r=(0,L.Z)(t);return n.getTime()===r.getTime()}(e,new Date)?new Date:(0,L.Z)(e)}getData(){return{betrag:this.parseBetrag().value,betreff:this.betreff.value,empfaenger:this.selectedEmpfaenger,bezahlendePerson:this.bezahlendePerson.value,datum:this.getDatum()}}parseBetrag(){this.betrag.setAttribute("type","text");let e=this.betrag.value;if(""==e)return{valid:!1,empty:!0};this.betrag.setAttribute("type","number"),e=e.replace(",","."),e=e.replace(/ /g,"");let t=parseFloat(e);return isNaN(t)?{valid:!1,empty:!1}:{valid:!0,value:t}}get bezahlendePerson(){return this.form["bezahlende-person"]}get selectedEmpfaenger(){return this._personen.filter((e=>this.form["empfaenger-"+e.id].checked)).map((e=>e.id))}validateWhileManipulating(){let e={betragValid:!!this.betrag.value,betreffValid:!!this.betreff.value,zahlendePersonValid:!!this.bezahlendePerson.value,empfaengerValid:this.selectedEmpfaenger.length>0};return this.betragMissingError.hidden=!this.validationRequested||e.betragValid,this.betreffMissingError.hidden=!this.validationRequested||e.betreffValid,this.zahlendePersonMissingError.hidden=!this.validationRequested||e.zahlendePersonValid,this.empfaengerMissingError.hidden=!this.validationRequested||e.empfaengerValid,!Object.values(e).some((e=>0==e))}set personen(e){this._personen=e,this.zahlendePersonRenderer.update(e,((e,t)=>{e.person=t,e.radioName="bezahlende-person"})),this.empfaengerRenderer.update(e,((e,t)=>{e.person=t}))}}const q="bezahlung-eintragen-form";customElements.define(q,C);class M extends HTMLElement{constructor(){super(),this.innerHTML=s(),this.zurueckLink=this.querySelector("#zurueck-zum-kontokorrent"),this.appBar=this.querySelector(o.W),this.bezahlungEintragenForm=this.querySelector(q),this.saveButton=this.querySelector("#bezahlung-eintragen__save")}addServices(e){this.store=e.store,this.routingActionCreator=(0,i.b)(e),this.bezahlungActionCreator=function(e){return e.get("BezahlungActionCreator",(e=>new c(e.store,e.db)))}(e),this.appBar.addServices(e)}connectedCallback(){this.subscription=this.store.subscribe("kontokorrents",(e=>this.applyStoreState(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail)})),this.bezahlungActionCreator.bezahlungEintragenGeoeffnet(),(0,h.G)([this.zurueckLink],this.routingActionCreator),this.applyStoreState(this.store.state),this.saveEventListener=()=>this.save(),this.saveButton.addEventListener("click",this.saveEventListener)}save(){this.bezahlungEintragenForm.validate()&&this.bezahlungEintragenForm.getData()}applyStoreState(e){this.zurueckLink.href=e.kontokorrents.activeKontokorrentId?`kontokorrents/${e.kontokorrents.activeKontokorrentId}`:null,e.kontokorrents.activeKontokorrentId&&(this.bezahlungEintragenForm.personen=e.kontokorrents.kontokorrents[e.kontokorrents.activeKontokorrentId].personen)}disconnectedCallback(){this.subscription(),this.saveButton.removeEventListener("click",this.saveEventListener)}}customElements.define("bezahlung-eintragen-page",M)},699:(e,t,n)=>{"use strict";function r(e,t){e.forEach((e=>{e.addEventListener("click",(n=>{n.preventDefault(),t.navigate(e.getAttribute("href"))}))}))}n.d(t,{G:()=>r})},414:(e,t,n)=>{"use strict";class r extends HTMLElement{constructor(){super(),this.popupShown=!1,this.keyListener=this.keyListener.bind(this),this.clickListener=this.clickListener.bind(this)}connectedCallback(){this.updateStyles()}keyListener(e){"Escape"==e.key&&this.hide()}clickListener(e){this.contains(event.target)||this.hide()}hide(){this.popupShown&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("click",this.clickListener),this.popupShown=!1,this.updateStyles())}show(){this.popupShown||(document.addEventListener("keydown",this.keyListener),document.addEventListener("click",this.clickListener),this.popupShown=!0,this.updateStyles())}updateStyles(){this.style.display=this.popupShown?"block":"none"}toggle(){this.popupShown?this.hide():this.show()}disconnectedCallback(){this.hide()}}customElements.define("app-popup",r)},718:(e,t,n)=>{"use strict";n.d(t,{T:()=>r});class r{constructor(e,t,n){this.listElement=e,this.keySelector=t,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(e,t){let n=new Map,r=e=>n.get(e)||(()=>{let t=this.keySelector(e);return n.set(e,t),t})();for(let n of Array.from(this.listElement.children)){let s=n,i=e.find((e=>this.elementToKey.get(s)==r(e)));i?t(s,i):this.listElement.removeChild(s)}let s=null,i=new Map;for(let n of e){let e=r(n),o=this.keyToElement.get(e);o||(o=this.createElement(n),t(o,n),this.elementToKey.set(o,e)),i.set(e,o),null==s&&o!=this.listElement.firstElementChild?this.listElement.prepend(o):null!=s&&s.nextElementSibling!=o&&s.insertAdjacentElement("afterend",o),s=o}this.keyToElement=i}}},317:(e,t,n)=>{"use strict";n.d(t,{a:()=>r});class r{constructor(e){this.template=e}get(){return null==this.instance&&(this.instance=document.createElement("template"),this.instance.innerHTML=this.template),document.importNode(this.instance.content,!0)}}}}]);
//# sourceMappingURL=de10269831a391d41ae2.bundle.js.map