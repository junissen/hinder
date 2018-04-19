$(function() {

	$('#sendPrankButton').on("click", function(event) {
		event.preventDefault();

		$('#prankCategory')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		$('#prankTarget')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		var pathArray = window.location.pathname.split( '/' );
		var userID = pathArray[2];

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

	$('#submitPrank').on("click", function(event) {
		event.preventDefault();

		var pathArray = window.location.pathname.split( '/' );
		var userID = pathArray[2];
		var groupID = $('#groupCardTitle').data("group");

		var dataObject = {
			category_id: $('#prankCategory').val(),
			group_id: groupID,
			target_id: $('#prankTarget').val()
		}

		console.log(dataObject)

		$.ajax('/api/hinder/create/' + userID, {
			method: "POST",
			data: dataObject
		}).then(function(response) {
			console.log(response);

			$('.prankModal').modal("hide");

			location.reload();

		})
	});

	$('#sendPrankButtonProfile').on("click", function(event) {
		event.preventDefault();

		$('#prankCategoryProfile')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		$('#prankTargetProfile')
			.empty()
			.append('<option value="0" selected disabled>Select an option</option>')
		;

		var pathArray = window.location.pathname.split( '/' );

		var userString = pathArray[1].split('');

		var userID = userString[4];

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

	$('#submitPrankProfile').on("click", function(event) {
		event.preventDefault();

		var pathArray = window.location.pathname.split( '/' );
		var userString = pathArray[1].split('');
		var userID = userString[4];
		var groupID = $('#groupCardTitleProfile').data("group");

		var dataObject = {
			category_id: $('#prankCategoryProfile').val(),
			group_id: groupID,
			target_id: $('#prankTargetProfile').val()
		}

		console.log(dataObject)

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

