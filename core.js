var siqi = siqi || {};
(function($, siqi, g, undefined){
	/**
	 * @param baseClasses
	 * The base class of the class to be declared. Can be a single function or an array of functions.
	 * If an array of functions are feed, the first function in the array will be the super class while
	 * the others will be mixin classes.
	 * @param classDefinition
	 * The class definition includes class properties, methods. 
	 */
	siqi.declare = function(className, baseClasses, classDefinition){
		// Use baseClasses as classDefinition if only two params feeded.
		if(!classDefinition){
			classDefinition = baseClasses;
			baseClasses = null;
		}
		
		baseClasses = $.isArray(baseClasses) ? baseClasses : baseClasses ? [baseClasses] : [];
		// TODO: Check whether className contain illegal characters.
		var namespaces = className.split(".");
		if(!namespaces.length){
			return null;
		}
		var classObj = g;
		var packageLength = namespaces.length - 1;
		// Build up the packages for the class
		for(var i = 0; i < packageLength; i++){
			classObj[namespaces[i]] = classObj[namespaces[i]] || {};
			classObj = classObj[namespaces[i]];
		}
		
		var realConstructor = classDefinition["constructor"]
		var superClass = baseClasses[0];
		var constructor = function(){
			//Call parent constructors
			if(superClass){
				superClass.apply(this, arguments);
			}
			//Call self constructor
			realConstructor.apply(this, arguments);
		};
		var fakeConstructor = new Function();
		classDefinition["superClass"] = superClass;
		if(!superClass){
			baseClasses[0] = constructor;
		}
		var mixins = $.map(baseClasses, function(baseClass){
			fakeConstructor.prototype = baseClass.prototype;
			var result = new fakeConstructor();
			fakeConstructor.prototype = null;
			return result;
		});
		mixins.unshift(true);
		mixins.push(classDefinition);
		constructor.prototype = $.extend.apply(this, mixins);
		classObj[namespaces[packageLength]] = constructor;
		return constructor;
	};
})(jQuery, siqi, window);