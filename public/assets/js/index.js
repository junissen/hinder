$(function() {

	// Show any pending pranks when first page load
	$('.pendingPrankModal').each(function() {
		$(this).modal('show')
	})

	// Show send prank modal when button clicked
	$('#sendPrankButton').on("click", function(event) {
		event.preventDefault();
		$('.prankModal').modal("show");
	})

	// Update complete variable on prank object once user has seen the pending prank
	$('.finishButton').on("click", function(event) {
		
		// Grabs hinder ID from data attribute of button
		var hinderId = $(this).data("id");

		var hinderData = {
			id: hinderId
		}

		// PUT request that changes prank object to complete 
		$.ajax("api/hinder/complete/update", {
			type: "PUT",
			data: hinderData
		}).then(function(response) {
			location.reload();
		})
	})

	// Thumbs up button for "Rate it" option. Adds 1 to thumbsUp count and displays
	$('.thumbsUp').on("click", function(event) {
		event.preventDefault();

		// Grabs current thumbs up count from button data attribute and adds 1
		var thumbsUpCount = $(this).data("newthumbsup");
		var newthumbsUpCount = parseInt(thumbsUpCount) + 1;

		// Grabs current prank id from button data attribute
		var prankID = $(this).data("id");

		var prankData = {
			id: prankID, 
			thumbsUp: newthumbsUpCount
		}

		// PUT request to update thumbs up count on prank
		$.ajax("api/thumbsup/update", {
			type: "PUT",
			data: prankData
		}).then(function(response) {
			console.log(response);
			location.reload();
		})
		
	});

	// Thumbs down button for "Rate it" option. Adds 1 to thumbsDown count and displays
	$('.thumbsDown').on("click", function(event) {
		event.preventDefault();

		// Grabs current thumbs down count from button data attribute and adds 1
		var thumbsDownCount = $(this).data("newthumbsdown");
		var newthumbsDownCount = parseInt(thumbsDownCount) + 1;

		// Grabs current prank id from button data attribute
		var prankID = $(this).data("id");

		var prankData = {
			id: prankID, 
			thumbsDown: newthumbsDownCount
		}

		// PUT request to update thumbs down count on prank
		$.ajax("api/thumbsdown/update", {
			type: "PUT",
			data: prankData
		}).then(function(response) {
			console.log(response);
			location.reload();
		})
		
	});

	// Plays audio asset on main page prank on click
	$('.playAudio').on("click", function(event) {
		$('.audioDiv')[0].play()
	});

	// Plays audio asset on modal prank on click
	$('.playAudioModal').on("click", function(event) {
		$('.audioDivModal')[0].play()
	});

	// Directs user to profile url using profile link data attribute
	$('.profileLink').on("click", function(event) {
		window.location.href = $(this).data("url");
		return false
	})	

	// On main page, return home button merely reloads page
	$('#returnHomeButton_Index').on("click", function(event) {
		location.reload();
	});
	
	// Logout button returns user to login page
	$('#logoutButton').on("click", function(event) {
		window.location.href = ('/');
		return false;
	})
})