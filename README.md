root-class.js
=============

A really simple class library with inheritance and bound instance methods. It's pretty much a modified version of John Resig's "Simple JavaScript Inheritance".

## Howto

Require like so:

```javascript
var Class = require("root-class");
```

Classes are created by extending the base class.

```javascript

var Model = Class.extend({
    save: function() {
        console.log("hello");
    }
});
```

Classes can inherit each other by calling `.extend` on the parent class.

```javascript
var Post = Model.extend({
    save: function() {
        // Something else entirely
    },

    newMethod: function() {

    }
})
```

`._super` can be used to call up the inheritance chain for any method.

```javascript
var Post = Model.extend({
    save: function() {
        this._super();
    }
})
```

The constructor is called `initialize`.

```javascript
var Animal = Class.extend({
    initialize: function() {
        console.log("woof");
    }
})
```

One common problem with Javascript is that `this` is lost when out of scope. This is usually fixed by creating a `var self = this`, or using `.bind(this)`. This can get ugly and pretty cumbersome.

So to fix this root-class bind methods to the instance upon construction. It is awesome for when passing methods around as callbacks.

```javascript
var Dog = Animal.extend({
    initialize: function() {
        this.food = new Food();
        this.food.on("eat", this.log);
    },

    log: function(what) {
        // `this` is still correct
        console.log(this.something());
    },

    something: function() {
        return "I'm still here";
    }
});

var pooch = new Dog();

// Works when passing the methods around too
$("#home").on("click", pooch.log);
```