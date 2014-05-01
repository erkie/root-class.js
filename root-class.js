/*
 * Modified by Erik Rothoff Andersson
 * https://github.com/erkie/root-class
 */

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

var initializing = false;
var fnTest = /\b_super\b/;
	
// The base Class implementation (does nothing)
var Class = function(){};
	
// Create a new Class that inherits from this class
Class.extend = function(prop) {
	var parent = this.prototype;
		
	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializing = true;
	var prototype = new this();
	initializing = false;
		
	// Copy the properties over onto the new prototype
	for (var name in prop) {
		// Check if we're overwriting an existing function
		if ( typeof prop[name] === "function" &&  typeof parent[name] == "function" && fnTest.test(prop[name]) )
			prototype[name] = (function(name, fn){
				return function() {
					var tmp = this._super;
						
					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = parent[name];
						
					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);				
					this._super = tmp;
						
					return ret;
				};
			})(name, prop[name]);
		else
			prototype[name] = prop[name];
	}
		
	// The dummy class constructor
	function Class() {
		// All construction is actually done in the init method
		if ( !initializing ) {
			var self = this;
				
			// Bind all methods to this
			for ( var name in prototype ) if ( typeof prototype[name] === "function" && ["constructor"].indexOf(name) === -1 ) (function(name) {
				this[name] = this[name].bind ? this[name].bind(this) : function() {
					return self[name].apply(self, arguments);
				};
			}).call(this, name);
				
			if ( this.initialize )
				this.initialize.apply(this, arguments);
		}
	}
		
	// Populate our constructed prototype object
	Class.prototype = prototype;
		
	// Enforce the constructor to be what we expect
	Class.prototype.constructor = Class;

	// And make this class extendable
	Class.extend = arguments.callee;
		
	return Class;
};

module.exports = Class;