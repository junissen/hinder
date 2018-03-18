//Require express
var express = require("express");

var router = express.Router();

// Import the model (user.js) to use its database functions.
var userName = require("../models/user.js");
var group = require("../models/group.js");
var groupCat = require("../models/group_category.js");

//GET route to get burgers from database
// router.get("/", function(req, res) {
//   burger.all(function(data) {
//     var hbsObject = {
//       burgers: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

//POST route to add user/create group
router.post("/api/signup", function(req, res) {
  userName.create([
    "user_name", "password", "photo", "phone_number", "phone_carrier"
  ], [
    req.body.user_name, req.body.password, req.body.photo, req.body.phone_number, req.body.phone_carrier 
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ user_name: result.insertUser_name });
  });
  group.create([
    "group_name", "bio", "photo"
    ], [
      req.body.group_name, req.body.bio, req.body.photo
    ]
  );
  groupCat.create([
    "category_name"
    ], [
      req.body.category_name
    ]
  );
});



// Export routes for server.js to use.
module.exports = router;