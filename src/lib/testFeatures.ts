import { KontokorrentDatabase } from "./KontokorrentDatabase";

import { v4 as uuid } from "uuid";

export function testFeatures(): Promise<{ allPassed: boolean }> {
    return new Promise((resolve, reject) => {
        let indexedDBEnabled = "indexedDB" in window;
        if (indexedDBEnabled) {
            const testdbname = uuid();
            let res = window.indexedDB.open(testdbname, 1);
            res.onsuccess = () => {
                resolve({
                    allPassed: true
                });
                res.result.close();
                window.indexedDB.deleteDatabase(testdbname);
            };
            res.onerror = () => {
                resolve({
                    allPassed: false
                });
            }
        } else {
            resolve({
                allPassed: false
            });
        }
    });
}