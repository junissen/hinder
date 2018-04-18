$(function() {

	// On submit button press, create new user database entry and redirect to login page
	$('#submitNewUser').on("click", function(event) {
		event.preventDefault();

		// Remove modal body if there
		$('.signupModalBody').empty();
		$('.errorModalBody').empty();
		
		if ($('#signup_userName').val() == "") {

			$('.errorModalBody').append("No user name chosen");
			$('#errorModal').modal("show");
		}

		else if ($('#signup_password').val() == "") {

			$('.errorModalBody').append("No password chosen");
			$('#errorModal').modal("show");

		}

		else if ($('#signup_profileImage').val() == "") {

			$('.errorModalBody').append("No profile image chosen");
			$('#errorModal').modal("show");

		}

		else if ( $('#signup_groupChoice').val() == null)  {

			if ($("#signup_newGroupChoice").val() != "") {

				if ($("#signup_groupCategoryChoice").val() == null) {

					$('.errorModalBody').append("No group category chosen");
					$('#errorModal').modal("show");

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
											newDiv.text("New user " + newUserName + " and new group " + newGroupName + " successfully created! Return to login page.");
											$('.signupModalBody').append(newDiv);

											$('#submitNewUserModal').modal('show');

										})

									}

									else {

										$('.errorModalBody').append(response.textObjectFound.message);
										$('#errorModal').modal("show");

										$('#signup_userName').val("");
										$('#signup_password').val("");
										$('#signup_profileImage').val("");
										$('#signup_groupChoice').val("");

									}

								})

							})

						}

						else {
							
							$('.errorModalBody').append(response.textObjectFound.message);
							$('#errorModal').modal("show");

							$("#signup_groupCategoryChoice").val("");
							$("#signup_bio_newGroupChoice").val("");
							$("#signup_photo_newGroupChoice").val("");
							$("#signup_groupCategoryChoice").val("");
						}


					});

				}

			}

			else {

				$('.errorModalBody').append("No group name given");
				$('#errorModal').modal("show");

			}



		}

		else if ( $('#signup_groupChoice').val() != null ) {

			var newUserData = {
				user_name: $('#signup_userName').val().trim(),
				password: $('#signup_password').val().trim(),
				photo: $('#signup_profileImage').val().trim(),
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
						newDiv.text("New user " + newUserName + " successfully created! Return to login page.");
						$('.signupModalBody').append(newDiv);

						$('#submitNewUserModal').modal('show');

					})

				}

				else {

					$('.errorModalBody').append(response.textObjectFound.message);
					$('#errorModal').modal("show");


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

	$('#returntoLoginButton').on("click", function(event) {

		window.location.href = '../';
		return false

	})

	$('#returnHomeButton').on("click", function(event) {

		window.location.href = '../';
		return false

	})

})