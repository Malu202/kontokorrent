import template from "./FeaturesRequired.html";
import { ServiceLocator } from "../../ServiceLocator";
import { RoutingActionCreator, routingActionCreatorFactory } from "../../state/actions/RoutingActionCreator";
import { testFeatures } from "../../lib/testFeatures";
export class FeaturesRequired extends HTMLElement {
    private routingActionCreator: RoutingActionCreator;

    constructor() {
        super();
    }

    addServices(serviceLocator: ServiceLocator) {
        this.routingActionCreator = routingActionCreatorFactory(serviceLocator);
    }

    connectedCallback() {
        this.innerHTML = template;
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