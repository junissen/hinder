$(function() {

	// On login button press, AJAX request to get user group ID and redirect to user home page or show error message
	$('#loginButton').on("click", function(event) {
		event.preventDefault();

		// Remove alert if there
		$('.uk-alert-danger').remove();

		var userData = {
			user_name: $('#login_userName').val().trim(),
			password: $('#login_userPassword').val().trim()
		}

		// Contact user check to pull group/password information from model
		$.ajax("/api/user/check", {
			type: 'GET',
			data: userData
		}).then(function(response) {
			console.log(response)

			if (response.userInfo) {
				var group_id = response.userInfo.groupID;

				window.location.href = '/home/' + group_id;
			}

			else {
				var newDiv = $('<div>');
				newDiv.addClass('uk-alert-danger uk-width-1-1');
				newDiv.text(response.textObject.message);
				$('#loginForm').prepend(newDiv);
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