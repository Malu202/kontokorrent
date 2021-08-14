import template from "./PersonenListe.html";
import { PersonenListenEintrag, PersonenListenEintragTagName } from "./PersonenListenEintrag";

export class PersonenListe extends HTMLElement {
    private addPersonButton: HTMLButtonElement;
    private personenListe: HTMLUListElement;
    private rendered = false;

    constructor() {
        super();
    }

    get personen() {
        let names: string[] = [];
        this.personenListe.querySelectorAll(PersonenListenEintragTagName).forEach((v: PersonenListenEintrag) => names.push(v.name));
        return names;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = template;
            this.addPersonButton = this.querySelector("#add-person");
            this.personenListe = this.querySelector("#personen-liste");
            this.rendered = true;
        }
        this.addPersonButton.addEventListener("click", () => {
            let li = document.createElement("li");
            let e = new PersonenListenEintrag();
            li.appendChild(e);
            this.personenListe.appendChild(li);
            e.querySelector("input").focus();
            e.addEventListener("onremove", () => {
                this.personenListe.removeChild(li);
            });
        });
    }

    disconnectedCallback() {

    }

}

customElements.define('app-personen-liste', PersonenListe);
