$(function() {

	// On submit button press, create new user database entry and redirect to login page
	$('#submitNewUser').on("click", function(event) {
		event.preventDefault();


		// Remove alert if there
		$('.uk-alert-danger').remove();
		$('.uk-alert-success').remove();

		if ($('#signup_userName').val() == "") {
			var newDiv = $('<div>');
			newDiv.addClass('uk-alert-danger uk-width-1-1');
			newDiv.text("No user name chosen");
			$('#signupForm').prepend(newDiv);
		}

		else if ($('#signup_password').val() == "") {
			var newDiv = $('<div>');
			newDiv.addClass('uk-alert-danger uk-width-1-1');
			newDiv.text("No password chosen");
			$('#signupForm').prepend(newDiv);
		}

		else if ($('#signup_profileImage').val() == "") {
			var newDiv = $('<div>');
			newDiv.addClass('uk-alert-danger uk-width-1-1');
			newDiv.text("No profile image chosen");
			$('#signupForm').prepend(newDiv);
		}

		else if ($('#signup_phoneNumber').val() == "") {
			var newDiv = $('<div>');
			newDiv.addClass('uk-alert-danger uk-width-1-1');
			newDiv.text("No phone number chosen");
			$('#signupForm').prepend(newDiv);
		}

		else if ($('input[name=radioPhone]:checked', '#signup_phoneForm').val() == null) {
			var newDiv = $('<div>');
			newDiv.addClass('uk-alert-danger uk-width-1-1');
			newDiv.text("No phone carrier selected");
			$('#signupForm').prepend(newDiv);
		}

		else if ( $('#signup_groupChoice').val() == null)  {

			if ($("#signup_newGroupChoice").val() != "") {

				if ($("#signup_groupCategoryChoice").val() == null) {
					var newDiv = $('<div>');
					newDiv.addClass('uk-alert-danger uk-width-1-1');
					newDiv.text("No group category chosen");
					$('#signupForm').prepend(newDiv);
				}

				else {
					var newGroupData = {
						group_name: $("#signup_newGroupChoice").val(),
						bio: $("#signup_bio_newGroupChoice").val(),
						photo: $("#signup_photo_newGroupChoice").val(),
						category_id: $("#signup_groupCategoryChoice").val(),
					}

					var newUserData = {
						user_name: $('#signup_userName').val().trim(),
						password: $('#signup_password').val().trim(),
						photo: $('#signup_profileImage').val().trim(),
						phone_number: $('#signup_phoneNumber').val().trim(),
						phone_carrier: $('input[name=radioPhone]:checked', '#signup_phoneForm').val().trim()
					}

					$.ajax("/api/user/create", {
						type: 'GET',
						data: newUserData
					}).then(function(response) {

						if (response.textObjectNone) {

							$.ajax("/api/group/create", {
								type: 'POST',
								data: newGroupData
							}).then(function(response) {
								
								var newGroupName = response.group_name;
								var newDiv = $('<div>');
								newDiv.addClass('uk-alert-success uk-width-1-1');
								newDiv.text("New group " + newGroupName + " successfully created!");
								$('#signupForm').prepend(newDiv);

								newUserData["group_id"] = response.id;

								$.ajax("/api/user/create", {
									type: 'GET',
									data: newUserData
								}).then(function(response) {

									if (response.textObjectNone) {

										$.ajax("/api/user/create", {
											type: 'POST',
											data: newUserData
										}).then(function(response) {
											
											var newUserName = response.user_name;
											var newDiv = $('<div>');
											newDiv.addClass('uk-alert-success uk-width-1-1');
											newDiv.text("New user " + newUserName + " successfully created! Return to login page.");
											$('#signupForm').prepend(newDiv);

										})

									}

									else {

										var newDiv = $('<div>');
										newDiv.addClass('uk-alert-danger uk-width-1-1');
										newDiv.text(response.textObjectFound.message);
										$('#signupForm').prepend(newDiv);
										$('#signup_userName').val("");
										$('#signup_password').val("");
										$('#signup_profileImage').val("");
										$('#signup_phoneNumber').val("");
										$('#signup_phoneCarrier').val("");
										$('#signup_groupChoice').val("");

									}

								})

							})

						}

						else {

							var newDiv = $('<div>');
							newDiv.addClass('uk-alert-danger uk-width-1-1');
							newDiv.text(response.textObjectFound.message);
							$("#signup_groupCategoryChoice").val("");
							$("#signup_bio_newGroupChoice").val("");
							$("#signup_photo_newGroupChoice").val("");
							$("#signup_groupCategoryChoice").val("");
						}


					});

				}

			}

			else {
				var newDiv = $('<div>');
				newDiv.addClass('uk-alert-danger uk-width-1-1');
				newDiv.text("No group name given");
				$('#signupForm').prepend(newDiv);
			}



		}

		else if ( $('#signup_groupChoice').val() != null ) {

			var newUserData = {
				user_name: $('#signup_userName').val().trim(),
				password: $('#signup_password').val().trim(),
				photo: $('#signup_profileImage').val().trim(),
				phone_number: $('#signup_phoneNumber').val().trim(),
				phone_carrier: $('input[name=radioPhone]:checked', '#signup_phoneForm').val().trim(),
				group_id: $('#signup_groupChoice').val()
			}

			$.ajax("/api/user/create", {
				type: 'GET',
				data: newUserData
			}).then(function(response) {

				if (response.textObjectNone) {

					$.ajax("/api/user/create", {
						type: 'POST',
						data: newUserData
					}).then(function(response) {
						
						var newUserName = response.user_name;
						var newDiv = $('<div>');
						newDiv.addClass('uk-alert-success uk-width-1-1');
						newDiv.text("New user " + newUserName + " successfully created! Return to login page.");
						$('#signupForm').prepend(newDiv);

					})

				}

				else {

					var newDiv = $('<div>');
					newDiv.addClass('uk-alert-danger uk-width-1-1');
					newDiv.text(response.textObjectFound.message);
					$('#signupForm').prepend(newDiv);
					$('#signup_userName').val("");
					$('#signup_password').val("");
					$('#signup_profileImage').val("");
					$('#signup_phoneNumber').val("");
					$('#signup_phoneCarrier').val("");
					$('#signup_groupChoice').val("");

				}

			})

		}

		
	});

	$('#returnLogin').on("click", function(event) {

		window.location.href = '../';
		return false

	})

})