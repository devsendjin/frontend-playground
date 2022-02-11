/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/current.ts":
/*!********************************!*\
  !*** ./src/scripts/current.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_utils_playground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/scripts/utils/playground */ "./src/scripts/utils/playground.ts");

// import 'material-design-lite/material.min';
(0,_scripts_utils_playground__WEBPACK_IMPORTED_MODULE_0__.scope)(function () { }, 'Draft ts');


/***/ }),

/***/ "./src/scripts/utils/playground.ts":
/*!*****************************************!*\
  !*** ./src/scripts/utils/playground.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scope": () => (/* binding */ scope),
/* harmony export */   "l": () => (/* binding */ l)
/* harmony export */ });
var scope = function (callback, scopeName, _a) {
    if (scopeName === void 0) { scopeName = 'Scope'; }
    var _b = _a === void 0 ? {} : _a, _c = _b.divider, divider = _c === void 0 ? '' : _c;
    if (divider)
        console.log(divider);
    console.group(scopeName);
    if (callback)
        callback();
    console.groupEnd();
};
var l = function (obj) {
    if (!obj || Array.isArray(obj)) {
        return console.log(obj);
    }
    // @ts-ignore
    var logArgs = Object.entries(obj).reduce(function (acc, _a, index) {
        var key = _a[0], value = _a[1];
        if (index === 0) {
            acc.push("".concat(key, ": "), value);
        }
        else {
            acc.push("\n".concat(key, ": "), value);
        }
        return acc;
    }, []);
    console.log.apply(console, logArgs);
};


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _current__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./current */ "./src/scripts/current.ts");

// import './ts-samples/numbers';
// import './ts-samples/arrays';
// import './ts-samples/regexp';

// write safe number converter (implemented in pug-template utils)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FtRDtBQUNuRCw4Q0FBOEM7QUFFOUMsZ0VBQUssQ0FBQyxjQUFPLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZyQixJQUFNLEtBQUssR0FBVyxVQUFDLFFBQVEsRUFBRSxTQUFtQixFQUFFLEVBQXFCO0lBQTFDLCtDQUFtQjtRQUFFLHFCQUFtQixFQUFFLE9BQW5CLGVBQVksRUFBWixPQUFPLG1CQUFHLEVBQUU7SUFDekUsSUFBSSxPQUFPO1FBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLElBQUksUUFBUTtRQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFPSyxJQUFNLENBQUMsR0FBTyxVQUFDLEdBQUc7SUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QjtJQUVELGFBQWE7SUFDYixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQVEsRUFBRSxFQUFZLEVBQUUsS0FBSztZQUFsQixHQUFHLFVBQUUsS0FBSztRQUMvRCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQUcsR0FBRyxPQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDN0I7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBSyxHQUFHLE9BQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLEVBQVEsT0FBTyxFQUFFO0FBQzFCLENBQUMsQ0FBQzs7Ozs7OztVQzdCRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUU3QixpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNiO0FBRW5CLGtFQUFrRSIsInNvdXJjZXMiOlsid2VicGFjazovL2h0bWwvLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/ZDUwYSIsIndlYnBhY2s6Ly9odG1sLy4vc3JjL3NjcmlwdHMvY3VycmVudC50cyIsIndlYnBhY2s6Ly9odG1sLy4vc3JjL3NjcmlwdHMvdXRpbHMvcGxheWdyb3VuZC50cyIsIndlYnBhY2s6Ly9odG1sL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2h0bWwvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2h0bWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9odG1sL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaHRtbC8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IHNjb3BlIH0gZnJvbSAnQC9zY3JpcHRzL3V0aWxzL3BsYXlncm91bmQnO1xuLy8gaW1wb3J0ICdtYXRlcmlhbC1kZXNpZ24tbGl0ZS9tYXRlcmlhbC5taW4nO1xuXG5zY29wZSgoKSA9PiB7fSwgJ0RyYWZ0IHRzJyk7XG4iLCJ0eXBlIFRTY29wZSA9IChjYWxsYmFjazogYW55LCBzY29wZU5hbWU/OiBzdHJpbmcsIG9wdGlvbnM/OiB7IGRpdmlkZXI/OiBib29sZWFuIHwgc3RyaW5nIH0pID0+IHZvaWQ7XG5leHBvcnQgY29uc3Qgc2NvcGU6IFRTY29wZSA9IChjYWxsYmFjaywgc2NvcGVOYW1lID0gJ1Njb3BlJywgeyBkaXZpZGVyID0gJycgfSA9IHt9KSA9PiB7XG4gIGlmIChkaXZpZGVyKSBjb25zb2xlLmxvZyhkaXZpZGVyKTtcbiAgY29uc29sZS5ncm91cChzY29wZU5hbWUpO1xuICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbn07XG4vKipcbiAqIG1vZGlmaWVkIGNvbnNvbGUubG9nXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyBbc3RyaW5nLCBhbnldXG4gKi9cbnR5cGUgVEwgPSAob2JqOiBhbnkpID0+IHZvaWQ7XG5leHBvcnQgY29uc3QgbDogVEwgPSAob2JqKSA9PiB7XG4gIGlmICghb2JqIHx8IEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBjb25zb2xlLmxvZyhvYmopO1xuICB9XG5cbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBsb2dBcmdzID0gT2JqZWN0LmVudHJpZXMob2JqKS5yZWR1Y2UoKGFjYzogYW55LCBba2V5LCB2YWx1ZV0sIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICBhY2MucHVzaChgJHtrZXl9OiBgLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjYy5wdXNoKGBcXG4ke2tleX06IGAsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgW10pO1xuXG4gIGNvbnNvbGUubG9nKC4uLmxvZ0FyZ3MpO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdAL3N0eWxlcy9pbmRleC5zY3NzJztcblxuLy8gaW1wb3J0ICcuL3RzLXNhbXBsZXMvbnVtYmVycyc7XG4vLyBpbXBvcnQgJy4vdHMtc2FtcGxlcy9hcnJheXMnO1xuLy8gaW1wb3J0ICcuL3RzLXNhbXBsZXMvcmVnZXhwJztcbmltcG9ydCAnLi9jdXJyZW50JztcblxuLy8gd3JpdGUgc2FmZSBudW1iZXIgY29udmVydGVyIChpbXBsZW1lbnRlZCBpbiBwdWctdGVtcGxhdGUgdXRpbHMpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=