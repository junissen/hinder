// Require hinder_DB
var db = require("../models");

module.exports = function(app) {

	// Post a new hinder to db
	app.get("/api/hinder/create/:id", function(req, res) {

		var userID = req.params.id;
		var hinderData = {};

		db.hinder_category.findAll({
			attributes: ['id', ['hinder_type', 'type'], 'asset'],
		})
			.then(function(categories) {
				hinderData["categories"] = categories;

				db.user.findAll({
					attributes: ['group_id'],
					where: {
						id: userID
					}
				})
					.then(function(group_id) {

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
								hinderData["users"] = users;

								res.json(hinderData);
							});
					});
			});
	});


}