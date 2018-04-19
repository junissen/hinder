$(function() {

	// On submit button press, create new user database entry, adds to existing group or creates new group, and redirects user to login page
	$('#submitNewUser').on("click", function(event) {
		event.preventDefault();

		// Empty modal bodies if there
		$('.signupModalBody').empty();
		$('.errorModalBody').empty();
		
		// If user name has not been entered, display error modal
		if ($('#signup_userName').val() == "") {

			$('.errorModalBody').append("No user name chosen");
			$('#errorModal').modal("show");
		}

		// If password has not been entered, display error modal
		else if ($('#signup_password').val() == "") {

			$('.errorModalBody').append("No password chosen");
			$('#errorModal').modal("show");

		}

		// If profile image URL has not been entered, display error modal
		else if ($('#signup_profileImage').val() == "") {

			$('.errorModalBody').append("No profile image chosen");
			$('#errorModal').modal("show");

		}

		// If no group is chosen, assumes you are creating a new group
		else if ( $('#signup_groupChoice').val() == null)  {

			// If group name has been entered
			if ($("#signup_newGroupChoice").val() != "") {

				// If group category has not been chosen, display error modal
				if ($("#signup_groupCategoryChoice").val() == null) {

					$('.errorModalBody').append("No group category chosen");
					$('#errorModal').modal("show");

				}

				// Create new group and new user based off user input
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

					// GET request to check if group already exists
					$.ajax("/api/group/create", {
						type: 'GET',
						data: newGroupData
					}).then(function(response) {

						// If group does not already exist
						if (response.textObjectNone) {
							
							// POST request to create new group 
							$.ajax("/api/group/create", {
								type: 'POST',
								data: newGroupData
							}).then(function(response) {
								
								var newGroupName = response.group_name;
								newUserData["group_id"] = response.id;

								// GET request to check if user already exists 
								$.ajax("/api/user/create", {
									type: 'GET',
									data: newUserData
								}).then(function(response) {

									// If user does not already exist
									if (response.textObjectNone) {

										// POST request to create new user
										$.ajax("/api/user/create", {
											type: 'POST',
											data: newUserData
										}).then(function(response) {
											
											// Show success modal that user and group created
											var newUserName = response.user_name;
											var newDiv = $('<div>');
											newDiv.text("New user " + newUserName + " and new group " + newGroupName + " successfully created! Return to login page.");
											$('.signupModalBody').append(newDiv);

											$('#submitNewUserModal').modal('show');

										})

									}

									else {
										
										// If user already exists, show error modal
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
							// If group already exists, show error modal
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

			// If group name has not been chosen, display error modal
			else {

				$('.errorModalBody').append("No group name given");
				$('#errorModal').modal("show");

			}

		}

		// If user has chosen an existing group from drop down menu
		else if ( $('#signup_groupChoice').val() != null ) {

			// Create new user based off user input
			var newUserData = {
				user_name: $('#signup_userName').val().trim(),
				password: $('#signup_password').val().trim(),
				photo: $('#signup_profileImage').val().trim(),
				group_id: $('#signup_groupChoice').val()
			}

			// GET request to check if user already exists
			$.ajax("/api/user/create", {
				type: 'GET',
				data: newUserData
			}).then(function(response) {

				// If user does not already exist
				if (response.textObjectNone) {

					// POST request to create new user
					$.ajax("/api/user/create", {
						type: 'POST',
						data: newUserData
					}).then(function(response) {
						
						// Show success modal that user created
						var newUserName = response.user_name;
						var newDiv = $('<div>');
						newDiv.text("New user " + newUserName + " successfully created! Return to login page.");
						$('.signupModalBody').append(newDiv);

						$('#submitNewUserModal').modal('show');

					})

				}

				else {
					// If user already exists, show error modal
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

	// Returns user to login page on click
	$('#returntoLoginButton').on("click", function(event) {

		window.location.href = '../';
		return false

	})

	// Returns user to login page on click
	$('#returnHomeButton').on("click", function(event) {

		window.location.href = '../';
		return false

	})

})