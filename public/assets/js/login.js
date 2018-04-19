$(function() {

	// Login button redirects to user home page or show error message
	$('#loginButton').on("click", function(event) {
		event.preventDefault();

		// Empty error modal body if applicable
		$('.errorModalLoginBody').empty();

		// Grab username and password from user input
		var userData = {
			user_name: $('#login_userName').val().trim(),
			password: $('#login_userPassword').val().trim()
		}

		// GET request to grab user ID from database
		$.ajax("/api/user/check", {
			type: 'GET',
			data: userData
		}).then(function(response) {
			console.log(response)

			// If request successful, redirects to user login page
			if (response.userInfo) {
				console.log(response.userInfo)
				var user_id = response.userInfo.userID;

				window.location.href = '/home/' + user_id;
			}

			// If not successful, displays error message
			else {

				$('.errorModalLoginBody').append(response.textObject.message);
				$('#errorModalLogin').modal("show");

				$('#login_userName').val("");
				$('#login_userPassword').val("");
			}
		})
	});

	// On signup button press, redirect to signup page
	$('#signupButton').on("click", function(event) {
		window.location.href = '/signup';
		return false
	})

})