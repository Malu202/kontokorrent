export function sortByAlphabetically<T, P extends keyof T>(collection: T[], keySelector: (x: T) => string): T[] {
    return collection.sort((a, b) => keySelector(a).toLowerCase().localeCompare(keySelector(b).toLowerCase()));
}