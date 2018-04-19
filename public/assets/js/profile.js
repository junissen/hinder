$(function() {

	// On page load, determines group member whose profile page is being viewed and displays name in bold, red.
	var pathURL = window.location.pathname;
	var displayedUser = $(".groupMemberCard").find("a[data-url='" + pathURL + "']");
	displayedUser.attr("style", "color: red; font-weight: bold");

	// On return home button click, redirects to user homepage by parsing current url
	$('#returnHomeButton_Profile').on("click", function(event) {
		var pathArray = window.location.pathname.split( '/' );
		var userPath = pathArray[1].split('');
		var userId = userPath[4];
		window.location.href = "/home/" + userId;
		return false;
	});

	// On send prank button click, shows prank modal
	$('#sendPrankButtonProfile').on("click", function(event) {
		event.preventDefault();
		$('.prankModalProfile').modal("show");
	})


})