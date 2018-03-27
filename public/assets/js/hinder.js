$(function() {

	$('#newPrankButton').on("click", function(event) {
		event.preventDefault();

		$('#prankAlert').remove();
		$('#prankSuccessButton').remove();

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
		var groupID = $('#groupCard').data("group");

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

			var newDiv = $('<div>');
			newDiv.attr("id", "prankAlert")
			newDiv.addClass('uk-alert-success uk-width-1-1');
			newDiv.text("Prank sent!");
			$('.prankDiv').prepend(newDiv);

			setTimeout(reloadWindow, 1000);
		})
	});

	$('#closePrank').on("click", function(event) {
		location.reload();
	})

});

function reloadWindow() {
	location.reload();
}