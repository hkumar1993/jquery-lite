### html

If a string is given, cycle through each node and replace thje `innerHTML`

Vanilla JS Functions
* `element.querySelectorAll(selector)` => Returns a Node List of all elements that match the selector listed under the element (element can be `document` and select all elements with that selector)
* `innerHTML` => Returns the innerHTML in string format of the element (exclusive of html tags)
* `outerHTML` => Returns the outerHTML in string format of the element (inclusive of html tags)
* `attributes` => Returns an array of attributes. Each attribute holds a `name` and a `value`
    * `name` => attribute name (i.e. 'id', 'type', etc.)
    * `value` => attribute value
* `classList` => Returns an array of all classes on an element
    * `add` => Adds classes to the element (ensure that it is an array of strings, not string with spaces)
    * `remove` => Removes classes from the element (ensure that it is an array of strings, not string with spaces)
* `cloneNode(deep)` => Clones the given node. `deep` is a boolean value, `true` would make a deep clone of the element
* `element.addEventListener(event, callback)` => Add a callback when the specified event is triggered
    * `click` => mouse click
    * `mouseenter` => mouse hovers into the element
    * [More](https://developer.mozilla.org/en-US/docs/Web/Events)
