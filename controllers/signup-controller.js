// Require sequelize models
var db = require("../models");

module.exports = function(app) {

	// GET request for signup page load
	app.get("/signup", function(req, res) {

		// Create empty signupObject
		var signupObject = {};

		// Find all groups using group model
		db.group.findAll({}).then(function(result) {

			// Add results to signupObject
			signupObject["groups"] = result;

			// Find all group categories using group_category model
			db.group_category.findAll({}).then(function(result) {

				// Add results to signupObject
				signupObject["categories"] = result;

				// Render signup handlebars and pass in signupObject
				res.render('signup', signupObject)

			})
		})
    });

	// GET request to check existing user
    app.get("/api/user/create", function(req, res) {
		
		// Find all users with the requested user name
    	db.user.findAll({
			where: {
				user_name: req.query.user_name
			}
		}).then(function(result) {

			// If an empty array is returned, no user has that username
			if(result.length == 0) {
		
				var textObjectNone = {
					message: 'No user found'
				} 

				// Return textObjectNone
				res.json({textObjectNone})
			}

			// If array is returned, a user already has that username
			else {
				var textObjectFound = {
					message: 'This username has already been taken'
				} 
				
				// Return textObjectFound
				res.json({textObjectFound})
			}
		});
    });

	// POST request to create new user
    app.post("/api/user/create", function(req, res) {

		// Create new entry in user model using user input 
    	db.user.create({
    		"user_name": req.body.user_name,
    		"password": req.body.password,
    		"photo": req.body.photo,
    		"group_id": req.body.group_id
    	}).then(function(result) {
    		res.json(result)
    	})

    });

	// GET request to check existing group
    app.get("/api/group/create", function(req, res) {

		// Find all groups with requested group name
    	db.group.findAll({
			where: {
				group_name: req.query.group_name
			}
		}).then(function(result) {

			// If an empty array is returned, no group has that group name
			if(result.length == 0) {
				var textObjectNone = {
					message: 'No group found'
				} 

				// Return textObjectNone
				res.json({textObjectNone})
			}

			// If array is returned, a group already has that group name
			else {
				var textObjectFound = {
					message: 'This group name has already been taken'
				} 

				// Return textObjectFound
				res.json({textObjectFound})
			}
		});
    });

	// POST request to create new group
    app.post("/api/group/create", function(req, res) {

		// Create new entry in group model using user input 
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



