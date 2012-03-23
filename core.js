var siqi = siqi || {};
(function($, siqi, undefined){
	/**
	 * @param baseClasses
	 * The base class of the class to be declared. Can be a single function or an array of functions.
	 * If an array of functions are feed, the first function in the array will be the super class while
	 * the others will be mixin classes.
	 * @param classDefinition
	 * The class definition includes class properties, methods. 
	 */
	siqi.declare = function(baseClasses, classDefinition){
		baseClasses = $.isArray(baseClasses) ? baseClasses : baseClasses ? [baseClasses] : [];
		var constructor = classDefinition["constructor"]
		var superClass = baseClasses[0];
		var classObj = function(){
			//Call parent constructors
			if(superClass){
				superClass.apply(this, arguments);
			}
			//Call self constructor
			constructor.apply(this, arguments);
		};
		var fakeConstructor = new Function();
		classDefinition["superClass"] = superClass;
		if(!superClass){
			baseClasses[0] = classObj;
		}
		var mixins = $.map(baseClasses, function(baseClass){
			fakeConstructor.prototype = baseClass.prototype;
			var result = new fakeConstructor();
			fakeConstructor.prototype = null;
			return result;
		});
		mixins.unshift(true);
		mixins.push(classDefinition);
		classObj.prototype = $.extend.apply(this, mixins);

		return classObj;
	};
})(jQuery, siqi);