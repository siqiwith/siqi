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
	var View = siqi.View = siqi.declare(null, {
		constructor: function(args){
			console.log("args***");
			console.log(args);
			console.log("***");
			this._create();
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