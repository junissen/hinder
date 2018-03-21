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



}



