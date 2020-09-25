import { Store } from "./state/Store";
import { RoutingActionCreator } from "./state/actions/RoutingActionCreator";
import { AccountActionCreator } from "./state/actions/AccountActionCreator";
import { KontokorrentsActionCreator } from "./state/actions/KontokorrentsActionCreator";
import { BezahlungActionCreator } from "./state/actions/BezahlungActionCreator";

export class ServiceLocator {
    constructor(public store: Store, public routingActionCreator: RoutingActionCreator,
        public accountActionCreator: AccountActionCreator,
        public kontokorrentsActionCreator : KontokorrentsActionCreator,
        public bezahlungActionCreator : BezahlungActionCreator) {

    }
}