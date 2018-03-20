var express = require("express");
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

var db = require("./models");

//------ UNCOMMENT OUT VARIABLE TO POPULATE DATABASE ----------------------
// var populate = require("./db/seeds.js")

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// local requirements
require("./routes/api_routes")(app);
require("./routes/html_routes")(app);
require("./controllers/login-controller")(app);


// additional libraries
// var router = require("./controllers/login-controller.js");
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		// ------UNCOMMENT OUT FUNCTION TO POPULATE DATABASE -----------------------
  		// populate();
		console.log("App listening on PORT: " + PORT);
	});
});
