webpackJsonp([1],{

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(170);


/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
var Rx = __webpack_require__(59);

const blockXs = '\n\n\n';
const blockMd = '\n\n\n\n\n\n\n';
const mark = __WEBPACK_IMPORTED_MODULE_0_jquery__('.markdown-textarea');
const init = Rx.Observable.create(observer => {
    mark.text('## 接口名称' + blockXs +
        '## 接口描述' + blockXs +
        '## 请求报文' + blockMd +
        '## 返回报文' + blockMd);
});
init.subscribe();


/***/ })

},[169]);
//# sourceMappingURL=excelToMark.js.map