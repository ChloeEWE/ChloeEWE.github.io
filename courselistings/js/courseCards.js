/*globals courses, currentState */

const courseContainer = document.getElementById("course_list");
const courseTemplate = document.getElementById("course_card");
const sectionsTemplate = document.getElementById("sections_card");
const sectionRowTemplate = document.getElementById("section_row");

const registerButtonTemplate = document.getElementById("registration_button");
const waitlistButtonTemplate = document.getElementById("waitlist_button");

function toggleButton(event) {
	function toggleButtonType(target, off, on, buttonType) {
		target.lastChild.textContent = ` ${target.lastChild.textContent.trim() === off ? on : off}`;
		target.classList.toggle(`btn-outline-${buttonType}`);
		target.classList.toggle(`btn-${buttonType}`);
	}

	const target = event.target;
	const classList = target.classList;
	if (classList.contains("registerButton")) {
		toggleButtonType(target, 'Register', 'Unregister', 'success');
	} else if (classList.contains("favoriteButton")) {
		toggleButtonType(target, 'Favorite', 'Unfavorite', 'danger');
	} else if (classList.contains("waitlistButton")) {
		toggleButtonType(target, 'Join Waitlist', 'Drop Waitlist', 'warning');
	}
}

function addAttributes(template, course) {
	const attrList = template.querySelector(".no-bullets.attribute-list");
	if ($.isEmptyObject(course.attributes)) {
		attrList.parentElement.remove();
		return;
	}

	if (attrList !== null && attrList.childElementCount === 0) {
		for (let entry of Object.entries(course.attributes)) {
			const school = entry[0];
			const attrs = entry[1];
			const elem = document.createElement("li");
			elem.innerHTML = `<b>${school}:</b> ${attrs.join(",&nbsp;")}`;
			attrList.appendChild(elem);
		}
	}
}

function addDetailsButton(template, course) {
	const detail = template.querySelector(".details");
	const detailToggle = template.querySelector(".detailToggle");

	detail.id = `${course.school}${course.department}${course.course_number}`;
	detailToggle.id = `${detail.id}toggle`;
	detailToggle.href = `#${detail.id}`;
}

function addRegistrationButton(row, section) {
	const buttonContainer = row.querySelector('.registration');
	const seatsFree = section.seats - section.enrolled > 0;

	const template = (seatsFree ? registerButtonTemplate : waitlistButtonTemplate).cloneNode(true).content;
	template.addEventListener('click', toggleButton);
	buttonContainer.appendChild(template);

}

function addMainSections(sectionsContainer, course) {
	const template = sectionsTemplate.cloneNode(true).content;
	const table = template.querySelector("tbody.section_table");
	const fields = ['days', 'start_time', 'end_time', 'instructors', 'location', 'final', 'seats', 'enrolled', 'waiting'];

	course.main_sections.forEach(section => {
		const row = sectionRowTemplate.cloneNode(true).content;
		row.querySelector("th").textContent = section.section_id;

		const tds = row.querySelectorAll("td");
		for (let i = 0; i < fields.length; i++) {
			let contents = section[fields[i]];
			if (Array.isArray(contents)) {
				contents = contents.join(", ");
			}
			tds[i].innerHTML = contents;
		}
		addRegistrationButton(row, section);
		table.appendChild(row);
	});
	sectionsContainer.appendChild(template);
}

function renderCourseCard(course) {
	const template = courseTemplate.cloneNode(true).content;

	template.querySelector(".department").textContent = course.department;
	template.querySelector(".credits").textContent = course.credits;
	template.querySelector(".title").textContent = course.title;
	template.querySelector(".course_number").textContent = course.course_number;


	if (course.description === "") {
		template.querySelector(".description").parentElement.remove();
	} else {
		template.querySelector(".description").textContent = course.description;
	}

	addDetailsButton(template, course);
	addAttributes(template, course);
	addMainSections(template.querySelector(".sections_container"), course);

	const card = document.importNode(template, true);

	if (currentState.favoriteCourses.has(course)) {
		toggleButton({target: card.querySelector('.favoriteButton')});
	}

	card.querySelector('.detailToggle').addEventListener('click', (event) => {
		const target = event.target;
		const off = "Show Details & Registration";
		const on = "Hide Details & Registration";

		target.textContent = target.text.trim() === off ? on : off;
	});

	card.querySelector('.favoriteButton').addEventListener('click', () => {
		if (currentState.favoriteCourses.has(course)) {
			currentState.favoriteCourses.delete(course);
		} else {
			currentState.favoriteCourses.add(course);
		}
	});

	// card.querySelector('.init_reg_btn').addEventListener('click', function() {
	// 	$(`${course.school}${course.department}${course.course_number}`).collapse('toggle');
	// });

	card.querySelector('.init_reg_btn').dataset.target = `#${course.school}${course.department}${course.course_number}`;

	card.querySelectorAll('button').forEach(i => i.addEventListener('click', toggleButton));
	courseContainer.appendChild(card);
}