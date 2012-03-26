var siqi = siqi || {};
(function($, siqi, undefined){
	/**
	 * @class Mixin class provides 'option' method.
	 * @name siqi._optionMixin
	 */
	siqi.declare("siqi._optionMixin", {
		/**
		 * Get options or set options for class
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
		 * Set options for the class
		 */
		_setOptions: function(options){
			var self = this;
			this.options = this.options || {};
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
	});
})(jQuery, siqi);