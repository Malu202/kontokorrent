import { RoutingActionCreator } from "../state/actions/RoutingActionCreator";

export function convertLinks(elements: Array<HTMLAnchorElement> | NodeListOf<HTMLAnchorElement>, routingActionCreator: RoutingActionCreator) {
    elements.forEach((e: HTMLAnchorElement) => {
        e.addEventListener("click", ev => {
            ev.preventDefault();
            routingActionCreator.navigate(e.getAttribute("href"));
        });
    });
}