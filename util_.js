define([], function() {

var siqi = {
	valueTemplateSettings: {
		variable: 'data',
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	},
	
	nlsTemplateSettings: {
		variable: 'nls',
		evaluate: /\{\{$(.+?)\}\}/g,
		interpolate: /\{\{(.+?)\}\}/g,
		escape: /\{\{-(.+?)\}\}/g
	},
	
	appendUrlParams: function(str, params){
		var href = str;
		var isFirst = false;
		if(href.indexOf("?") < 0){
			href += "?";
			isFirst = true;
		}
		
		for(var i in params){
			if(!isFirst){
				href += "&";
			}else{
				isFrist = false;
			}
			href += i;
			href += "=";
			href += params[i];
		}
		
		return href;
	},
	
	getUrlParams: function(){
		var href = window.location.href;
		var si = href.indexOf("?");
		var queryStr = href.slice(si + 1);
		return this.queryToObject(queryStr);
	},
	
	queryToObject: function(str){
		var params = str.split("&");
		var result = {}, dURI = decodeURIComponent;
		for(var i = 0; i < params.length; i++){
			var param = params[i];
			if(param.length){
				var si = param.indexOf("=");
				if(si < 0){
					name = dURI(param);
					val = "";
				}else{
					name = dURI(param.slice(0, si));
					val  = dURI(param.slice(si + 1));
				}
				if(typeof result[name] == "string"){
					result[name] = [result[name]];
				}
		
				if(_.isArray(result[name])){
					result[name].push(val);
				}else{
					result[name] = val;
				}
			}
		}
		return result;
	},
	
	template: function(tplStr, options){
		//	options:
		//		nlsObject
		//		returnStr
		//		valueTemplateSettings
		//		nlsTemplateSettings
		var targetStr = tplStr;
		if(_.isObject(options)){
			if(options["valueTemplateSettings"]){
				_.extend(this.valueTemplateSettings, options["valueTemplateSettings"]);
			}
			if(options["nlsTemplateSettings"]){
				_.extend(this.nlsTemplateSettings, options["nlsTemplateSettings"]);
			}
			if(_.isObject(options["nlsObject"])){
				targetStr = _.template(targetStr, this.nlsTemplateSettings)(options["nlsObject"]);
			}
			if(options["returnStr"]){
				return targetStr;
			}
		}
		
		return _.template(targetStr, this.valueTemplateSettings);	
	}
}
window.siqi = siqi;
	
return siqi;

})