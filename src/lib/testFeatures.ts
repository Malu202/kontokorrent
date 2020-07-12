export function testFeatures() {
    let indexedDBEnabled = "indexedDB" in window;
    let localStorageEnabled = "localStorage" in window;
    let storageAllowed = null;
    try {
        localStorage.setItem("test", "1");
        storageAllowed = true;
    }
    catch {
        storageAllowed = false;
    }
    return {
        allPassed: indexedDBEnabled && localStorageEnabled && storageAllowed,
        indexedDBEnabled,
        localStorageEnabled,
        storageAllowed
    };
}