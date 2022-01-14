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

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://html/./src/index.scss?");

/***/ }),

/***/ "./src/draft.js":
/*!**********************!*\
  !*** ./src/draft.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_playground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/playground */ \"./src/utils/playground.js\");\n\n\nconst fields = [\n  {\n    name: 'dimensions',\n    label: 'Dimensions',\n    measure: 'mt',\n    isComplex: true,\n    id: '6981d48f-414f-462d-b677-aec7f220dd24',\n  },\n  {\n    name: 'quantity',\n    label: 'Q-ty',\n    id: '8c63c1ee-2b3c-4eee-90ff-b55111f42fa8',\n  },\n  {\n    name: 'cargoWeight',\n    label: 'Gross weight',\n    measure: 'st',\n    id: '3ccbb4a9-158b-4edc-84ec-442cae5f1ac1',\n  },\n  {\n    id: '040c7220-6640-4c1e-ac77-b4c246ee5723',\n    name: 'dimensions',\n    label: 'Dimensions',\n    measure: 'mt',\n    isComplex: true,\n  },\n  {\n    id: 'fb7eca39-56fa-482c-bc06-4ed3901dcb9d',\n    name: 'quantity',\n    label: 'Q-ty',\n  },\n  {\n    id: '92cc88a4-9551-4456-8a76-224c5f77b119',\n    name: 'cargoWeight',\n    label: 'Gross weight',\n    measure: 'st',\n  },\n];\n\nconst chunks = [\n  [\n    {\n      name: 'dimensions',\n      label: 'Dimensions',\n      measure: 'mt',\n      isComplex: true,\n      id: '6981d48f-414f-462d-b677-aec7f220dd24',\n    },\n    {\n      name: 'quantity',\n      label: 'Q-ty',\n      id: '8c63c1ee-2b3c-4eee-90ff-b55111f42fa8',\n    },\n    {\n      name: 'cargoWeight',\n      label: 'Gross weight',\n      measure: 'st',\n      id: '3ccbb4a9-158b-4edc-84ec-442cae5f1ac1',\n    },\n  ],\n  [\n    {\n      id: '040c7220-6640-4c1e-ac77-b4c246ee5723',\n      name: 'dimensions',\n      label: 'Dimensions',\n      measure: 'mt',\n      isComplex: true,\n    },\n    {\n      id: 'fb7eca39-56fa-482c-bc06-4ed3901dcb9d',\n      name: 'quantity',\n      label: 'Q-ty',\n    },\n    {\n      id: '92cc88a4-9551-4456-8a76-224c5f77b119',\n      name: 'cargoWeight',\n      label: 'Gross weight',\n      measure: 'st',\n    },\n  ],\n];\n\nconst field = chunks[1][0];\n\n(0,_utils_playground__WEBPACK_IMPORTED_MODULE_0__.scope)(\n  () => {\n    const targetField = fields.find((f) => f.id === field.id);\n    // const targetFieldId = targetField.id\n\n    const s = chunks.some((chunk) => chunk.find((chunkField) => chunkField.id === targetField.id));\n    (0,_utils_playground__WEBPACK_IMPORTED_MODULE_0__.l)({ targetField, s });\n  },\n  { dividerAtStart: false, name: 'Draft' }\n);\n\n\n//# sourceURL=webpack://html/./src/draft.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ \"./src/index.scss\");\n/* harmony import */ var _draft__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draft */ \"./src/draft.js\");\n\n\n// import './samples/numbers';\n// import './samples/arrays';\n\n\n\n//# sourceURL=webpack://html/./src/index.js?");

/***/ }),

/***/ "./src/utils/playground.js":
/*!*********************************!*\
  !*** ./src/utils/playground.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"scope\": () => (/* binding */ scope),\n/* harmony export */   \"l\": () => (/* binding */ l)\n/* harmony export */ });\nconst scope = (callback, { dividerAtStart = '\\n\\n', name = 'Scope' } = {}) => {\n  if (dividerAtStart) console.log(dividerAtStart);\n  console.group(name);\n  if (callback) callback();\n  console.groupEnd();\n};\n\n/**\n * modified console.log\n * @param {Object} obj\n * @returns [string, any]\n */\nconst l = (obj) => {\n  if (!obj || Array.isArray(obj)) {\n    return console.log(obj);\n  }\n\n  const logArgs = Object.entries(obj).reduce((acc, [key, value], index) => {\n    if (index === 0) {\n      acc.push(`${key}: `, value);\n    } else {\n      acc.push(`\\n${key}: `, value);\n    }\n    return acc;\n  }, []);\n\n  console.log(...logArgs);\n};\n\n\n//# sourceURL=webpack://html/./src/utils/playground.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;