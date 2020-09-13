var serviceWorkerOption = {
  "assets": [
    "/v2/kontokorrent-worker.a905b9bfe75982834aeb.bundle.worker.js",
    "/v2/kontokorrent-worker.licenses.txt",
    "/v2/mini-css-extract-plugin.licenses.txt",
    "/v2/favicons/android-chrome-192x192.png",
    "/v2/favicons/android-chrome-512x512.png",
    "/v2/favicons/apple-touch-icon.png",
    "/v2/favicons/browserconfig.xml",
    "/v2/favicons/favicon-16x16.png",
    "/v2/favicons/favicon-32x32.png",
    "/v2/favicons/favicon.ico",
    "/v2/favicons/mstile-144x144.png",
    "/v2/favicons/mstile-150x150.png",
    "/v2/favicons/mstile-310x150.png",
    "/v2/favicons/mstile-310x310.png",
    "/v2/favicons/mstile-70x70.png",
    "/v2/favicons/safari-pinned-tab.svg",
    "/v2/site.webmanifest",
    "/v2/0.4beba0f08f3d569fa6db.bundle.js",
    "/v2/index.b16e078f230b89d62bba.css",
    "/v2/b30d8e280f288fb8e675.bundle.js",
    "/v2/index.licenses.txt",
    "/v2/index.html"
  ]
};
        
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sw.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sw.ts":
/*!*******************!*\
  !*** ./src/sw.ts ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (null);
self.addEventListener("install", function (event) {
    const cacheAssets = [
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500"
    ];
    for (let asset of serviceWorkerOption.assets) {
        cacheAssets.push(asset);
    }
    self.skipWaiting();
    event.waitUntil(caches.open("v1")
        .then(function (cache) {
        return cache.addAll(cacheAssets);
    }));
});
self.addEventListener("fetch", function (event) {
    event.respondWith(fetch(event.request).catch(function () {
        return caches.match(event.request);
    }));
});
self.addEventListener("activate", function (event) {
});


/***/ })

/******/ });
//# sourceMappingURL=sw.js.map