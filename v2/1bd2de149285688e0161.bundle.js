"use strict";(self.webpackChunkkontokorrent=self.webpackChunkkontokorrent||[]).push([[57],{8057:function(e,t,n){n.r(t),n.d(t,{DatabaseDebug:function(){return r}}),n(3948);class r extends HTMLElement{constructor(){super(),this.innerHTML='<div id="container"></div>'}addServices(e){this.db=e.db}connectedCallback(){this.container=this.querySelector("#container"),this.render()}async render(){for(let e of await this.db.getKontokorrents()){let t=await this.db.getAktionen(e.id);t.sort(((e,t)=>t.laufendeNummer-e.laufendeNummer));let n=document.createElement("h1");n.innerText=e.name,this.container.appendChild(n);for(let e of t){let t=document.createElement("pre");t.innerText=JSON.stringify(e,null,4),this.container.appendChild(t)}}}disconnectedCallback(){}}customElements.define("database-debug",r)}}]);
//# sourceMappingURL=1bd2de149285688e0161.bundle.js.map