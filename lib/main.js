const DOMNodeCollection = require('./dom_node_collection.js')

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
    if(Object.keys(options.data).length > 0){
        options.url += `?${convertToQueryString(options.data)}`
    }
    // console.log('OPTIONS', options)
    response.onreadystatechange = function(){
        if(this.readyState ==4 && this.status == 200){
            options.success(JSON.parse(this.response))
        } else if(this.readyState == 4 && this.status == 404 ){
            options.error(this.response)
        }
    }

    response.open(options.method, options.url, options.async)
    response.send()
    return response
}

function convertToQueryString(object){
    let string = ''
    const keys = Object.keys(object)
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        const value = obejct[key]
        string += `${key}=${value}`
        if(index < keys.length - 1){
            string += `&`
        }
    }
    
    return string
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