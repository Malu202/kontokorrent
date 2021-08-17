import template from "./ShareDialog.html";
import "./ShareDialog.scss";

export const ShareKontokorrentDisplay = "display";
export const ShareKontokorrentOeffentlicherName = "oeffentlicher-name";

interface AttributeStore {
    display: string;
    oeffentlicherName: string;
}

export class ShareDialog extends HTMLElement {
    private rendered = false;
    private shareDoneButton: HTMLButtonElement;
    private shareDoneListener: (e: MouseEvent) => void;
    private backdrop: HTMLDivElement;
    private attributeStore: AttributeStore;
    private shareDisplayName: HTMLSpanElement;
    private shareOeffentlicherName: HTMLSpanElement;
    private webShareSection: HTMLDivElement;
    private shareLinkInput: HTMLInputElement;
    private webShareButton: HTMLButtonElement;
    private shareListener: (e: MouseEvent) => void;
    private copyLinkButton : HTMLButtonElement;
    private shareCopied : HTMLDivElement;
    private copyLinkListener: (e: MouseEvent) => void;
    constructor() {
        super();
        this.attributeStore = {
            display: "",
            oeffentlicherName: ""
        };
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.shareDoneButton = this.querySelector("#share-done");
            this.backdrop = this.querySelector("#backdrop");
            this.shareDisplayName = this.querySelector("#share-display-name");
            this.shareOeffentlicherName = this.querySelector("#share-oeffentlicher-name");
            this.shareLinkInput = this.querySelector("#share-link");
            this.webShareSection = this.querySelector("#web-share");
            this.webShareButton = this.querySelector("#web-share-btn");
            this.copyLinkButton = this.querySelector("#share-copy-link-btn");
            this.shareCopied = this.querySelector("#share-copied");
            this.updateAttributes();
        }
        this.shareCopied.style.visibility = "hidden";
        this.shareDoneListener = (e: MouseEvent) => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent("sharedone"));
        };
        this.shareDoneButton.addEventListener("click", this.shareDoneListener);
        this.backdrop.addEventListener("click", this.shareDoneListener);
        this.shareListener = (e: MouseEvent) => {
            navigator.share({
                title: `${this.attributeStore.display} - Kontokorrent`,
                text: `Kontokorrent der Gruppe ${this.attributeStore.display}`,
                url: `${document.baseURI}kontokorrents/o/${this.attributeStore.oeffentlicherName}`
            }).then(() => {
                this.dispatchEvent(new CustomEvent("sharedone"));
            });
        };
        this.webShareButton.addEventListener("click", this.shareListener);
        this.copyLinkListener = (e: MouseEvent) => {
            navigator.clipboard.writeText(`${document.baseURI}kontokorrents/o/${this.attributeStore.oeffentlicherName}`).then(() => {
                this.shareCopied.style.visibility = "";
            });
        };
        this.copyLinkButton.addEventListener("click", this.copyLinkListener);
    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.attributeStore.display = this.getAttribute(ShareKontokorrentDisplay);
        this.attributeStore.oeffentlicherName = this.getAttribute(ShareKontokorrentOeffentlicherName);
        this.updatesStyle();
    }

    static get observedAttributes() {
        return [ShareKontokorrentDisplay, ShareKontokorrentOeffentlicherName];
    }

    disconnectedCallback() {
        this.shareDoneButton.removeEventListener("click", this.shareDoneListener);
        this.backdrop.removeEventListener("click", this.shareDoneListener);
        this.webShareButton.removeEventListener("click", this.shareListener);
        this.copyLinkButton.removeEventListener("click", this.copyLinkListener);
    }

    private updatesStyle() {
        if (this.rendered) {
            this.webShareSection.style.display = "share" in navigator ? "" : "none";
            this.shareDisplayName.innerText = this.attributeStore.display;
            this.shareOeffentlicherName.innerText = this.attributeStore.oeffentlicherName;
            this.shareLinkInput.value = `${document.baseURI}kontokorrents/o/${this.attributeStore.oeffentlicherName}`;
        }
    }
}
export const ShareDialogTagName = "share-dialog";
customElements.define(ShareDialogTagName, ShareDialog);
