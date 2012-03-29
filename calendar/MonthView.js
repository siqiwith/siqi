var siqi = siqi || {};
(function($, siqi, undefined){
	/**
	 * @class Month View
	 * @name siqi.MonthView
	 * @augments siqi.View
	 */
	siqi.declare("siqi.calendar.MonthView", siqi.calendar.View,
	/** @lends siqi.calendar.MonthView.prototype */
	{
		_create: function(options){
		},
		
		/**
		 * Render the view
		 */
		render: function(){
			this._clearView();
			this._createHeader();
			this._createGridBackGround();
		},
		
		_createHeader: function(){
			var c = this.calendar;
			var self = this;
			var header = $("<div class=\"monthViewHeader\"></div>");
			$("<div class=\"monthViewHeaderBar\"><div class=\"monthViewPreButton\"><<</div><div class=\"monthViewLabel\">" + c.year + "-" + (c.month + 1) +"</div><div class=\"monthViewNexButton\">>></div></div>").appendTo(header);
			$(header).on("click", ".monthViewPreButton", function(){self._previousMonth();});
			$(header).on("click", ".monthViewNexButton", function(){self._nextMonth();});
			for(var i = 0; i < 7; i++){
				var cell = $("<div class=\"monthViewHeaderCell\">" + c.weekDays[i] + "</div>").appendTo(header);
			}
			header.appendTo(this.calendar.element);
		},
		
		_createGridBackGround: function(){
			var c = this.calendar;
			var days = c.daysInMonth[c.month];
			var daysInLastMonth = c.daysInMonth[c.month ? c.month - 1 : 11];
			var dayCounter = 1;
			var nextDayCounter = 1;
			var monthGrid = "<div class=\"monthViewMonth\">";
			for(var i = 0; i < 6; i++){
				var weekRow = "<div class=\"monthViewWeek\">";
				for(var j = 0; j < 7; j++){
					if((i == 0 && j < c.firstDayInMonth)){
						weekRow += "<div class=\"monthViewWeekDay monthViewPreMonth\">" + (daysInLastMonth - c.firstDayInMonth + j + 1) + "</div>";
					}else if(dayCounter > days){
						weekRow += "<div class=\"monthViewWeekDay monthViewNexMonth\">" + nextDayCounter + "</div>";
						nextDayCounter++;
					}else{
						weekRow += "<div class=\"monthViewWeekDay\">" + dayCounter + "</div>";
						dayCounter++;
					}
				}
				weekRow += "</div>";
				monthGrid += weekRow;
			}
			monthGrid += "</div>";
			$(monthGrid).appendTo(this.calendar.element);
		},
		
		_nextMonth: function(){
			var c = this.calendar;
			if(c.month == 11){
				c.option("month", 0);
				c.option("year", c.year + 1);
			}else{
				c.option("month", c.month + 1);
			}
			this.render();
		},
		
		_previousMonth: function(){
			var c = this.calendar;
			if(c.month == 0){
				c.option("month", 11);
				c.option("year", c.year - 1);
			}else{
				c.option("month", c.month - 1);
			}
			this.render();
		},
		
		_clearView: function(){
			this.calendar.element.empty();
		}
	});
})(jQuery, siqi);