$(document).ready(function () {
var links = document.links;
    
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    links[i].target = '_blank';
}
});

//used code from https://gist.github.com/CrocoDillon/7989214