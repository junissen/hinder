// Require hinder_DB
var db = require("../models");

module.exports = function(app) {

	//GET request for a users profile information
	app.get('/user/:id', function(req, res) {

		var userId = req.params.id;
		console.log("user ID: " + userId);

		db.user.findAll({
			where: {
				id: userId
			},
			include: [{
				model: db.group,
				as: 'group',
				required: true
			}]
		})
			.then(function(user) {

				res.render('profile', {
					user: user
				})
				//res.json(user);
			});
	});
}