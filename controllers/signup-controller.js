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
    		"group_id": req.body.group_id
    	}).then(function(result) {
    		res.json(result)
    	})

    });

    app.get("/api/group/create", function(req, res) {
    	db.user.findAll({
			where: {
				group_name: req.query.group_name
			}
		}).then(function(result) {

			if(result.length == 0) {
				var textObjectNone = {
					message: 'No group found'
				} 
				res.json({textObjectNone})
			}

			else {
				var textObjectFound = {
					message: 'This group name has already been taken'
				} 
				res.json({textObjectFound})
			}
		});
    });

    app.post("/api/group/create", function(req, res) {

    	db.group.create({
    		"group_name": req.body.group_name,
    		"bio": req.body.bio,
    		"photo": req.body.photo,
    		"category_id": req.body.category_id 
    	}).then(function(result) {
    		res.json(result)
    	})
    })

}



