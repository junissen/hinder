// Require hinder_DB
var db = require("../models");

module.exports = function(app) {

	app.get("/signup", function(req, res) {

		var signupObject = {
			groups: [],
			group_ids: [],
			groupCategories: [],
			groupCategories_id: []
		}

		db.group.findAll({}).then(function(result) {

			for (var i = 0; i < result.length; i ++ ) {
				signupObject.groups.push(result[i].dataValues.group_name)
				signupObject.groups_ids.push(result[i].dataValues.id)
			}

			console.log(signupObject.groups)
			console.log(signupObject.group_ids)
		})
    	
    	res.render('signup', {});

    	// db.group_category.findAll({}).then(function(result) {

    	// 	for (var i = 0; i < )
    	// })
    });



}


