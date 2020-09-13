export function syncToChildren<T, E extends HTMLElement>(listElement: HTMLElement, list: T[],
    keySelector: (x: T) => string, createElement: (x: T) => E, updateElement: (x: E, data: T) => void) {
    for (let el of listElement.children) {
        let data = list.find(i => el.getAttribute("data-ref") == keySelector(i));
        if (data) {
            updateElement(<E>el, data);
        }
        else {
            listElement.removeChild(el);
        }
    }
    let before: Element = null;
    for (let t of list) {
        let key = keySelector(t);
        let childElement: E = listElement.querySelector(`:scope > [data-ref="${key}"]`);
        if (!childElement) {
            childElement = createElement(t);
            childElement.setAttribute("data-ref", key);
            updateElement(childElement, t);
        }
        if (null == before && childElement != listElement.firstElementChild) {
            listElement.prepend(childElement);
        }
        else if (null != before && before.nextElementSibling != childElement) {
            before.insertAdjacentElement("afterend", childElement);
        }
        before = childElement;
    }
}

export function syncToList<T, E extends HTMLElement>(listElement: HTMLUListElement | HTMLOListElement, list: T[],
    keySelector: (x: T) => string, createElement: (x: T) => E, updateElement: (x: E, data: T) => void) {
    syncToChildren(listElement, list, keySelector, x => {
        let li = document.createElement("li");
        li.appendChild(createElement(x));
        return li;
    }, (li, d) => {
        let x: E = <E>li.firstChild;
        updateElement(x, d);
    });
}