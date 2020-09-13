(self["webpackJsonp"] = self["webpackJsonp"] || []).push([[0],{

/***/ "./src/components/info/info.html":
/*!***************************************!*\
  !*** ./src/components/info/info.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Module
var code = "<h1>Kontokorrent Open Source</h1> <a data-internal href=\"\">zurück</a> <p> The source code is available at <a href=https://github.com/malu202/kontokorrent>Github</a> </p> <h2>Third Party Components</h2> <p> The following third party components are used: </p><div id=third-party></div> <p></p>";
// Exports
module.exports = code;

/***/ }),

/***/ "./src/components/info/info.ts":
/*!*************************************!*\
  !*** ./src/components/info/info.ts ***!
  \*************************************/
/*! exports provided: Info */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Info", function() { return Info; });
/* harmony import */ var _convertLinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../convertLinks */ "./src/components/convertLinks.ts");
/* harmony import */ var _info_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info.html */ "./src/components/info/info.html");
/* harmony import */ var _info_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_info_html__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Info extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = _info_html__WEBPACK_IMPORTED_MODULE_1___default.a;
    }
    addServices(serviceLocator) {
        this.routingActionCreator = serviceLocator.routingActionCreator;
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch("index.licenses.txt");
            let text = yield res.text();
            this.querySelector("#third-party").innerText = text;
            Object(_convertLinks__WEBPACK_IMPORTED_MODULE_0__["convertLinks"])(this.querySelectorAll("a[data-internal]"), this.routingActionCreator);
        });
    }
}
customElements.define('app-info', Info);


/***/ })

}]);
//# sourceMappingURL=0.4beba0f08f3d569fa6db.bundle.js.map