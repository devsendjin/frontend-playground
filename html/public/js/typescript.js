/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/typescript.scss":
/*!************************************!*\
  !*** ./src/styles/typescript.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://html/./src/styles/typescript.scss?");

/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ts_utils_playground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/ts/utils/playground */ \"./src/ts/utils/playground.ts\");\n/* harmony import */ var _styles_typescript_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/typescript.scss */ \"./src/styles/typescript.scss\");\n\n\n// console.log('typescript');\n// write safe number converter\n// suctom select component\n(0,_ts_utils_playground__WEBPACK_IMPORTED_MODULE_0__.scope)(function () {\n    var QUOTA_EXCEEDED_ERROR_STATUS_CODES;\n    (function (QUOTA_EXCEEDED_ERROR_STATUS_CODES) {\n        QUOTA_EXCEEDED_ERROR_STATUS_CODES[QUOTA_EXCEEDED_ERROR_STATUS_CODES[\"CHROME\"] = 22] = \"CHROME\";\n        QUOTA_EXCEEDED_ERROR_STATUS_CODES[QUOTA_EXCEEDED_ERROR_STATUS_CODES[\"MOZILLA\"] = 1014] = \"MOZILLA\";\n        QUOTA_EXCEEDED_ERROR_STATUS_CODES[QUOTA_EXCEEDED_ERROR_STATUS_CODES[\"SAFARI\"] = 22] = \"SAFARI\";\n        QUOTA_EXCEEDED_ERROR_STATUS_CODES[QUOTA_EXCEEDED_ERROR_STATUS_CODES[\"EDGE\"] = 22] = \"EDGE\";\n        QUOTA_EXCEEDED_ERROR_STATUS_CODES[QUOTA_EXCEEDED_ERROR_STATUS_CODES[\"IE\"] = 22] = \"IE\";\n    })(QUOTA_EXCEEDED_ERROR_STATUS_CODES || (QUOTA_EXCEEDED_ERROR_STATUS_CODES = {}));\n    (0,_ts_utils_playground__WEBPACK_IMPORTED_MODULE_0__.l)({ 'Object.entries(QUOTA_EXCEEDED_ERROR_STATUS_CODES): ': Object.entries(QUOTA_EXCEEDED_ERROR_STATUS_CODES) });\n}, { dividerAtStart: '', name: 'Draft ts' });\n\n\n//# sourceURL=webpack://html/./src/ts/index.ts?");

/***/ }),

/***/ "./src/ts/utils/playground.ts":
/*!************************************!*\
  !*** ./src/ts/utils/playground.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"scope\": () => (/* binding */ scope),\n/* harmony export */   \"l\": () => (/* binding */ l)\n/* harmony export */ });\nvar scope = function (callback, _a) {\n    var _b = _a === void 0 ? {} : _a, _c = _b.dividerAtStart, dividerAtStart = _c === void 0 ? '\\n\\n' : _c, _d = _b.name, name = _d === void 0 ? 'Scope' : _d;\n    if (dividerAtStart)\n        console.log(dividerAtStart);\n    console.group(name);\n    if (callback)\n        callback();\n    console.groupEnd();\n};\nvar l = function (obj) {\n    if (!obj || Array.isArray(obj)) {\n        return console.log(obj);\n    }\n    // @ts-ignore\n    var logArgs = Object.entries(obj).reduce(function (acc, _a, index) {\n        var key = _a[0], value = _a[1];\n        if (index === 0) {\n            acc.push(\"\".concat(key, \": \"), value);\n        }\n        else {\n            acc.push(\"\\n\".concat(key, \": \"), value);\n        }\n        return acc;\n    }, []);\n    console.log.apply(console, logArgs);\n};\n\n\n//# sourceURL=webpack://html/./src/ts/utils/playground.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/index.ts");
/******/ 	
/******/ })()
;