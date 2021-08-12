"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[468],{1468:function(e,t,n){n.r(t),n.d(t,{MultiBezahlungEintragenPage:function(){return b}}),n(5306),n(3948);var r=n(9773),a=n(7160),s=n(7426),i=(n(4729),n(5243)),o=n(3767),l=n(6029),h=n(2204),u=n(2033);class d extends HTMLElement{constructor(){super(),this.rendered=!1,this.pendingdata=!1}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<button class="button" data-ref="remove">entfernen</button> <span data-ref="datum"></span> <input type="text" data-ref="betreff"/> <span data-ref="betrag"></span> <span data-ref="status"></span>',this.datumText=this.querySelector('[data-ref="datum"]'),this.betreffInput=this.querySelector('[data-ref="betreff"]'),this.betragText=this.querySelector('[data-ref="betrag"]'),this.removeBtn=this.querySelector('[data-ref="remove"]'),this.status=this.querySelector('[data-ref="status"]'),this.updateStyle()),this.removeClickListener=()=>this.removeClick(),this.removeBtn.addEventListener("click",this.removeClickListener)}removeClick(){this.dispatchEvent(new CustomEvent("removebezahlung"))}disconnectedCallback(){this.removeBtn.removeEventListener("click",this.removeClickListener)}setData(e){this.betrag=e.betrag,this.betreff=e.betreff,this.datum=e.datum,this.done=e.done,this.error=e.error,this.pendingdata=!0,this.updateStyle()}updateStyle(){this.rendered&&this.pendingdata&&(this.pendingdata=!1,this.betragText.innerText=(0,u.x)(this.betrag),this.datumText.innerText=(new Intl.DateTimeFormat).format(this.datum),this.betreffInput.value=this.betreff,this.status.innerText=this.error?"Fehler":this.done?"gespeichert":"")}getData(){return{betreff:this.betreffInput.value}}}customElements.define("multi-bezahlung-zeile",d);var c=n(3520);const p=[{name:"BAWAG",seperator:/\t/g,mappings:[{typ:"betreff",column:1,parse:e=>e.replace(/\d{2,}/g,"").replace(/\s+/g," ")},{typ:"datum",column:2,parse:e=>(0,i.Z)(e,"P",new Date,{locale:o.Z})},{typ:"betrag",column:4,parse:e=>-parseFloat(e.replace(".","").replace(",",".").replace(/ /g,""))}]}];class b extends HTMLElement{constructor(){super(),this.rendered=!1}addServices(e){this.store=e.store,this.routingActionCreator=(0,r.b)(e),this.bezahlungActionCreator=(0,s.xN)(e),this.serviceLocator=e}connectedCallback(){this.rendered||(this.rendered=!0,this.innerHTML='<app-bar></app-bar> <a id="zurueck-zum-kontokorrent" class="button"> <span class="material-icons"> arrow_back </span> zurück </a> <form id="multi-bezahlung-form" novalidate> <label for="zahlende-person">Diese Person zahlt</label> <div id="zahlende-person-auswahl"></div> </form> <div id="bezahlungen-table"> </div> <button class="button" title="speichern" id="save"> <span class="material-icons"> save </span> alle speichern </button>',this.appBar=this.querySelector(a.W),this.appBar.addServices(this.serviceLocator)),this.bezahlungenTable=this.querySelector("#bezahlungen-table"),this.bezahlungenRenderer=new l.T(this.bezahlungenTable,(e=>e.id),(e=>{let t=new d;return t.addEventListener("removebezahlung",(()=>{this.bezahlungen.splice(this.bezahlungen.indexOf(e),1),this.renderBezahlungen()})),t.addEventListener("change",(()=>{e.betreff=t.getData().betreff})),t})),this.zahlendePersonRenderer=new l.T(this.querySelector("#zahlende-person-auswahl"),(e=>e.id),(e=>new c.x)),this.kontokorrentsSubscription=this.store.subscribe("kontokorrents",(e=>this.applyStoreState(e))),this.appBar.addEventListener("gotokontokorrent",(e=>{this.bezahlungActionCreator.bezahlungEintragenKontokorrentChanged(e.detail)})),this.bezahlungActionCreator.bezahlungEintragenGeoeffnet(),this.applyStoreState(this.store.state),this.onPasteHandler=e=>this.onPaste(e),this.saveHandler=()=>this.save(),this.saveBtn=this.querySelector("#save"),this.form=this.querySelector("#multi-bezahlung-form"),this.saveBtn.addEventListener("click",this.saveHandler),document.addEventListener("paste",this.onPasteHandler),(0,h.G)([this.querySelector("#zurueck-zum-kontokorrent")],this.routingActionCreator)}async save(){for(let e of this.bezahlungen){try{await this.bezahlungActionCreator.bezahlungDirektHinzufuegen(this.kontokorrentId,{betrag:e.betrag,betreff:e.betreff,bezahlendePerson:this.form["bezahlende-person"].value,datum:e.datum,empfaenger:this.personen.map((e=>e.id))}),e.done=!0}catch(t){e.error=!0,console.error(t)}this.renderBezahlungen()}}onPaste(e){let t=e.clipboardData.getData("text/plain");if(t){let e=t.split(/\r\n|\n|\r/g);var n=p.map((t=>{let n=0;return e.map((e=>{let r=e.split(t.seperator);if(r.length<t.mappings.map((e=>e.column)).sort(((e,t)=>t-e))[0])return null;let a={};for(let e of t.mappings){let t=e.parse(r[e.column]);switch(typeof t){case"number":if(isNaN(t))return null;break;case"object":if(isNaN(t.getTime()))return null}a[e.typ]=t}return Object.assign(Object.assign({},a),{id:++n,done:!1,error:!1})})).filter((e=>null!=e))})).filter((e=>e.length>0));n.length>0&&(this.bezahlungen=n.sort(((e,t)=>t.length-e.length))[0],this.renderBezahlungen())}}renderBezahlungen(){this.bezahlungenRenderer.update(this.bezahlungen,((e,t)=>{e.setData(t)}))}applyStoreState(e){var t;e.kontokorrents.activeKontokorrentId,this.kontokorrentId=e.kontokorrents.activeKontokorrentId,this.personen=this.kontokorrentId?null===(t=e.kontokorrents.kontokorrents[this.kontokorrentId])||void 0===t?void 0:t.personen:[],this.personen&&this.zahlendePersonRenderer.update(this.personen,((e,t)=>{e.person=t,e.radioName="bezahlende-person"}))}disconnectedCallback(){this.kontokorrentsSubscription(),document.removeEventListener("paste",this.onPasteHandler),this.saveBtn.removeEventListener("click",this.saveHandler)}}customElements.define("multi-bezahlung-eintragen-page",b)},2033:function(e,t,n){function r(e){var t,n,r,a,s=""+(2,n=(t=e.toString()).indexOf("E"),a=0,(r=t.indexOf("e"))>-1?(a=parseFloat(t.substring(r+1)),t=t.substring(0,r)):n>-1&&(a=parseFloat(t.substring(n+1)),t=t.substring(0,n)),Number(Math.round(Number(t+"e"+(a+2)))+"e-2")),i=s.toString().indexOf(".");return-1!=i&&1==s.toString().length-(i+1)&&(s+="0"),s}n.d(t,{x:function(){return r}})}}]);
//# sourceMappingURL=1fa4294c42d789c958c5.bundle.js.map