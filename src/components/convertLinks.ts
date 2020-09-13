import { RoutingActionCreator } from "../state/actions/RoutingActionCreator";

export function convertLinks(elements: NodeListOf<HTMLAnchorElement>, routingActionCreator: RoutingActionCreator) {
    elements.forEach(e => {
        e.addEventListener("click", ev => {
            ev.preventDefault();
            routingActionCreator.navigate(e.getAttribute("href"));
        });
    });
}