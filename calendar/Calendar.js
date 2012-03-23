var siqi = siqi || {};
/**
 * Require
 * -core.js
 */
(function($, siqi, undefined){
	var defaultOptions = {
		name: "siqi.Calendar"
	};
	
	/**
	 * @class Siqi Calendar
	 * @name siqi.Calendar
	 */
	var Calendar = siqi.Calendar = siqi.declare(null, {
		constructor: function(options, element){
			if(arguments.length){
				this._createWidget(options, element);
			}
		},
		
		/**
		 * @property {string} name The name of the widget. Should never be changed
		 */
		name: defaultOptions.name,
		
		/**
		 * @property {siqi.View} currentView Current view of the calendar.
		 */
		currentView: null,
		
		_createWidget: function(options, element){
			$.data(element, this.name, this);
			this.element = $(element);
			this.options = $.extend(true, {},
				defaultOptions,
				options);
	
			var self = this;
			this.element.on( "remove." + this.name, function() {
				self.destroy();
			});
			this._create();
			this._init();
		},
		
		/**
		 * @private
		 * Create the widget
		 */
		_create: function(){
			this.render();
			$("<div style=\"width: 100px; height: 100px; background: blue;\"></div>").appendTo(this.element);
		},
		
		/**
		 * @private
		 * Initial the widget
		 */
		_init: function(){
			
		},
		
		/**
		 * Render the current view
		 */
		render: function(){
			//this.currentView.render();
		},
		
		/**
		 * Get options or set options for widget
		 */
		option: function(key, value){
			var options = key;
			if(arguments.length === 0){
				// don't return a reference to the internal hash
				return $.extend({}, this.options);
			}
			if(typeof key === "string"){
				if(value === undefined){
					return this.options[key];
				}
				options = {};
				options[key] = value;
			}
			this._setOptions(options);
			return this;
		},
		
		/**
		 * @private
		 * Set options for the widget
		 */
		_setOptions: function(options){
			var self = this;
			$.each(options, function(key, value){
				self._setOption(key, value);
			});	
			return this;
		},
		
		/**
		 * @private
		 * Set option
		 * TODO add mapping for _setXXX method
		 */
		_setOption: function(key, value){
			this.options[key] = value;
			return this;
		},
		
		/**
		 * Destroy the widget
		 */
		destroy: function(){
			this.element
				.off(".Calendar")
				.removeData("Calendar");
		},
		
		/**
		 * Get the node element.
		 * TODO Do we need the method? or should return the widget instance?
		 */
		widget: function(){
			return this.element;
		}
	});

	// Register the plugin
	$.fn.siqicalendar = function(options){
		// Register the widget plugin in the same way as jQuery UI widget does
		var isMethodCall = typeof options === "string",
			name = defaultOptions.name,
			args = Array.prototype.slice.call(arguments, 1),
			returnValue = this;
		
		// prevent calls to internal methods
		if(isMethodCall && options.charAt( 0 ) === "_"){
			return returnValue;
		}
		
		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply(null, [true, options].concat(args)) :
			options;
			
		if(isMethodCall){
			this.each(function(){
				// instance: The widget instance bound to the node
				// methodValue: The return value of the method or the instance of the widget
				var instance = $.data(this, name),
					methodValue = instance && $.isFunction(instance[options]) ?
						instance[options].apply(instance, args) : 
						instance;
				if(!instance){
					console.log("cannot call methods on " + name + " prior to initialization; " +
					"attempted to call method '" + options + "'");
				}
				if(!$.isFunction(instance[options])){
					console.log("no such method '" + options + "' for " + name + " widget instance");
				}
				if(methodValue !== instance && methodValue !== undefined){
					// Get the return value from the method call, break the loop
					returnValue = methodValue;
					return false;
				}
			});
		}else{
			this.each(function(){
				var instance = $.data(this, name);
				if(instance){
					instance.option(options || {})._init();
				} else {
					// Create widget instance
					$.data(this, name, new Calendar(options, this));
				}
			});
		}
		return returnValue;
	};
})(jQuery, siqi);