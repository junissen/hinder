$(function() {


	$('#returnHomeButton_Profile').on("click", function(event) {
		var pathArray = window.location.pathname.split( '/' );
		var userPath = pathArray[1].split('');
		var userId = userPath[4];
		window.location.href = "/home/" + userId;
		return false;
	})	

})