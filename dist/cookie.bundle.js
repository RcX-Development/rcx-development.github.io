/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/cookie.js":
/*!**********************!*\
  !*** ./js/cookie.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteCookie: () => (/* binding */ deleteCookie),\n/* harmony export */   getCookie: () => (/* binding */ getCookie),\n/* harmony export */   setCookie: () => (/* binding */ setCookie)\n/* harmony export */ });\nfunction setCookie(name, value, length) {\n  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${length.toUTCString()}; path=/`;\n}\n\nfunction getCookie(name) {\n  const cookieString = document.cookie;\n  const cookies = cookieString.split('; ');\n  const targetCookie = cookies.find(row => row.startsWith(`${name}=`));\n  return targetCookie ? decodeURIComponent(targetCookie.split('=')[1]) : null;\n}\n\nfunction deleteCookie(name) {\n  const expires = new Date(0);\n  document.cookie = `${name}=; expires=${expires.toUTCString()}; path=/`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9jb29raWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU87QUFDUCx1QkFBdUIsS0FBSyxHQUFHLDRCQUE0QixVQUFVLHVCQUF1QjtBQUM1Rjs7QUFFTztBQUNQO0FBQ0Esd0NBQXdDO0FBQ3hDLDZEQUE2RCxLQUFLO0FBQ2xFO0FBQ0E7O0FBRU87QUFDUDtBQUNBLHVCQUF1QixLQUFLLEdBQUcsVUFBVSx3QkFBd0I7QUFDakUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8gLy4vanMvY29va2llLmpzP2FlY2YiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShuYW1lLCB2YWx1ZSwgbGVuZ3RoKSB7XG4gIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07IGV4cGlyZXM9JHtsZW5ndGgudG9VVENTdHJpbmcoKX07IHBhdGg9L2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xuICBjb25zdCBjb29raWVTdHJpbmcgPSBkb2N1bWVudC5jb29raWU7XG4gIGNvbnN0IGNvb2tpZXMgPSBjb29raWVTdHJpbmcuc3BsaXQoJzsgJyk7XG4gIGNvbnN0IHRhcmdldENvb2tpZSA9IGNvb2tpZXMuZmluZChyb3cgPT4gcm93LnN0YXJ0c1dpdGgoYCR7bmFtZX09YCkpO1xuICByZXR1cm4gdGFyZ2V0Q29va2llID8gZGVjb2RlVVJJQ29tcG9uZW50KHRhcmdldENvb2tpZS5zcGxpdCgnPScpWzFdKSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDb29raWUobmFtZSkge1xuICBjb25zdCBleHBpcmVzID0gbmV3IERhdGUoMCk7XG4gIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PTsgZXhwaXJlcz0ke2V4cGlyZXMudG9VVENTdHJpbmcoKX07IHBhdGg9L2A7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/cookie.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/cookie.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;