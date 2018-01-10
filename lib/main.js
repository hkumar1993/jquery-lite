const DOMNodeCollection = require('./dom_node_collection.js')

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
