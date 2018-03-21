// Require hinder_DB
var db = require("../models");

module.exports = function(app) {

	app.get("/signup", function(req, res) {

		var signupObject = {};

		db.group.findAll({}).then(function(result) {

			signupObject["groups"] = result;

			db.group_category.findAll({}).then(function(result) {

				signupObject["categories"] = result;

				res.render('signup', signupObject)

			})


		})


    });

    app.get("/api/user/create", function(req, res) {
    	db.user.findAll({
			where: {
				user_name: req.query.user_name
			}
		}).then(function(result) {

			if(result.length == 0) {
				var textObjectNone = {
					message: 'No user found'
				} 
				res.json({textObjectNone})
			}

			else {
				var textObjectFound = {
					message: 'This username has already been taken'
				} 
				res.json({textObjectFound})
			}
		});
    });

    app.post("/api/user/create", function(req, res) {

    	db.user.create({
    		"user_name": req.body.user_name,
    		"password": req.body.password,
    		"photo": req.body.photo,
    		"phone_number": req.body.phone_number,
    		"phone_carrier": req.body.phone_carrier,
    		"group_id": req.body.group_id
    	}).then(function(result) {
    		res.json(result)
    	})

    });

}



