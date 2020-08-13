export function syncToList<T, E extends HTMLElement>(listElement: HTMLUListElement | HTMLOListElement, list: T[],
    keySelector: (x: T) => string, createElement: (x: T) => E, updateElement: (x: E, data: T) => void) {
    for (let el of listElement.children) {
        let data = list.find(i => el.getAttribute("data-ref") == keySelector(i));
        if (data) {
            updateElement(<E>el.firstChild, data);
        }
        else {
            listElement.removeChild(el);
        }
    }
    let before: Element = null;
    for (let t of list) {
        let key = keySelector(t);
        let li = listElement.querySelector(`:scope > [data-ref="${key}"]`);
        if (!li) {
            li = document.createElement("li");
            li.setAttribute("data-ref", key);
            let el = createElement(t);
            updateElement(el, t);
            li.appendChild(el);
        }
        if (null == before) {
            listElement.prepend(li);
        }
        else {
            before.insertAdjacentElement("afterend", li);
        }
        before = li;
    }
}