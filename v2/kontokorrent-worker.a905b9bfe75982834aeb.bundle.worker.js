/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/v2/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./src/worker/KontokorrentWorker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/comlink/dist/esm/comlink.mjs":
/*!***************************************************!*\
  !*** ./node_modules/comlink/dist/esm/comlink.mjs ***!
  \***************************************************/
/*! exports provided: createEndpoint, expose, proxy, proxyMarker, releaseProxy, transfer, transferHandlers, windowEndpoint, wrap */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEndpoint", function() { return createEndpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expose", function() { return expose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxy", function() { return proxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxyMarker", function() { return proxyMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "releaseProxy", function() { return releaseProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transfer", function() { return transfer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transferHandlers", function() { return transferHandlers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowEndpoint", function() { return windowEndpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const proxyMarker = Symbol("Comlink.proxy");
const createEndpoint = Symbol("Comlink.endpoint");
const releaseProxy = Symbol("Comlink.releaseProxy");
const throwMarker = Symbol("Comlink.thrown");
const isObject = (val) => (typeof val === "object" && val !== null) || typeof val === "function";
/**
 * Internal transfer handle to handle objects marked to proxy.
 */
const proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return [port2, [port2]];
    },
    deserialize(port) {
        port.start();
        return wrap(port);
    },
};
/**
 * Internal transfer handler to handle thrown exceptions.
 */
const throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
        let serialized;
        if (value instanceof Error) {
            serialized = {
                isError: true,
                value: {
                    message: value.message,
                    name: value.name,
                    stack: value.stack,
                },
            };
        }
        else {
            serialized = { isError: false, value };
        }
        return [serialized, []];
    },
    deserialize(serialized) {
        if (serialized.isError) {
            throw Object.assign(new Error(serialized.value.message), serialized.value);
        }
        throw serialized.value;
    },
};
/**
 * Allows customizing the serialization of certain values.
 */
const transferHandlers = new Map([
    ["proxy", proxyTransferHandler],
    ["throw", throwTransferHandler],
]);
function expose(obj, ep = self) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) {
            return;
        }
        const { id, type, path } = Object.assign({ path: [] }, ev.data);
        const argumentList = (ev.data.argumentList || []).map(fromWireValue);
        let returnValue;
        try {
            const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
            const rawValue = path.reduce((obj, prop) => obj[prop], obj);
            switch (type) {
                case 0 /* GET */:
                    {
                        returnValue = rawValue;
                    }
                    break;
                case 1 /* SET */:
                    {
                        parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
                        returnValue = true;
                    }
                    break;
                case 2 /* APPLY */:
                    {
                        returnValue = rawValue.apply(parent, argumentList);
                    }
                    break;
                case 3 /* CONSTRUCT */:
                    {
                        const value = new rawValue(...argumentList);
                        returnValue = proxy(value);
                    }
                    break;
                case 4 /* ENDPOINT */:
                    {
                        const { port1, port2 } = new MessageChannel();
                        expose(obj, port2);
                        returnValue = transfer(port1, [port1]);
                    }
                    break;
                case 5 /* RELEASE */:
                    {
                        returnValue = undefined;
                    }
                    break;
            }
        }
        catch (value) {
            returnValue = { value, [throwMarker]: 0 };
        }
        Promise.resolve(returnValue)
            .catch((value) => {
            return { value, [throwMarker]: 0 };
        })
            .then((returnValue) => {
            const [wireValue, transferables] = toWireValue(returnValue);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
            if (type === 5 /* RELEASE */) {
                // detach and deactive after sending release response above.
                ep.removeEventListener("message", callback);
                closeEndPoint(ep);
            }
        });
    });
    if (ep.start) {
        ep.start();
    }
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.close();
}
function wrap(ep, target) {
    return createProxy(ep, [], target);
}
function throwIfProxyReleased(isReleased) {
    if (isReleased) {
        throw new Error("Proxy has been released and is not useable");
    }
}
function createProxy(ep, path = [], target = function () { }) {
    let isProxyReleased = false;
    const proxy = new Proxy(target, {
        get(_target, prop) {
            throwIfProxyReleased(isProxyReleased);
            if (prop === releaseProxy) {
                return () => {
                    return requestResponseMessage(ep, {
                        type: 5 /* RELEASE */,
                        path: path.map((p) => p.toString()),
                    }).then(() => {
                        closeEndPoint(ep);
                        isProxyReleased = true;
                    });
                };
            }
            if (prop === "then") {
                if (path.length === 0) {
                    return { then: () => proxy };
                }
                const r = requestResponseMessage(ep, {
                    type: 0 /* GET */,
                    path: path.map((p) => p.toString()),
                }).then(fromWireValue);
                return r.then.bind(r);
            }
            return createProxy(ep, [...path, prop]);
        },
        set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, {
                type: 1 /* SET */,
                path: [...path, prop].map((p) => p.toString()),
                value,
            }, transferables).then(fromWireValue);
        },
        apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === createEndpoint) {
                return requestResponseMessage(ep, {
                    type: 4 /* ENDPOINT */,
                }).then(fromWireValue);
            }
            // We just pretend that `bind()` didn’t happen.
            if (last === "bind") {
                return createProxy(ep, path.slice(0, -1));
            }
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: 2 /* APPLY */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
        construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: 3 /* CONSTRUCT */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
    });
    return proxy;
}
function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
const transferCache = new WeakMap();
function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
}
function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
}
function windowEndpoint(w, context = self, targetOrigin = "*") {
    return {
        postMessage: (msg, transferables) => w.postMessage(msg, targetOrigin, transferables),
        addEventListener: context.addEventListener.bind(context),
        removeEventListener: context.removeEventListener.bind(context),
    };
}
function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
        if (handler.canHandle(value)) {
            const [serializedValue, transferables] = handler.serialize(value);
            return [
                {
                    type: 3 /* HANDLER */,
                    name,
                    value: serializedValue,
                },
                transferables,
            ];
        }
    }
    return [
        {
            type: 0 /* RAW */,
            value,
        },
        transferCache.get(value) || [],
    ];
}
function fromWireValue(value) {
    switch (value.type) {
        case 3 /* HANDLER */:
            return transferHandlers.get(value.name).deserialize(value.value);
        case 0 /* RAW */:
            return value.value;
    }
}
function requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve) => {
        const id = generateUUID();
        ep.addEventListener("message", function l(ev) {
            if (!ev.data || !ev.data.id || ev.data.id !== id) {
                return;
            }
            ep.removeEventListener("message", l);
            resolve(ev.data);
        });
        if (ep.start) {
            ep.start();
        }
        ep.postMessage(Object.assign({ id }, msg), transfers);
    });
}
function generateUUID() {
    return new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
        .join("-");
}


//# sourceMappingURL=comlink.mjs.map


/***/ }),

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, deleteDB, openDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDB", function() { return deleteDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDB", function() { return openDB; });
/* harmony import */ var _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrap-idb-value.js */ "./node_modules/idb/build/esm/wrap-idb-value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unwrap", function() { return _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["u"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"]; });




/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request.result), event.oldVersion, event.newVersion, Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking)
            db.addEventListener('versionchange', () => blocking());
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    return Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        const returnVal = await target[targetFuncName](...args);
        if (isWrite)
            await tx.done;
        return returnVal;
    };
    cachedMethods.set(prop, method);
    return method;
}
Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["r"])((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));




/***/ }),

/***/ "./node_modules/idb/build/esm/wrap-idb-value.js":
/*!******************************************************!*\
  !*** ./node_modules/idb/build/esm/wrap-idb-value.js ***!
  \******************************************************/
/*! exports provided: a, i, r, u, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reverseTransformCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return instanceOfAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return replaceTraps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return unwrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return wrap; });
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);




/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/worker/KontokorrentWorker.ts":
/*!*******************************************************************!*\
  !*** ./node_modules/ts-loader!./src/worker/KontokorrentWorker.ts ***!
  \*******************************************************************/
/*! exports provided: calculateBalance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateBalance", function() { return calculateBalance; });
/* harmony import */ var comlink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! comlink */ "./node_modules/comlink/dist/esm/comlink.mjs");
/* harmony import */ var _lib_BalanceCalculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/BalanceCalculator */ "./src/lib/BalanceCalculator.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function calculateBalance(kontokorrentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (new _lib_BalanceCalculator__WEBPACK_IMPORTED_MODULE_1__["BalanceCalculator"]().calculateBalance(kontokorrentId));
    });
}
const exports = {
    calculateBalance
};
Object(comlink__WEBPACK_IMPORTED_MODULE_0__["expose"])(exports, self);


/***/ }),

/***/ "./src/lib/BalanceCalculator.ts":
/*!**************************************!*\
  !*** ./src/lib/BalanceCalculator.ts ***!
  \**************************************/
/*! exports provided: BalanceCalculator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BalanceCalculator", function() { return BalanceCalculator; });
/* harmony import */ var _KontokorrentDatabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KontokorrentDatabase */ "./src/lib/KontokorrentDatabase.ts");
/* harmony import */ var _filterBezahlungen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterBezahlungen */ "./src/lib/filterBezahlungen.ts");
/* harmony import */ var _utils_groupBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/groupBy */ "./src/utils/groupBy.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class GeteilteZahlung {
    constructor(wert, empfaengerAnzahl, isEmpfaenger) {
        this.wert = wert;
        this.empfaengerAnzahl = empfaengerAnzahl;
        this.isEmpfaenger = isEmpfaenger;
    }
}
class BalanceCalculator {
    constructor() {
        this.db = new _KontokorrentDatabase__WEBPACK_IMPORTED_MODULE_0__["KontokorrentDatabase"]();
    }
    erweitern(summe, nenner, andere) {
        let c = 1;
        for (let n of andere) {
            if (n != nenner) {
                c *= n;
            }
        }
        return summe * c;
    }
    calculateBalance(kontokorrentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let aktionen = yield this.db.getAktionen(kontokorrentId);
            let bezahlungen = Object(_filterBezahlungen__WEBPACK_IMPORTED_MODULE_1__["filterBezahlungen"])(aktionen);
            let kk = yield this.db.getKontokorrent(kontokorrentId);
            let geteilteZahlungen = {};
            for (let p of kk.personen) {
                geteilteZahlungen[p.id] = [];
            }
            for (let b of bezahlungen) {
                for (let e of b.empfaengerIds) {
                    geteilteZahlungen[e].push(new GeteilteZahlung(b.wert, b.empfaengerIds.length, true));
                    geteilteZahlungen[b.bezahlendePersonId].push(new GeteilteZahlung(b.wert, b.empfaengerIds.length, false));
                }
            }
            let balance = {};
            for (let p of kk.personen) {
                let gruppen = Object(_utils_groupBy__WEBPACK_IMPORTED_MODULE_2__["groupBy"])(geteilteZahlungen[p.id], "empfaengerAnzahl");
                let alleNenner = Array.from(gruppen.keys());
                let gesamtNenner = Array.from(gruppen.keys()).reduce((p, c) => p * c, 1);
                if (gesamtNenner < 362880) {
                    let gesamtSumme = 0;
                    for (let g of gruppen.keys()) {
                        let zahlungen = gruppen.get(g);
                        let summe = zahlungen.reduce((p, c) => p + (c.isEmpfaenger ? c.wert : -c.wert), 0);
                        gesamtSumme += this.erweitern(summe, g, alleNenner);
                    }
                    balance[p.id] = gesamtSumme / gesamtNenner;
                }
                else {
                    let gesamtSumme = 0;
                    for (let g of gruppen.keys()) {
                        let zahlungen = gruppen.get(g);
                        let summe = zahlungen.reduce((p, c) => p + (c.isEmpfaenger ? c.wert : -c.wert), 0);
                        gesamtSumme += summe / g;
                    }
                    balance[p.id] = gesamtSumme;
                }
            }
            return balance;
        });
    }
}


/***/ }),

/***/ "./src/lib/KontokorrentDatabase.ts":
/*!*****************************************!*\
  !*** ./src/lib/KontokorrentDatabase.ts ***!
  \*****************************************/
/*! exports provided: KontokorrentDatabase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KontokorrentDatabase", function() { return KontokorrentDatabase; });
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/esm/index.js");
/* harmony import */ var _utils_sortBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sortBy */ "./src/utils/sortBy.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const KontokorrentsStore = "KontokorrentsStore";
const AppStateStore = "AppStateStore";
const AktionenStore = "AktionenStore";
const initialSettings = () => { return { id: 0, zuletztGesehenerKontokorrentId: null }; };
class KontokorrentDatabase {
    withInitialized(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = yield Object(idb__WEBPACK_IMPORTED_MODULE_0__["openDB"])("kontokorrent-db", 3, {
                upgrade(db, oldVersion, newVersion) {
                    if (oldVersion < 1) {
                        let store = db.createObjectStore(KontokorrentsStore, { keyPath: "id" });
                        store.createIndex("oeffentlicherName", "oeffentlicherName");
                    }
                    if (oldVersion < 2) {
                        let store = db.createObjectStore(AppStateStore, { keyPath: "id" });
                        store.put(initialSettings());
                    }
                    if (oldVersion < 3) {
                        let store = db.createObjectStore(AktionenStore, { keyPath: ["laufendeNummer", "kontokorrentId"] });
                        store.createIndex("kontokorrentId", "kontokorrentId");
                    }
                },
            });
            try {
                return yield cb(db);
            }
            finally {
                db.close();
            }
        });
    }
    getKontokorrents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                return Object(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__["sortByAlphabetically"])((yield db.getAll(KontokorrentsStore)), k => k.name);
            }));
        });
    }
    addAktionen(id, aktionen) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!aktionen.length) {
                return;
            }
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                const tx = db.transaction(AktionenStore, "readwrite");
                let tasks = aktionen.map(v => {
                    let a = Object.assign(Object.assign({}, v), { kontokorrentId: id });
                    return a;
                }).map(a => tx.store.add(a));
                yield Promise.all(tasks);
                yield tx.done;
                const tx2 = db.transaction(KontokorrentsStore, "readwrite");
                let kk = yield tx2.store.get(id);
                let max = Math.max(...aktionen.map(v => v.laufendeNummer));
                kk.laufendeNummer = max;
                yield tx2.store.put(kk);
                yield tx2.done;
            }));
        });
    }
    getZuletztGesehenerKontokorrentId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                let appState = yield db.get(AppStateStore, 0);
                if (appState.zuletztGesehenerKontokorrentId) {
                    return appState.zuletztGesehenerKontokorrentId;
                }
                else {
                    let kks = yield (yield this.getKontokorrents());
                    if (kks.length) {
                        return kks[0].id;
                    }
                    return null;
                }
            }));
        });
    }
    setZuletztGesehenerKontokorrentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                let appState = yield db.get(AppStateStore, 0);
                appState.zuletztGesehenerKontokorrentId = id;
                yield db.put(AppStateStore, appState);
            }));
        });
    }
    setKontokorrents(kontokorrents) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                let existing = (yield db.getAll(KontokorrentsStore));
                for (let v of existing.filter(e => !kontokorrents.some(d => e.id === d.id))) {
                    yield db.delete(KontokorrentsStore, v.id);
                }
                let newIds = [];
                for (let v of kontokorrents) {
                    let ex = existing.find(d => d.id == v.id);
                    if (!ex) {
                        newIds.push(v.id);
                    }
                    let combined = Object.assign(Object.assign({}, ex), { name: v.name, personen: v.personen, id: v.id, oeffentlicherName: v.oeffentlicherName });
                    yield db.put(KontokorrentsStore, combined);
                }
                return newIds;
            }));
        });
    }
    addKontokorrent(kk) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                if (!(yield db.get(KontokorrentsStore, kk.id))) {
                    yield db.add(KontokorrentsStore, kk);
                }
            }));
        });
    }
    getKontokorrent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                return yield db.get(KontokorrentsStore, id);
            }));
        });
    }
    getPerOeffentlichName(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                return yield db.getFromIndex(KontokorrentsStore, "oeffentlicherName", id);
            }));
        });
    }
    getAktionen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                return yield db.getAllFromIndex(AktionenStore, "kontokorrentId", id);
            }));
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.withInitialized((db) => __awaiter(this, void 0, void 0, function* () {
                yield db.clear(AktionenStore);
                yield db.clear(KontokorrentsStore);
                yield db.put(AppStateStore, initialSettings());
            }));
        });
    }
}


/***/ }),

/***/ "./src/lib/filterBezahlungen.ts":
/*!**************************************!*\
  !*** ./src/lib/filterBezahlungen.ts ***!
  \**************************************/
/*! exports provided: filterBezahlungen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterBezahlungen", function() { return filterBezahlungen; });
function filterBezahlungen(aktionen) {
    let bezahlungenMap = {};
    for (let b of aktionen) {
        if (b.bearbeiteteBezahlungId) {
            delete bezahlungenMap[b.bearbeiteteBezahlungId];
        }
        if (b.geloeschteBezahlungId) {
            delete bezahlungenMap[b.bearbeiteteBezahlungId];
        }
        else {
            bezahlungenMap[b.bezahlung.id] = b.bezahlung;
        }
    }
    let bezahlungen = Object.values(bezahlungenMap);
    return bezahlungen;
}


/***/ }),

/***/ "./src/utils/groupBy.ts":
/*!******************************!*\
  !*** ./src/utils/groupBy.ts ***!
  \******************************/
/*! exports provided: groupBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupBy", function() { return groupBy; });
function groupBy(list, key) {
    const map = new Map();
    list.forEach((item) => {
        const k = item[key];
        const collection = map.get(k);
        if (!collection) {
            map.set(k, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return map;
}


/***/ }),

/***/ "./src/utils/sortBy.ts":
/*!*****************************!*\
  !*** ./src/utils/sortBy.ts ***!
  \*****************************/
/*! exports provided: sortByAlphabetically */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByAlphabetically", function() { return sortByAlphabetically; });
function sortByAlphabetically(collection, keySelector) {
    return collection.sort((a, b) => keySelector(a).toLowerCase().localeCompare(keySelector(b).toLowerCase()));
}


/***/ })

/******/ });
//# sourceMappingURL=kontokorrent-worker.a905b9bfe75982834aeb.bundle.worker.js.map