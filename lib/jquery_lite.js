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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1)

const $l = (selector) => {
    let htmlArray;
    if(typeof selector === "string" ){
        // querySelectorAll => returns a nodelist with all elements that match the selector
        // Overall use instead of getElementById or getElementByClassName
        let nodeList = document.querySelectorAll(selector);
        htmlArray = Array.from(nodeList)
    } else if(selector instanceof HTMLElement){
        // console.log('HTML ELEMENT')
        htmlArray = [selector]
        // console.log(htmlArray)
    }
    return new DOMNodeCollection(htmlArray)
};

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function DOMNodeCollection(array) {
    this.nodes = array;
}

DOMNodeCollection.prototype.html = function(str){
    if(Boolean(str)){
        // Sets innerHTML if string given
        for (let index = 0; index < this.nodes.length; index++) {
            this.nodes[index].innerHTML = str;
        }
    } else {
        // Returns innerHTML of first element
        return this.nodes[0].innerHTML
    }
}

DOMNodeCollection.prototype.empty = function(){
    for (let index = 0; index < this.nodes.length; index++) {
        // Sets inner html of each node to empty string
        this.nodes[index].innerHTML = '';
        
    }
}

DOMNodeCollection.prototype.append = function(str){
    let appendedHTML = '';
    if(str instanceof DOMNodeCollection){
        for (let index = 0; index < str.nodes.length; index++) {
            const topNode = $l(str.nodes[index]);
            appendedHTML += str.nodes[index].outerHTML
            str.nodes[index].outerHTML = ''    
        }
        
    } else {
        appendedHTML = str;
    }
    for (let index = 0; index < this.nodes.length; index++) {
        this.nodes[index].innerHTML += appendedHTML;        
    }
}


module.exports = DOMNodeCollection

/***/ })
/******/ ]);