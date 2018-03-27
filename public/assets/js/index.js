$(function() {

	// console.log($('#prankModal').data("pendingPranks"))

	for (var i = 0; i < $('.prankModal').length; i ++) {
		UIkit.modal($('.prankModal')).show();
	}

	$('.finishButton').on("click", function(event) {
		
		var hinderId = $(this).data("id");

		var hinderData = {
			id: hinderId
		}

		$.ajax("api/hinder/complete/update", {
			type: "PUT",
			data: hinderData
		}).then(function(response) {
			location.reload();
		})
	})

	$('.thumbsUp').on("click", function(event) {
		event.preventDefault();

		var thumbsUpCount = $(this).data("newthumbsup");
		var newthumbsUpCount = parseInt(thumbsUpCount) + 1;

		var prankID = $(this).data("id");

		var prankData = {
			id: prankID, 
			thumbsUp: newthumbsUpCount
		}

		$.ajax("api/thumbsup/update", {
			type: "PUT",
			data: prankData
		}).then(function(response) {
			console.log(response);
			location.reload();
		})
		
	});

	$('.thumbsDown').on("click", function(event) {
		event.preventDefault();

		var thumbsDownCount = $(this).data("newthumbsdown");
		var newthumbsDownCount = parseInt(thumbsDownCount) + 1;

		var prankID = $(this).data("id");

		var prankData = {
			id: prankID, 
			thumbsDown: newthumbsDownCount
		}

		$.ajax("api/thumbsdown/update", {
			type: "PUT",
			data: prankData
		}).then(function(response) {
			console.log(response);
			location.reload();
		})
		
	});

	$('#playAudio').on("click", function(event) {
		$('#audioDiv')[0].play()
	});

	$('#playAudioModal').on("click", function(event) {
		$('#audioDivModal')[0].play()
	});

	$('.profileLink').on("click", function(event) {
		window.location.href = $(this).data("url");
		return false
	})	

	$('#returnHomeButton_Index').on("click", function(event) {
		location.reload();
	})	
})