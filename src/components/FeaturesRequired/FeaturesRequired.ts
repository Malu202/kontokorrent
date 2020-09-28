import template from "./FeaturesRequired.html";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator } from "../../state/actions/RoutingActionCreator";
import { testFeatures } from "../../lib/testFeatures";
export class FeaturesRequired extends HTMLElement {
    routingActionCreator: RoutingActionCreator;

    constructor() {
        super();
        this.innerHTML = template;
    }

    addServices(serviceLocator: ServiceLocator) {
        this.routingActionCreator = RoutingActionCreator.locate(serviceLocator);
    }

    connectedCallback() {
        if (testFeatures().allPassed) {
            this.routingActionCreator.navigateHome();
            window.location.reload();
        }
    }


    disconnectedCallback() {
    }
}

customElements.define('app-features-required', FeaturesRequired);