import template from "./ScannenPage.html";
import "./ScannenPage.scss";

export class ScannenPage extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        this.loadOpenCv().then(cv => {
            console.log(cv);
        });
    }

    disconnectedCallback() {

    }
    async loadOpenCv() {
        const cvWindowAccessor = () => <OpenCV>(<any>window).cv;
        // return new Promise((resolve, reject) => {
        //     let cv = cvWindowAccessor();
        //     if (cv) {
        //         resolve(cv);
        //     }
        //     const script = document.createElement('script');
        //     script.setAttribute('async', '');
        //     script.setAttribute('type', 'text/javascript');
        //     script.addEventListener('load', () => {
        //         resolve(cvWindowAccessor());
        //     });
        //     script.addEventListener('error', reject);
        //     script.src = "https://docs.opencv.org/4.5.0/opencv.js";
        //     document.head.appendChild(script);
        // });
        const suff = await import("./opencv.js");
        console.log("suff", suff);
        return cvWindowAccessor();
    }
}

customElements.define("scannen-page", ScannenPage);
