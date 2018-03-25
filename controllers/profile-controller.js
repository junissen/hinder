// Require hinder_DB
var db = require("../models");

module.exports = function(app) {

	//GET request for a users profile information
	app.get('/user/:yourid/:otherid?', function(req, res) {

		var userId; 

		if (req.params.otherid) {
			userId = req.params.otherid;
		}

		else {
			userId = req.params.yourid;
		}

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
					user: user[0]
				})

				console.log(JSON.parse(JSON.stringify(user)));
			});
	
	});
}