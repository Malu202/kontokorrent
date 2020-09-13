import template from "./PersonenListenEintrag.html";

export class PersonenListenEintrag extends HTMLElement {
    private removeButton: HTMLButtonElement;
    private nameInput: HTMLInputElement;

    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        let element = this;
        this.removeButton = element.querySelector("#remove");
        this.nameInput = element.querySelector("#name");
        this.nameInput.addEventListener("change", () => {
            this.dispatchEvent(new Event("change"));
        });
        this.removeButton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("onremove"));
        })
    }

    get name(){
        return this.nameInput.value;
    }

    disconnectedCallback() {

    }

}
export const PersonenListenEintragTagName = 'app-personen-listen-eintrag'; 
customElements.define(PersonenListenEintragTagName, PersonenListenEintrag);
