import template from "./FeaturesRequired.html";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { testFeatures } from "../../lib/testFeatures";
export class FeaturesRequired extends HTMLElement {
    routingActionCreator: RoutingActionCreator;

    constructor() {
        super();
        this.innerHTML = template;
    }

    addServices(serviceLocator: ServiceLocator) {
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
    }

    connectedCallback() {
        testFeatures().then(t => {
            if (t.allPassed) {
                this.routingActionCreator.navigateHomeWithPageRefresh();
            }
        });
    }


    disconnectedCallback() {
    }
}

customElements.define('app-features-required', FeaturesRequired);