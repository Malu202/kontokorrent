export function groupBy<T, K extends keyof T>(list: T[], key: K) {
    const map = new Map<T[K], T[]>();
    list.forEach((item) => {
        const k = item[key];
        const collection = map.get(k);
        if (!collection) {
            map.set(k, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
