// Require sequelize models
var db = require("../models");

module.exports = function(app) {

	// GET request to create new prank
	app.get("/api/hinder/create/:id", function(req, res) {

		// Grabs user id from URL
		var userID = req.params.id;
		// Creates empty object to store hinder data
		var hinderData = {};

		// Grabs all hinder categories from hinder_category model
		db.hinder_category.findAll({
			attributes: ['id', ['hinder_type', 'type'], 'asset'],
		})
			.then(function(categories) {
				// Adds resulting objects to hinderData object
				hinderData["categories"] = categories;

				// Grabs current group id based off current user
				db.user.findAll({
					attributes: ['group_id'],
					where: {
						id: userID
					}
				})
					.then(function(group_id) {
						// Grabs all users with the same group id 
						db.user.findAll({
							attributes: ['user_name', 'id'],
							where: {
								group_id: group_id[0].group_id,
								id: {
									// Excluding current User Id
									[db.Sequelize.Op.ne]: userID
								}
							}
						}).
							then(function(users) {
								// Adds resulting objects to hinderData object
								hinderData["users"] = users;

								// returns object with prank categories and group members as json object
								res.json(hinderData);
							});
					});
			});
	});

	// POST request to create new prank
	app.post("/api/hinder/create/:id", function(req, res) {

		// Grabs user id from URL
		var userID = parseInt(req.params.id);

		// Creates new entry in hinder model based off user input
		db.hinder.create({
			"category_id": req.body.category_id,
			"group_id": req.body.group_id,
			"pranker_id": userID,
			"target_id": req.body.target_id
		}).then(function(result) {
			res.json(result)
		});

	});


}







