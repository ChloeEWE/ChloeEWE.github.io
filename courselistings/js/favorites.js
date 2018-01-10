/*globals courses, currentState, courseContainer, renderCourseCard */

const showFavorites = document.getElementById('favorites_btn');
const showSearch = document.getElementById('cl_btn');

showFavorites.addEventListener("click", function () {
	showSearch.classList.remove("active");
	showFavorites.classList.add("active");
	$(courseContainer).empty();
	currentState.favoriteCourses.forEach(renderCourseCard);
});


showSearch.addEventListener("click", function () {
	showFavorites.classList.remove("active");
	showSearch.classList.add("active");
	$(courseContainer).empty();
	currentState.visibleCourses.slice(0, 20).forEach(renderCourseCard);
});