$(function() {

	$('#loginButton').on("click", function(event) {
		event.preventDefault();

		$('.uk-alert-danger').remove();

		var userData = {
			user_name: $('#userName').val().trim(),
			password: $('#userPassword').val().trim()
		}

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
				$('#userName').val("");
				$('#userPassword').val("");
			}
		})
	});

	$('#signupButton').on("click", function(event) {
		window.location.href = '/signup';
		return false
	})

})