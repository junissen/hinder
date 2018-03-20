// Require Express
var express = require("express");

var router = express.Router();

// Require hinder_DB
var db = require("../models");

//GET request for all hinders by group ID
router.get('/home', function(req, res) {
	db.hinder.findAll({
		where: {
			group_id: 1
		}
	}).then(function(error, result) {
		res.json(result);
	});
});

module.exports = router;