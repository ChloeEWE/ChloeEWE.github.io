$(document).ready(function () {
    
var links = document.links;
for (var link in links) {
    link.target = '_blank';
    alert(link.innerHTML());
}
    
});