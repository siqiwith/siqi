var siqi = siqi || {};
(function($, siqi, undefined){
	/**
	 * @class Month View
	 * @name siqi.MonthView
	 * @augments siqi.View
	 */
	siqi.declare("siqi.calendar.MonthView", siqi.calendar.View, {
		/**
		 * @property {Date} startDay The start day of each week.
		 */
		startDay: 0,
		
		/**
		 * @property {number} firstDate First day of the month.
		 */
		firstDay: 0,
		
		_create: function(options){
			var c = this.calendar;
			var startDate = new Date();
			
			startDate.setFullYear(c.currentYear, c.currentMonth, 1);
			this.firstDay = startDate.getDay();
			console.log(this.firstDay);
		},
		
		render: function(){
			this._createHeader();
			this._createGridBackGround();
		},
		
		_createHeader: function(){
			var c = this.calendar;
			var header = $("<div class=\"monthViewHeader\"></div>");
			$("<div class=\"monthViewHeaderBar\"><div class=\"monthViewPreButton\"><<</div><div class=\"monthViewLabel\">" + c.currentYear + "-" + c.currentMonth +"</div><div class=\"monthViewNexButton\">>></div></div>").appendTo(header);
			for(var i = 0; i < 7; i++){
				var cell = $("<div class=\"monthViewHeaderCell\">" + c.weekDays[i] + "</div>").appendTo(header);
			}
			header.appendTo(this.calendar.element);
		},
		
		_createGridBackGround: function(){
			var c = this.calendar;
			var days = c.daysInMonth[c.currentMonth];
			var daysInLastMonth = c.daysInMonth[c.currentMonth ? c.currentMonth - 1 : 11];
			var dayCounter = 1;
			var monthGrid = "<div class=\"monthViewMonth\">";
			for(var i = 0; i < 5; i++){
				var weekRow = "<div class=\"monthViewWeek\">";
				for(var j = 0; j < 7; j++){
					if((i == 0 && j < this.firstDay)){
						weekRow += "<div class=\"monthViewWeekDay monthViewPreMonth\">" + (daysInLastMonth - this.firstDay + j + 1) + "</div>";
					}else if(dayCounter > days){
						weekRow += "<div class=\"monthViewWeekDay monthViewNexMonth\">&nbsp</div>";
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
		
		_setFirstDay: function(){
		}
	});
})(jQuery, siqi);