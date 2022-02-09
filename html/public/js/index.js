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

// import './samples/numbers';
// import './samples/arrays';
// import './samples/regexp';

// write safe number converter (implemented in pug-template utils)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7OztBQ0FtRDtBQUVuRCxnRUFBSyxDQUFDLGNBQU8sQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDRHJCLElBQU0sS0FBSyxHQUFXLFVBQUMsUUFBUSxFQUFFLFNBQW1CLEVBQUUsRUFBcUI7SUFBMUMsK0NBQW1CO1FBQUUscUJBQW1CLEVBQUUsT0FBbkIsZUFBWSxFQUFaLE9BQU8sbUJBQUcsRUFBRTtJQUN6RSxJQUFJLE9BQU87UUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekIsSUFBSSxRQUFRO1FBQUUsUUFBUSxFQUFFLENBQUM7SUFDekIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3JCLENBQUMsQ0FBQztBQU9LLElBQU0sQ0FBQyxHQUFPLFVBQUMsR0FBRztJQUN2QixJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDOUIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO0lBRUQsYUFBYTtJQUNiLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBUSxFQUFFLEVBQVksRUFBRSxLQUFLO1lBQWxCLEdBQUcsVUFBRSxLQUFLO1FBQy9ELElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBRyxHQUFHLE9BQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFLLEdBQUcsT0FBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxPQUFPLENBQUMsR0FBRyxPQUFYLE9BQU8sRUFBUSxPQUFPLEVBQUU7QUFDMUIsQ0FBQyxDQUFDOzs7Ozs7O1VDN0JGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjZCO0FBRTdCLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQ1Y7QUFFbkIsa0VBQWtFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHRtbC8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz8wMGFiIiwid2VicGFjazovL2h0bWwvLi9zcmMvc2NyaXB0cy9jdXJyZW50LnRzIiwid2VicGFjazovL2h0bWwvLi9zcmMvc2NyaXB0cy91dGlscy9wbGF5Z3JvdW5kLnRzIiwid2VicGFjazovL2h0bWwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHRtbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHRtbC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2h0bWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9odG1sLy4vc3JjL3NjcmlwdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgc2NvcGUgfSBmcm9tICdAL3NjcmlwdHMvdXRpbHMvcGxheWdyb3VuZCc7XG5cbnNjb3BlKCgpID0+IHt9LCAnRHJhZnQgdHMnKTtcbiIsInR5cGUgVFNjb3BlID0gKGNhbGxiYWNrOiBhbnksIHNjb3BlTmFtZT86IHN0cmluZywgb3B0aW9ucz86IHsgZGl2aWRlcj86IGJvb2xlYW4gfCBzdHJpbmcgfSkgPT4gdm9pZDtcbmV4cG9ydCBjb25zdCBzY29wZTogVFNjb3BlID0gKGNhbGxiYWNrLCBzY29wZU5hbWUgPSAnU2NvcGUnLCB7IGRpdmlkZXIgPSAnJyB9ID0ge30pID0+IHtcbiAgaWYgKGRpdmlkZXIpIGNvbnNvbGUubG9nKGRpdmlkZXIpO1xuICBjb25zb2xlLmdyb3VwKHNjb3BlTmFtZSk7XG4gIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgY29uc29sZS5ncm91cEVuZCgpO1xufTtcbi8qKlxuICogbW9kaWZpZWQgY29uc29sZS5sb2dcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIFtzdHJpbmcsIGFueV1cbiAqL1xudHlwZSBUTCA9IChvYmo6IGFueSkgPT4gdm9pZDtcbmV4cG9ydCBjb25zdCBsOiBUTCA9IChvYmopID0+IHtcbiAgaWYgKCFvYmogfHwgQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKG9iaik7XG4gIH1cblxuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGxvZ0FyZ3MgPSBPYmplY3QuZW50cmllcyhvYmopLnJlZHVjZSgoYWNjOiBhbnksIFtrZXksIHZhbHVlXSwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgIGFjYy5wdXNoKGAke2tleX06IGAsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjLnB1c2goYFxcbiR7a2V5fTogYCwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCBbXSk7XG5cbiAgY29uc29sZS5sb2coLi4ubG9nQXJncyk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ0Avc3R5bGVzL2luZGV4LnNjc3MnO1xuXG4vLyBpbXBvcnQgJy4vc2FtcGxlcy9udW1iZXJzJztcbi8vIGltcG9ydCAnLi9zYW1wbGVzL2FycmF5cyc7XG4vLyBpbXBvcnQgJy4vc2FtcGxlcy9yZWdleHAnO1xuaW1wb3J0ICcuL2N1cnJlbnQnO1xuXG4vLyB3cml0ZSBzYWZlIG51bWJlciBjb252ZXJ0ZXIgKGltcGxlbWVudGVkIGluIHB1Zy10ZW1wbGF0ZSB1dGlscylcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==