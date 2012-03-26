var siqi = siqi || {};
(function($, siqi, undefined){
	/**
	 * @class Month View
	 * @name siqi.MonthView
	 * @augments siqi.View
	 */
	siqi.declare("siqi.calendar.MonthView", siqi.calendar.View, {
		render: function(){
			$("<div style=\"width: 100px; height: 100px; background: blue;\"></div>").appendTo(this.option("calendar").element);
		}
	});
})(jQuery, siqi);