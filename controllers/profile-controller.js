// Require sequelize models
var db = require("../models");

module.exports = function(app) {

	//GET request for group member profile page
	app.get('/user:yourid/:otherid?', function(req, res) {

		// Grabs the user id from the URL
		var yourId = req.params.yourid;

		var userId; 
		var profileId;

		// If otherid exists in URL, populates both userId and profileId with that parameter
		if (req.params.otherid) {
			userId = req.params.otherid;
			profileId = req.params.otherid;
		}

		// If otherid does not exist in URL, populates userId with yourid, and profileId with otherid
		else {
			userId = req.params.yourid;
			profileId = req.params.yourid;
		}

		// Creates empty indexObject to be populated and returned
		var indexObject = {};

		// Find user with matching userId from user model
		db.user.findAll({
			attributes: ['id', ['user_name', 'name'], 'photo', 'group_id'],
			where: {
				id: userId
			},
			include: [{
				attributes: ['id', 'group_name', 'bio', 'photo', 'category_id'],
				model: db.group,
				as: 'group',
				required: true
			}]
		}).then(function(result) {

			// Creates user object and populates with returned results
			var user = {
				'id': result[0].dataValues.id, 
				'name': result[0].dataValues.name, 
				'photo': result[0].dataValues.photo, 
				'group_id': result[0].dataValues.group_id}

			// Adds user object to indexObject
			indexObject["userInfo"] = user;

			// Creates group object and populates with returned results
			var group = {
				'id': result[0].dataValues.group.id,
				'group_name': result[0].dataValues.group.group_name,
				'bio': result[0].dataValues.group.bio,
				'photo': result[0].dataValues.group.photo
			}

			var groupCategory = result[0].dataValues.group.category_id;

			console.log(groupCategory)

			// Find group category with matching id from group_category model
			db.group_category.findAll({
				where: {
					id: groupCategory
				}
			}).then(function(result) {

				// Adds category name to group object
				group['category'] = result[0].dataValues.category_name;

				// Adds group object to indexObject
				indexObject["groupInfo"] = group;

				// Finds all users with same group id from user model
				db.user.findAll({
					attributes: ['id', ['user_name', 'name'], 'photo'],
					where: {
						group_id: indexObject.userInfo.group_id,
					}	
				}).then(function(result) {

					// Creates empty array within indexObject
					indexObject["group_members"] = [];

					// Creates empty object to be populated
					var groupObject = {}

					// Loops through each returned user
					for (var i = 0; i < result.length; i ++ ){

						// If returned user matches the current user id, me is true
						if (result[i].dataValues.id == yourId) {
							groupObject = {
								'id': result[i].dataValues.id,
								'name': result[i].dataValues.name,
								'photo': result[i].dataValues.photo,
								'userID': yourId,
								'me': true
							};

							// Resulting object is added to group_members array of indexObject
							indexObject.group_members.push(groupObject)
						}
						
						else {
							// If returned user matches the current user id, me is true
							groupObject = {
								'id': result[i].dataValues.id,
								'name': result[i].dataValues.name,
								'photo': result[i].dataValues.photo,
								'userID': yourId,
								'me': false
							};

							// Resulting object is added to group_members array of indexObject
							indexObject.group_members.push(groupObject)

						}
					}

					// Find all hinders with provided group id using hinder model
					db.hinder.findAll({
						where: {
							group_id: indexObject.userInfo.group_id,
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

						// Create empty pranks array
						var pranks = [];

						// Loop through each returned prank
						for (var i = 0; i < result.length; i ++ ) {

							// Create hinder_typeObject and populate
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

							// Create object and populate
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

							// If the pranker id matches the profile id currently viewed, the pranker "user" variable is true
							if (result[i].dataValues.pranker.id == profileId) {
								object.pranker["user"] = true
							}

							// Else the pranker "user" variable is false
							else {
								object.pranker["user"] = false
							}
							
							// If the target id matches the profile id currently viewed, the target "user" variable is true
							if (result[i].dataValues.target.id == profileId) {
								object.target["user"] = true
							}

							// Else the target "user" variable is false
							else {
								object.target["user"] = false
							}

							// Push the populated object into the pranks array 
							pranks.push(object)
						}

					// Add the pranks array to the indexObject
					indexObject["pranks"] = pranks;

					// Render the profile handlebars and pass in the indexObject
					res.render("profile", indexObject)
				
					});

				});

			});
		});
	});
}




