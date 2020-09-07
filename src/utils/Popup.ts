export class Popup extends HTMLElement {
    private popupShown: boolean = false;
    constructor() {
        super();
        this.keyListener = this.keyListener.bind(this);
        this.touchListener = this.touchListener.bind(this);
    }

    connectedCallback() {
        this.updateStyles();
    }

    private keyListener(ev: KeyboardEvent) {
        if (ev.key == "Escape") {
            this.hide();
        }
    }

    private touchListener(ev: MouseEvent | TouchEvent) {
        if (!this.contains(<Element>(event.target))) {
            this.hide();
        }
    }

    public hide() {
        if (this.popupShown) {
            document.removeEventListener("keydown", this.keyListener);
            document.removeEventListener("click", this.touchListener);
            document.removeEventListener("touchend", this.touchListener);
            this.popupShown = false;
            this.updateStyles();
        }
    }

    public show() {
        if (!this.popupShown) {
            document.addEventListener("keydown", this.keyListener);
            document.addEventListener("click", this.touchListener);
            document.addEventListener("touchend", this.touchListener);
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
