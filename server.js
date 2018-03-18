var express = require("express");
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// local requirements
require("./models/api_routes")(app);
require("./models/html_routes")(app);

// additional libraries
var router = require("./controllers/hinder_controller");
var exphbs = require("express-handlebars");

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
