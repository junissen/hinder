

// Require hinder_DB
var db = require("../models");

module.exports = function(app) {


	// Get login page by render login handlebars
	app.get("/", function(req, res) {
    	res.render('login', {})
      });

	// Get request to check user login name and password when "LOGIN button is pressed"

	app.get("/api/user/check", function(req, res) {

		console.log(req.query);

		var user_name = req.query.user_name;
		var password = req.query.password;

		db.user.findAll({
			where: {
				user_name: user_name
			}
		}).then(function(result) {

			if(result.length == 0) {
				var textObject = {
					message: 'No user found'
				} 
				res.json({textObject})

			}
			else {
				if (result[0].dataValues.password == password) {
					var userInfo = {
						groupID: result[0].dataValues.group_id
					}

					res.json({userInfo})

				}

				else {
					// console.log("incorrect password for user");
					var textObject = {
						message: 'Incorrect password for user'
					}
					
					res.json({textObject})
					
				}
			}

		});

	});

}

