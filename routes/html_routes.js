// var path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
    	res.render('login', {})
        // res.sendFile(path.join(__dirname, "../views/login.html"));
      });


    app.get("/signup", function(req, res) {
    	res.render('signup', {})
    // 	// res.sendFile(path.join(__dirname, "../views/signup.html"));
    });

    app.get("/home/:id", function(req, res) {

    	var groupObject = {
    		group_id: req.params.id
    	}
    	
    	res.render('index', {groupObject})
    })
};