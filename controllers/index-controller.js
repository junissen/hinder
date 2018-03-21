// Require Express
// var express = require("express");

// var router = express.Router();

// Require hinder_DB
var db = require("../models");

module.exports = function(app) {
//GET request for all hinders by group ID

	app.get('/home/:id', function(req, res) {

		var groupId = req.params.id;

		db.hinder.findAll({
			where: {
				group_id: groupId
			},
			include: {
				model: db.hinder_category,
				as: 'category',
				required: true
			}
		}).then(function(result) {
			var hinderObject = {
				groupHinders: result
			}

			res.json({hinderObject});
		});
	});
}
