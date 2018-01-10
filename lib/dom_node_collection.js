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