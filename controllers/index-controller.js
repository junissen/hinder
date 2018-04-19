// Require sequelize models
var db = require("../models");

module.exports = function(app) {

	// GET request upon main page load to populate object for use with handlebars
	app.get('/home/:id', function(req, res) {

		// Grabs current user id from URL
		var userId = req.params.id

		// Creates empty object to be populated
		var indexObject = {};

		// Finds information on user and group from user and group models
		db.user.findAll({
			attributes: ['id', ['user_name', 'name'], 'photo', 'group_id'],
			where: {
				id: userId
			},
			include: [{
				attributes: [['id', 'group_id'], 'group_name', 'bio', 'photo'],
				model: db.group,
				as: 'group',
				required: true
			}]
		}).then(function(result) {

			// Create new user object based off results
			var user = {
				'id': result[0].dataValues.id, 
				'name': result[0].dataValues.name, 
				'photo': result[0].dataValues.photo, 
				'group_id': result[0].dataValues.group_id}

			// Add new user object to indexObject
			indexObject["userInfo"] = user

			// Create new group object based off results
			var group = result[0].dataValues.group.dataValues

			// Add new group object to indexObject
			indexObject["groupInfo"] = group

			// Find all users with same group id from user model
			db.user.findAll({
				attributes: ['id', ['user_name', 'name'], 'photo'],
				where: {
					group_id: indexObject.userInfo.group_id,
				}	
			}).then(function(result) {

				// Create empty group_members object within indexObject
				indexObject["group_members"] = [];

				// Create empty group object to be populated
				var groupObject = {}

				// Create new object for each returned group member and adds to indexObject. 
				// 'Me' variable is true if the returned user is the same as the current user, and false if not
				for (var i = 0; i < result.length; i ++ ){

					if (result[i].dataValues.id == indexObject.userInfo.id) {
		
						groupObject = {
							'id': result[i].dataValues.id,
							'name': result[i].dataValues.name,
							'photo': result[i].dataValues.photo,
							'userID': indexObject.userInfo.id,
							'me': true
						};

						indexObject.group_members.push(groupObject)
					}
					
					else {
						groupObject = {
							'id': result[i].dataValues.id,
							'name': result[i].dataValues.name,
							'photo': result[i].dataValues.photo,
							'userID': indexObject.userInfo.id,
							'me': false
						};

						indexObject.group_members.push(groupObject)

					}
				}
				
				// Find all hinders for that group id 
				db.hinder.findAll({
					where: {
						group_id: indexObject.userInfo.group_id
					},
					include: [{
						model: db.hinder_category,
						as: "category",
						required: true
					},
					{
						model: db.user,
						as: "pranker",
						required: true
					},
					{
						model: db.user,
						as: "target",
						required: true
					}
					]
				}).then(function(result) {

					// Create empty prank and pendingPranks arrays
					var pranks = [];
					var pendingPranks = [];

					// For each prank returned, create and populate a hinder_typeObject and an object
					for (var i = 0; i < result.length; i ++ ) {
						var hinder_typeObject = {
						"sound": false,
						"photo": false,
						"gif": false,
						"message": false,
						}

						if (result[i].dataValues.category.hinder_type === "sound") {
							hinder_typeObject.sound = true
						}

						if (result[i].dataValues.category.hinder_type === "photo") {
							hinder_typeObject.photo = true
						}

						if (result[i].dataValues.category.hinder_type === "gif") {
							hinder_typeObject.gif = true
						}

						if (result[i].dataValues.category.hinder_type === "message") {
							hinder_typeObject.message= true
						}

						var object = {
							'id': result[i].dataValues.id,
							'complete': result[i].dataValues.hinder_complete,
							'thumbs_up': result[i].dataValues.thumbs_up,
							'thumbs_down': result[i].dataValues.thumbs_down,
							'pranker': {
								'id': result[i].dataValues.pranker.id,
								'name': result[i].dataValues.pranker.user_name,
								'photo': result[i].dataValues.pranker.photo
							},
							'target': {
								'id': result[i].dataValues.target.id,
								'name': result[i].dataValues.target.user_name,
								'photo': result[i].dataValues.target.photo
							},
							'hinder_info': {
								'id': result[i].dataValues.category.id,
								'hinder_type': result[i].dataValues.category.hinder_type,
								'asset': result[i].dataValues.category.asset,
								'created_at': result[i].dataValues.category.created_at,
								'hinderObject': hinder_typeObject
							}
						}

						// If the target of the prank is the current user and the prank is not yet complete,
						// Add prank to pendingPranks array
						if ((object.target.id == userId) && (object.complete == false)) {
							pendingPranks.push(object)
						}

						// Otherwise add to the pranks array
						pranks.push(object)

					}

					// Add pranks and pendingPranks arrays to indexObject
					indexObject["pranks"] = pranks;
					indexObject["pending_pranks"] = pendingPranks;
					
					// Render index handlebars and pass in indexObject
					res.render('index', indexObject)
				})

			});

		});

	});

	app.put("/home/api/thumbsup/update", function(req, res) {
		
		db.hinder.update({
			thumbs_up: req.body.thumbsUp
		},
		{
			where: {
				id: req.body.id
			}
		}).then(function(result) {
			if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
	          return res.status(404).end();
	        } 
	        else {
	          res.status(200).end();
	        }
     	});

	});

	app.put("/home/api/thumbsdown/update", function(req, res) {
		db.hinder.update({
			thumbs_down: req.body.thumbsDown
		},
		{
			where: {
				id: req.body.id
			}
		}).then(function(result) {
			if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
	          return res.status(404).end();
	        } 
	        else {
	          res.status(200).end();
	        }
     	});

	});

	app.put("/home/api/hinder/complete/update", function(req, res) {

		db.hinder.update({
			hinder_complete: true
		},
		{
			where: {
				id: req.body.id
			}
		}).then(function(result) {
			if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
	          return res.status(404).end();
	        } 
	        else {
	          res.status(200).end();
	        }
		});
	})

}