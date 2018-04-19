$(function() {
	// Send prank button for main page
	$('#sendPrankButton').on("click", function(event) {
		event.preventDefault();

		// Empties any existing options in drop down menu for prank category and populates initial default option
		$('#prankCategory')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		// Empties any existing options in drop down menu for prank target and populates initial default option
		$('#prankTarget')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		// Grabs current url and parses out current user ID
		var pathArray = window.location.pathname.split( '/' );
		var userID = pathArray[2];

		// GET request to grab prank categories and group members for current user and populates results into drop down menus
		$.ajax('/api/hinder/create/' + userID, {
			method: "GET",
			data: userID
		}).then(function(response) {
			
			for (var i = 0; i < response.categories.length; i ++) {

				var optionDiv = $("<option>");
				optionDiv.attr("value", response.categories[i].id);
				optionDiv.text(response.categories[i].type);
				$('#prankCategory').append(optionDiv)
			}

			for (var i = 0; i < response.users.length; i ++) {

				var optionDiv = $("<option>");
				optionDiv.attr("value", response.users[i].id);
				optionDiv.text(response.users[i].user_name);
				$('#prankTarget').append(optionDiv)
			}
		})
	});

	// Submit prank button for main page
	$('#submitPrank').on("click", function(event) {
		event.preventDefault();

		// Grab user ID and group ID from url pathway and data attribute
		var pathArray = window.location.pathname.split( '/' );
		var userID = pathArray[2];
		var groupID = $('#groupCardTitle').data("group");

		// grab category and target ids from user input
		var dataObject = {
			category_id: $('#prankCategory').val(),
			group_id: groupID,
			target_id: $('#prankTarget').val()
		}

		console.log(dataObject)

		// POST request to create new prank. Hide prank modal and reload current page.
		$.ajax('/api/hinder/create/' + userID, {
			method: "POST",
			data: dataObject
		}).then(function(response) {
			console.log(response);

			$('.prankModal').modal("hide");

			location.reload();

		})
	});

	// Send prank button for profile pages
	$('#sendPrankButtonProfile').on("click", function(event) {
		event.preventDefault();

		// Empties any existing options in drop down menu for prank category and populates initial default option
		$('#prankCategoryProfile')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		// Empties any existing options in drop down menu for prank target and populates initial default option
		$('#prankTargetProfile')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		// Grabs current url and parses out current user ID
		var pathArray = window.location.pathname.split( '/' );
		var userString = pathArray[1].split('');
		var userID = userString[4];

		// GET request to grab prank categories and group members for current user and populates results into drop down menus
		$.ajax('/api/hinder/create/' + userID, {
			method: "GET",
			data: userID
		}).then(function(response) {
			
			for (var i = 0; i < response.categories.length; i ++) {

				var optionDiv = $("<option>");
				optionDiv.attr("value", response.categories[i].id);
				optionDiv.text(response.categories[i].type);
				$('#prankCategoryProfile').append(optionDiv)
			}

			for (var i = 0; i < response.users.length; i ++) {

				var optionDiv = $("<option>");
				optionDiv.attr("value", response.users[i].id);
				optionDiv.text(response.users[i].user_name);
				$('#prankTargetProfile').append(optionDiv)
			}
		})
	});

	// Submit prank button for profile pages
	$('#submitPrankProfile').on("click", function(event) {
		event.preventDefault();

		// Grab user ID and group ID from url pathway and data attribute
		var pathArray = window.location.pathname.split( '/' );
		var userString = pathArray[1].split('');
		var userID = userString[4];
		var groupID = $('#groupCardTitleProfile').data("group");

		// grab category and target ids from user input
		var dataObject = {
			category_id: $('#prankCategoryProfile').val(),
			group_id: groupID,
			target_id: $('#prankTargetProfile').val()
		}

		console.log(dataObject)

		// POST request to create new prank. Hide prank modal and reload current page.
		$.ajax('/api/hinder/create/' + userID, {
			method: "POST",
			data: dataObject
		}).then(function(response) {
			console.log(response);

			$('.prankModalProfile').modal("hide");

			location.reload();

		})
	});

});

