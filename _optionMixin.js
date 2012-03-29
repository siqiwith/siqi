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
				// Do not return all properties of the instance
				return false;
			}
			if(typeof key === "string"){
				if(value === undefined){
				// Get single attribute
					return this[key];
				}
				options = {};
				options[key] = value;
			}
			// Set attributes
			this._setOptions(options);
			return this;
		},
		
		/**
		 * @private
		 * Set options for the class
		 */
		_setOptions: function(options){
			var self = this;
			$.each(options, function(key, value){
				var setter = "_set" + key.slice(0, 1).toUpperCase() + key.slice(1);
				if(self[setter]){
					self[setter].apply(self, [value]);
				}else{
					self._set(key, value);
				}
			});	
			return this;
		},
		
		/**
		 * @private
		 * Set option
		 */
		_set: function(key, value){
			this[key] = value;
			return this;
		}
	});
})(jQuery, siqi);