$(function(){
	var currentUri = window.location.pathname;
	var elementName = currentUri.replace(/^\/([^\/]*).*$/, '$1');

	// selected element from the navigation
	$('ul.nav li.' + ((elementName.length > 0) ? elementName : 'home')).addClass('active');
});