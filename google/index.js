$(document).ready(function () {
	initCalendar();


// Updated upstream



	$("#clear_schedule_btn").click(function () {
		$("#time_table").find("td").removeClass("isActive");
	});

});


function initCalendar() {
	for (var i = 0; i < 25; i++) {
		var divide = Math.floor(i / 2) + 8;
		var ampm = (i < 8) ? "A" : "P";
		var mod = (i % 2 === 0) ? ":00" : ":30";
		divide = (divide > 12) ? (divide - 12) : (divide);

		var time = divide.toString();
		time += mod + ampm;
		// console.log(time);

		$("#time_table")
			.append('<tr class=' + time + '><td class="time">' + time + '</td><td class="M clickable"></td><td class="T clickable"></td><td class="W clickable"></td><td class="R clickable"></td><td class="F clickable"></td><td class="S clickable"></td>');

	}
}

//Calendar stuff
var leftButtonDown = false;
var adding = true;

$(document).mousedown(function (e) {
	if (e.which === 1) {
		leftButtonDown = true;
	}

	var t = e.target;
	if ($(t).hasClass('isActive')){
		// console.log("removing");
		adding = false;
	}
	else{
		// console.log("adding");
		adding = true;
	}

});

$(document).mouseup(function (e) {
	if (e.which === 1) {
		leftButtonDown = false;
	}
	// $(".changed").removeClass("changed");
});

function tweakMouseMoveEvent(e) {
	if (e.which === 1 && !leftButtonDown) {
		e.which = 0;
	}
}

$(document).mousemove(function (e) {
	tweakMouseMoveEvent(e);
	// console.log(e.target);
	var t = e.target;
	if (t.parentElement !== null && t.parentElement.parentElement !== null && t.parentElement.parentElement.parentElement !== null) {
		var f = t.parentElement.parentElement.parentElement;
		var p = f.id;
	}

	if ((p === 'time_table') && leftButtonDown) {
		// checkCourseSchedule();
		if (!$(t).hasClass('time') && $(t)[0].nodeName !== "TH") {

			// $(t).addClass("changed");
			if (!$(t).hasClass('isActive') && adding) {
				$(t).addClass("isActive");
			}

			else {
				if(!adding){
					$(t).removeClass("isActive");
				}
			}
		}
	}
});

$(document).click(function (e) {
	var t = e.target;
	if (t.parentElement !== null && t.parentElement.parentElement !== null && t.parentElement.parentElement.parentElement !== null) {
		var f = t.parentElement.parentElement.parentElement;
		var p = f.id;
	}

	if ((p === 'time_table')) {
		// checkCourseSchedule();
		if (!$(t).hasClass('time') && $(t)[0].nodeName !== "TH" && !$(t).hasClass("changed")) {

			$(t).addClass("changed");
			if (!$(t).hasClass('isActive')) {
				$(t).addClass("isActive");
			}
			else {
				$(t).removeClass("isActive");
			}
		}
	}
});


var selectedTimes = {"M": [], "T": [], "W": [], "R": [], "F": [], "S": []};
var timesSelected = 0;

function fillSelectedTimes() {
	selectedTimes = {"M": [], "T": [], "W": [], "R": [], "F": [], "S": []};
	var scheduleActives = $('.isActive');
	timesSelected = 0;

	for (var i = 0; i < scheduleActives.length; i++) {

		var day = $(scheduleActives[i]).attr('class').split(' ')[0];
		var parent = scheduleActives[i].closest('tr');
		var trTime = $(parent).attr('class').split(' ')[0];

		if ($.inArray(trTime, selectedTimes.day) === -1) {
			selectedTimes[day].push(trTime);
			timesSelected += 1;
		}

	}
}

function checkCourseSchedule(course, included) {
	timesSelected = 0;
	var sections = [];
	sections.concat(course.main_sections);
	if (course.subsections !== null) {
		sections.concat(course.subsections);
	}

	for (var i = 0; i < sections.length; i++) {
		var startTime = sections[i].start_time;
		var endTime = sections[i].end_time;
		var days = sections[i].days;
		for (var j = 0; j < sections[i].days.length; j++) {
			var startGood = false;
			var endGood = false;
			if (selectedTimes[days[j]].indexOf(startTime) !== -1) {
				startGood = true;
			}
			if (selectedTimes[days[j]].indexOf(endTime) !== -1) {
				endGood = true;
			}
		}

	}

	const inTimePeriod = startGood && endGood;

	return included ? inTimePeriod : !inTimePeriod;
}


$("#clear_filters_btn").click(function(){
	$(".card-body input").val("");

	$(".select2-selector").val(null).trigger("change");


	$(".form-check-input").each(function(){
		if($(this).prop('checked')){
			$(this).prop('checked', false);
		}
	});
	recheck();
});

// $(".select2-selector").select2({
// 	minimumResultsForSearch: -1
// });


$(".init_reg_btn").click(function(){
	alert("clicked");
	// console.log($(this).closest(".details"));
});