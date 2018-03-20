// Require hinder_DB
var db = require("../models");

module.exports = function(app) {

	app.get("/signup", function(req, res) {
    	res.render('signup', {})
    });

}


