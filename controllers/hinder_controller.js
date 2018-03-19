//Require express
var express = require("express");

var router = express.Router();

// Import the model (user.js) to use its database functions.

var db = require("./models");
// var userName = require("../models/user.js");
// var group = require("../models/group.js");
// var groupCat = require("../models/group_category.js");



//POST route to add user/create group
router.post("/api/signup", function(req, res) {
  db.user.create({
    user_name: req.body.user_name,
    password: req.body.password,
    photo: req.body.photo,
    phone_number: req.body.phone_number,
    phone_carrier: req.body.phone_carrier,
    // group_id:
  }).then(function(result) {
    res.json({user_name: result.insertUser_name})
  })

  db.group.create({
    group_name: req.body.group_name,
    bio: req.body.bio,
    photo: req.body.photo
  }).then(function(result) {
    res.json(result)
  })


// Are we going to be letting them create their own group categories?
  db.group_category.create({
    category_name: req.body.category_name,
    // bio:
  }).then(function(result) {
    res.json(result)
  })

});



// Export routes for server.js to use.
module.exports = router;