export class Popup extends HTMLElement {
    private popupShown: boolean = false;
    constructor() {
        super();
        this.keyListener = this.keyListener.bind(this);
        this.clickListener = this.clickListener.bind(this);
    }

    connectedCallback() {
        this.updateStyles();
    }

    private keyListener(ev: KeyboardEvent) {
        if (ev.key == "Escape") {
            this.hide();
        }
    }

    private clickListener(ev: MouseEvent | TouchEvent) {
        if (!this.contains(<Element>(event.target))) {
            this.hide();
        }
    }

    public hide() {
        if (this.popupShown) {
            document.removeEventListener("keydown", this.keyListener);
            document.removeEventListener("click", this.clickListener);
            this.popupShown = false;
            this.updateStyles();
        }
    }

    public show() {
        if (!this.popupShown) {
            document.addEventListener("keydown", this.keyListener);
            document.addEventListener("click", this.clickListener);
            this.popupShown = true;
            this.updateStyles();
        }
    }

    private updateStyles() {
        this.style.display = this.popupShown ? "block" : "none";
    }

    public toggle() {
        if (!this.popupShown) {
            this.show();
        }
        else {
            this.hide();

        }
    }

    disconnectedCallback() {
        this.hide();
    }
}
customElements.define("app-popup", Popup);
