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

const callbackQueue = []
let domReady = false;

window.$l = function(selector) {
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
    } else if(selector instanceof Function){
        if(domReady){
            selector()
        } else {
            callbackQueue.push(selector)
        }
        htmlArray = [document]
    }
    return new DOMNodeCollection(htmlArray)
};

$l.extend = function(...objects){
    return Object.assign({}, ...objects)
}

$l.ajax = function(options){
    let response = new XMLHttpRequest()
    const defaults = {
        async: true,
        method: 'GET',
        success: function(data){  },
        error: function (e) {  }, 
        url: window.location.href, 
        data: {}, 
        contentType: 'application / x - www - form - urlencoded; charset=UTF - 8'
    }
    options = $l.extend(defaults, options)
    // console.log('OPTIONS', options)
    response.onreadystatechange = function(){
        if(this.readyState ==4 && this.status == 200){
            options.success(JSON.parse(this.responseText))
        } else if(this.readyState == 4 && this.status == 404 ){
            options.error(this.responseText)
        }
    }

    response.open(options.method, options.url, options.async)
    response.send()
    return response
}

console.log('Hello from before loading', domReady)

$l(function(){
    console.log('Hello from after loading', domReady)
})



document.addEventListener('DOMContentLoaded', () => {
    domReady = true;
    window.domReady = domReady
    while (callbackQueue.length > 0){
        const callback = callbackQueue.pop()
        callback()
    }
})

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
        // Append moves ( NOT COPIES) each instance of the selected nodes
        for (let index = 0; index < str.nodes.length; index++) {
            const topNode = $l(str.nodes[index]);
            // Add outerhtml of each node to the string
            appendedHTML += str.nodes[index].outerHTML
            // delete each element ( in this case make the outerhtml to an empty string )
            str.nodes[index].outerHTML = ''    
        }
        
    } else {
        appendedHTML = str;
    }
    for (let index = 0; index < this.nodes.length; index++) {
        this.nodes[index].innerHTML += appendedHTML;        
    }
}

DOMNodeCollection.prototype.attr = function(attributeName) {
    if(!attributeName){
        // Throw error if no attribute given
        throw 'Attribute Undefined'
    } else {
        // get all attributes
        let attr = this.nodes[0].attributes
        
        // cycle through all attributes until the desired attribute is found
        for (let index = 0; index < attr.length; index++) {
            const currentAttribute = attr[index];
            if( currentAttribute.name === attributeName ){
                // if attribute found, return the value
                return currentAttribute.value;
            }
        }
        // throw error if attribute not found
        throw `Attribute ${attributeName} not found`
    }
}

DOMNodeCollection.prototype.addClass = function(className) {
    // split classes into array because classlist add does not take spaces
    const classes = className.split(' ')
    for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        // classList add
        element.classList.add(...classes)
    }
}

DOMNodeCollection.prototype.remove = function(className) {
    // split classes into array because classlist remove does not take spaces
    const classes = className.split(' ')
    for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        // classList remove
        element.classList.remove(...classes)
    }
}

DOMNodeCollection.prototype.children = function() {
    let children = [];
    for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        // classList remove
        const elementChildren = Array.from(element.children)
        elementChildren.forEach( (child) => {
            if(!children.includes(child))
                children.push(child);
        })
    }
    return new DOMNodeCollection(children)
}

DOMNodeCollection.prototype.parent = function() {
    let parents = [];
    for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        // classList remove
        if(!parents.includes(element.parentElement))
            parents.push(element.parentElement)
    }
    return new DOMNodeCollection(parents)
}

DOMNodeCollection.prototype.find = function(selector) {
    let foundElements = []
    if(!selector)
        return new DOMNodeCollection([])
    for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        // query selector all selects all elements under the base element, not neccesarily needs to be documnet....
        let elements = Array.from(element.querySelectorAll(selector))
        elements.forEach((found) => {
            if(!foundElements.includes(found))
                foundElements.push(found)
        })
    }
    return new DOMNodeCollection(foundElements)
}

DOMNodeCollection.prototype.remove = function(){
    const removedElements = []
    while(this.nodes.length > 0){
        const element = this.nodes.shift()
        // cloneNode makes a copy of the node
        // (true) makes a deep clone
        removedElements.push(element.cloneNode(true))
        element.outerHTML = ''
    }
    return new DOMNodeCollection(removedElements)
}

DOMNodeCollection.prototype.on = function(handler, callback){
    for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        if(!element.eventListeners)
            element.eventListeners = []
        element.eventListeners.push({
            handler,
            callback
        })
        element.addEventListener(handler, callback)
    }
}

DOMNodeCollection.prototype.off = function() {
    for (let index = 0; index < this.nodes.length; index++) {
        const element = this.nodes[index];
        if (!element.eventListeners)
            continue;
        element.eventListeners.forEach( ( { handler, callback } ) => {
            element.removeEventListener(handler, callback)
        } )
    }
}


module.exports = DOMNodeCollection

/***/ })
/******/ ]);