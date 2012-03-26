var siqi = siqi || {};
/**
 * Require
 * -core.js
 * -_optionMixin.js
 */
(function($, siqi, undefined){
	/**
	 * @class Options for siqi.calendar.Calendar
	 * @name siqi.calendar.Calendar.options
	 */
	var defaultOptions = {
		/**
		 *  @property {string} currentView Alias of the currentView of the Calendar
		 */
		currentView: "MonthView",
		/**
		 *  @property {object} A hash contains all available View plugins.
		 */
		views: {}
	};
	
	/**
	 * @class Siqi Calendar
	 * @name siqi.calendar.Calendar
	 */
	var Calendar = siqi.declare("siqi.calendar.Calendar", [null, siqi._optionMixin], {
		constructor: function(options, element){
			if(arguments.length){
				this._createWidget(options, element);
			}
		},
		
		/**
		 * @property {string} name The name of the widget. Should never be changed
		 */
		name: "siqi.calendar.Calendar",
		
		/**
		 * @property {siqi.calendar.View} currentView Current view of the calendar.
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
			// Add default views
			this.option({
				views: {
					"MonthView": new siqi.calendar.MonthView({
									calendar: this
								})
				}
			});
			
			this.render();
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
			var options = this.option();
			var mainView = options["views"][options["currentView"]];
			mainView.render();
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
			name = "siqi.calendar.Calendar",
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