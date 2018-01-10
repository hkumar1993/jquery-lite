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


module.exports = DOMNodeCollection