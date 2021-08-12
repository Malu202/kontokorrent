import { KontokorrentDatabase } from "../../lib/KontokorrentDatabase";
import { ServiceLocator } from "../../ServiceLocator";
import template from "./DatabaseDebug.html";
import "./DatabaseDebug.scss";

export class DatabaseDebug extends HTMLElement {
    private db: KontokorrentDatabase;
    private container: HTMLDivElement;

    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.db = serviceLocator.db;
    }

    connectedCallback() {
        this.innerHTML = template;
        this.container = this.querySelector("#container");
        this.render();
    }

    async render() {
        for (let k of await this.db.getKontokorrents()) {
            let aktionen = await this.db.getAktionen(k.id);
            aktionen.sort((a, b) => b.laufendeNummer - a.laufendeNummer);
            let h = document.createElement("h1");
            h.innerText = k.name;
            this.container.appendChild(h);
            for (let a of aktionen) {
                let el = document.createElement("pre");
                el.innerText = JSON.stringify(a, null, 4);
                this.container.appendChild(el);
            }
        }
    }

    disconnectedCallback() {

    }
}

customElements.define("database-debug", DatabaseDebug);
