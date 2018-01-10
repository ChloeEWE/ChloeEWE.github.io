/* global fillSelectedTimes, courses, timesSelected, Fuse, courseContainer, renderCourseCard, checkCourseSchedule, abbreviations */

const currentState = {
	visibleCourses: courses.slice(0, 20),
	favoriteCourses: new Set(),
	keywordMatchingCourses: courses,
	selectedDepts: new Set(),
	selectedSchools: new Set(),
	selectedMajors: new Set(),
	selectedAttributes: new Set(),
	selectedLevels: new Set(),
	independentStudyAllowed: false,
	showOnlyOpenClasses: false,
	hideTakenCourses: false,
	scheduleFilter: null,
	takenCourses: new Set(['131', '132', '222S', '330S', '240', '104D', '214'])
};


const schoolSelect = $("#school-select");
const majorSelect = $("#major-select");
const deptSelect = $("#dept-select");
const attributeSelect = $("#attribute-select");
const independentCheck = $("#independentCheck");
const takenCheck = $("#takenCheck");
const openSeatsCheck = $("#openCheck");
const level1 = $("#levelCheck1");
const level2 = $("#levelCheck2");
const level3 = $("#levelCheck3");
const level4 = $("#levelCheck4");
const level5 = $("#levelCheck5");
const scheduleRadios = $('input[name="select_schedule"]');


const fuse = new Fuse(courses, {
	shouldSort: true,
	findAllMatches: true,
	threshold: 0.6,
	location: 0,
	distance: 100,
	maxPatternLength: 40,
	minMatchCharLength: 0,
	keys: ['title', 'main_sections.instructors', 'course_number']
});

const selectOptions = {
	allowClear: true,
	theme: "bootstrap",
	width: "95%",
	tags: false,
	tokenSeparators: [',']
};
deptSelect.select2(Object.assign({data: abbreviations.department}, selectOptions));
schoolSelect.select2(Object.assign({data: abbreviations.school}, selectOptions));
majorSelect.select2(Object.assign({data: abbreviations.major}, selectOptions));
attributeSelect.select2(Object.assign({data: abbreviations.attribute}, selectOptions));


function recheck() {
	fillSelectedTimes();

	function check(course) {
		if (currentState.selectedDepts.size > 0 && !currentState.selectedDepts.has(course.department)) {
			return false;
		}

		if (currentState.selectedMajors.size > 0 && (course.majorReq === undefined || !course.majorReq.some(i => currentState.selectedMajors.has(i)))) {
			return false;
		}


		if (currentState.selectedAttributes.size > 0 &&
			((currentState.selectedAttributes.has("NSM") && (course.attributes['A&S IQ'] === undefined || course.attributes['A&S IQ'][0] !== 'NSM')) ||
				(((currentState.selectedAttributes.has("EN:S") && (course.attributes.EN === undefined || course.attributes.EN[0] !== 'S')))))) {
			return false;
		}

		if (currentState.selectedSchools.size > 0 && !currentState.selectedSchools.has(course.school)) {
			return false;
		}

		const course_level = Math.min(course.course_number[0], 5);
		if (currentState.selectedLevels.size > 0 && !currentState.selectedLevels.has(course_level)) {
			return false;
		}

		if (currentState.showOnlyOpenClasses && course.main_sections.every(c => c.seats - c.enrolled < 1)) {
			return false;
		}

		if (!currentState.independentStudyAllowed && course.title.match(/.*independent study.*/i)) {
			return false;
		}
		if (currentState.hideTakenCourses && currentState.takenCourses.has(course.course_number)) {
			return false;
		}
		if (timesSelected > 0 && currentState.scheduleFilter !== null) {
			return checkCourseSchedule(course, currentState.scheduleFilter === "include");
		}
		return true;
	}

	currentState.visibleCourses = currentState.keywordMatchingCourses.filter(check);
	$(courseContainer).empty();
	currentState.visibleCourses.slice(0, 20).forEach(renderCourseCard);
}

deptSelect.on('change', () => {
	currentState.selectedDepts = new Set(deptSelect.select2('data').map(i => i.id));
	recheck();
});

schoolSelect.on('change', () => {
	currentState.selectedSchools = new Set(schoolSelect.select2('data').map(i => i.id));
	recheck();
});

majorSelect.on('change', () => {
	currentState.selectedMajors = new Set(majorSelect.select2('data').map(i => i.id));
	recheck();
});

attributeSelect.on('change', () => {
	currentState.selectedAttributes = new Set(attributeSelect.select2('data').map(i => i.id));
	recheck();
});

independentCheck.on('change', () => {
	currentState.independentStudyAllowed = independentCheck.prop("checked");
	recheck();
});

takenCheck.on('change', () => {
	currentState.hideTakenCourses = takenCheck.prop("checked");
	recheck();
});

openSeatsCheck.on('change', () => {
	currentState.showOnlyOpenClasses = openSeatsCheck.prop("checked");
	recheck();
});

scheduleRadios.on('change', (event) => {
	const target = event.target;
	currentState.scheduleFilter = target.value === "init" ? null : target.value;
	recheck();
});


function checkBox(event) {
	const box = $(event.target);
	const val = Number.parseInt(box.val());
	if (box.prop("checked")) {
		currentState.selectedLevels.add(val);
	} else {
		currentState.selectedLevels.delete(val);
	}
	recheck();
}

[level1, level2, level3, level4, level5].forEach(box => box.on('change', checkBox));


function search(by) {
	currentState.keywordMatchingCourses = (by === "" ? courses : fuse.search(by)).slice(0, 20);
	$(courseContainer).empty();
	currentState.keywordMatchingCourses.forEach(renderCourseCard);
	recheck();
}


$('#searchText').on('keyup', function () {
	search($(this).val());
});

currentState.visibleCourses.slice(0, 20).forEach(renderCourseCard);

