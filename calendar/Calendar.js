var siqi = siqi || {};
/**
 * Require
 * -core.js
 * -_optionMixin.js
 */
(function($, siqi, undefined){
	/**
	 * @class Siqi Calendar
	 * @name siqi.calendar.Calendar
	 */
	var Calendar = siqi.declare("siqi.calendar.Calendar", [null, siqi._optionMixin],
	/**@lends siqi.calendar.Calendar.prototype*/
	{
		/**
		 * @type String
		 * Name of the widget. Should never be changed
		 */
		name: "siqi.calendar.Calendar",
		
		/**
		 * @type Date
		 * Current date.
		 */
		currentDate: new Date(),
		
		/**
		 * @type String
		 * Alias of the currentView of the Calendar
		 */
		currentView: "MonthView",
		
		/**
		 * @type Object
		 * A hash contains all available View plugins.
		 */
		views: null,
		
		/**
		 * @type Integer
		 * Current day, 1-31.
		 */
		date: 1,
		
		/**
		 * @type Integer
		 * Current month, 0-11.
		 */
		month: 0,
		
		/**
		 * @type Integer
		 * Current year.
		 */
		year: 2010,
		
		/**
		 * @type Array
		 * Days in each Month. e.g. [31, 28,29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		 */
		daysInMonth: null,
		
		/**
		 * @type Integer
		 * The start day of each week. 0-6
		 */
		startDay: 0,
		
		/**
		 * @type Integer
		 * First day of a month.
		 */
		firstDayInMonth: 0,
		
		/**
		 * @type Array
		 * Days in a week.
		 */
		weekDays: ["Sunday", "Monday", "Tuesday", "Wendnesday", "Thursday", "Friday", "Saturday"],
		
		constructor: function(options, element){
			if(arguments.length){
				this._createWidget(options, element);
			}
		},
		
		/**
		 * @private
		 * Create the widget
		 */
		_create: function(){
			// Mixin options and default parameters
			this.option({
				views: {
					"MonthView": new siqi.calendar.MonthView({
						calendar: this
					})
				},
				month: this.currentDate.getMonth(),
				year: this.currentDate.getFullYear()
			});
			
			this.render();
		},
		
		_createWidget: function(options, element){
			$.data(element, this.name, this);
			this.element = $(element);
			this.option($.extend(true, {}, options));
	
			var self = this;
			this.element.on( "remove." + this.name, function() {
				self.destroy();
			});
			this._create();
			this._init();
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
			var mainView = this.views[this.currentView];
			mainView.render();
		},
		
		/**
		 * Destroy the widget
		 * TODO Not sure need to do the event handler clean.
		 */
		destroy: function(){
			this.element
				.off(".Calendar")
				.removeData("Calendar");
		},
		
		/**
		 * Get the node element.
		 * TODO Do we need the method? Should it return the widget instance?
		 */
		widget: function(){
			return this.element;
		},
		
		_setMonth: function(value){
			this._set("month", value);
			this._updateFirstDayInMonth();
			
		},
		
		_setYear: function(value){
			this._set("year", value);
			this._updateFirstDayInMonth();
			this._updateDaysInMonth();
		},
		
		_updateFirstDayInMonth: function(){
			var startDate = new Date();
			startDate.setFullYear(this.year, this.month, 1);
			this.firstDayInMonth = startDate.getDay();
		},
		
		_updateDaysInMonth: function(){
			this.daysInMonth = [31, this.year % 4 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		}
	});

	// Register as JQuery plugin
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