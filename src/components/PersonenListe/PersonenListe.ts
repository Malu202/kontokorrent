import template from "./PersonenListe.html";
import { PersonenListenEintrag, PersonenListenEintragTagName } from "./PersonenListenEintrag";

export class PersonenListe extends HTMLElement {
    private addPersonButton: HTMLButtonElement;
    private personenListe: HTMLUListElement;

    constructor() {
        super();
        this.innerHTML = template;
    }

    get personen() {
        let names: string[] = [];
        this.personenListe.querySelectorAll(PersonenListenEintragTagName).forEach((v: PersonenListenEintrag) => names.push(v.name));
        return names;
    }

    connectedCallback() {
        let element = this;
        this.addPersonButton = element.querySelector("#add-person");
        this.personenListe = element.querySelector("#personen-liste");
        this.addPersonButton.addEventListener("click", () => {
            let li = document.createElement("li");
            let e = new PersonenListenEintrag();
            li.appendChild(e);
            this.personenListe.appendChild(li);
            e.addEventListener("onremove", () => {
                this.personenListe.removeChild(li);
            });
        });
    }

    disconnectedCallback() {

    }

}

customElements.define('app-personen-liste', PersonenListe);
