var siqi = siqi || {};
/**
 * Require
 * -core.js
 */
(function($, siqi, undefined){
	/**
	 * @class Basic View code for all views
	 * @name siqi.View
	 */
	siqi.declare("siqi.calendar.View", [null, siqi._optionMixin],
	/** @lends siqi.calendar.View.prototype */
	{
		/**
		 * @type siqi.calendar.Calendar}
		 * Which calendar the view is attached to
		 */
		calendar: null,
		
		constructor: function(options){
			this.option(options);
			this._create(options);
		},
		
		/**
		 * @private
		 * Set the options
		 */
		_create: function(options){
			console.log("create");
		},
		
		/**
		 * Render the view
		 */
		render: function(){
		},
		
		/**
		 * Destory the view
		 */
		destory: function(){
		}
	});
})(jQuery, siqi);