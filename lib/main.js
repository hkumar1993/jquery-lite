const DOMNodeCollection = require('./dom_node_collection.js')

const callbackQueue = []
let domReady = false;

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

console.log('Hello from before loading', domReady)

$l(function(){
    console.log('Hello from after loading', domReady)
})

window.$l = $l;

document.addEventListener('DOMContentLoaded', () => {
    domReady = true;
    window.domReady = domReady
    while (callbackQueue.length > 0){
        const callback = callbackQueue.pop()
        callback()
    }
})