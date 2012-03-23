/**
 * @author Siqi Zhong
 */
/**
 * @namespace
 */
var siqi = siqi || {};
(function($, siqi, g, undefined){
	/**
	 * @param {string} className (Optional)Name of the class.
	 * @param {array|function} baseClasses (Optional)Super classes of the class.
	 * The base class of the class to be declared. Can be a single function or an array of functions.
	 * If an array of functions are feed, the first function in the array will be the super class while
	 * the others will be mixin classes.
	 * @param {object} classDefinition
	 * The class definition includes class properties, methods. 
	 * @example
	 * var ClassA = siqi.declare("test.ClassA", null, {
	 *     constructor: function(){
	 *         console.log("Constructor test.ClassA");
	 *     };
	 * });
	 * @example
	 * var ClassA = siqi.declare("test.classA", {
	 *     constructor: function(){
	 *         console.log("Constructor test.ClassA");
	 *     };
	 * });
	 * @example
	 * var ClassA = siqi.declare({
	 *     constructor: function(){
	 *         console.log("Constructor test.ClassA");
	 *     };
	 * });
	 * @example
	 * var ClassA = siqi.declare("test.ClassA"{
	 *     constructor: function(){
	 *         console.log("Constructor test.ClassA");
	 *     };
	 * });
	 * var ClassB = siqi.declare("test.ClassB", test.ClassA, {
	 *     constructor: function(){
	 *         console.log("Constructor test.ClassB");
	 *     };
	 * });
	 * var ClassC = siqi.declare("test.ClassC", [test.ClassA, test.ClassB], {
	 *     constructor: function(){
	 *         console.log("Constructor test.ClassC");
	 *     };
	 * });
	 */
	siqi.declare = function(className, baseClasses, classDefinition){
		// TODO: Check whether className contain illegal characters.
		// if(illegalClassName){
		//     return false
		// }
		
		// Support anonymous class
		if(typeof className != "string"){
			classDefinition = baseClasses;
			baseClasses = className;
			className = "";
		}
		// Use baseClasses as classDefinition if only two params feeded.
		if(!classDefinition){
			classDefinition = baseClasses;
			baseClasses = null;
		}
		
		baseClasses = $.isArray(baseClasses) ? baseClasses : baseClasses ? [baseClasses] : [];
		
		// Build up the real constructor
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
		
		// Build up the packages for the class
		var namespaces = className.split(".");
		if(namespaces[0] != ""){
			var classObj = g;
			var packageLength = namespaces.length - 1;
			for(var i = 0; i < packageLength; i++){
				classObj[namespaces[i]] = classObj[namespaces[i]] || {};
				classObj = classObj[namespaces[i]];
			}
			classObj[namespaces[packageLength]] = constructor;
		}
		return constructor;
	};
})(jQuery, siqi, window);