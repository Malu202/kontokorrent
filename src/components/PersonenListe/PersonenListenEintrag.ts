import template from "./PersonenListenEintrag.html";

export class PersonenListenEintrag extends HTMLElement {
    private removeButton: HTMLButtonElement;
    private nameInput: HTMLInputElement;
    private rendered = false;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = template;
            this.rendered = true;
            this.removeButton = this.querySelector("#remove");
            this.nameInput = this.querySelector("#name");
        }
        this.nameInput.addEventListener("change", () => {
            this.dispatchEvent(new Event("change"));
        });
        this.removeButton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("onremove"));
        })
    }

    get name() {
        return this.nameInput.value;
    }

    disconnectedCallback() {

    }

}
export const PersonenListenEintragTagName = 'app-personen-listen-eintrag';
customElements.define(PersonenListenEintragTagName, PersonenListenEintrag);
