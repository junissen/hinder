// Require sequelize models
var db = require("../models");

module.exports = function(app) {

	// GET request for login page
	app.get("/", function(req, res) {
		// Render login handlebars
    	res.render('login', {})
      });

	// GET request to check user login name and password 
	app.get("/api/user/check", function(req, res) {

		console.log(req.query);

		// Grab username and password passed into request by the user
		var user_name = req.query.user_name;
		var password = req.query.password;

		// Find all users with requested user name from user model
		db.user.findAll({
			where: {
				user_name: user_name
			}
		}).then(function(result) {

			// If returns empty array, user does not exist and textObject is return
			if(result.length == 0) {
				var textObject = {
					message: 'No user found'
				} 
				res.json({textObject})

			}

			// If returns array, user does exist
			else {

				// If password requested matches the password of the found user, userInfo is returned
				if (result[0].dataValues.password == password) {
					var userInfo = {
						userID: result[0].dataValues.id
					}

					res.json({userInfo})

				}

				// If password requested does not match the password of the found user, textObject is returned
				else {
					var textObject = {
						message: 'Incorrect password for user'
					}
					
					res.json({textObject})
					
				}
			}

		});

	});

}


