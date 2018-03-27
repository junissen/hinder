// Require hinder_DB
var db = require("../models");

module.exports = function(app) {

	//GET request for a users profile information
	app.get('/user:yourid/:otherid?', function(req, res) {

		var userId; 

		var yourId = req.params.yourid;

		var profileId;

		if (req.params.otherid) {
			userId = req.params.otherid;
			profileId = req.params.otherid;
		}

		else {
			userId = req.params.yourid;
			profileId = req.params.otherid;
		}

		var indexObject = {};

		db.user.findAll({
			attributes: ['id', ['user_name', 'name'], 'photo', 'group_id'],
			where: {
				id: userId
			},
			include: [{
				attributes: [['id', 'group_id'], 'group_name', 'bio', 'photo', 'category_id'],
				model: db.group,
				as: 'group',
				required: true
			}]
		}).then(function(result) {

			var user = {
				'id': result[0].dataValues.id, 
				'name': result[0].dataValues.name, 
				'photo': result[0].dataValues.photo, 
				'group_id': result[0].dataValues.group_id}

			indexObject["userInfo"] = user;

			var group = {
				'id': result[0].dataValues.group.id,
				'group_name': result[0].dataValues.group.group_name,
				'bio': result[0].dataValues.group.bio,
				'photo': result[0].dataValues.group.photo
			}

			var groupCategory = result[0].dataValues.group.category_id;

			console.log(groupCategory)

			db.group_category.findAll({
				where: {
					id: groupCategory
				}
			}).then(function(result) {

				group['category'] = result[0].dataValues.category_name;

				indexObject["groupInfo"] = group;

				indexObject["groupInfo"] = group

				db.user.findAll({
					attributes: ['id', ['user_name', 'name'], 'photo'],
					where: {
						group_id: indexObject.userInfo.group_id,
						// id: {
						// 	[db.Sequelize.Op.ne]: userId
						// }
					}	
				}).then(function(result) {

					indexObject["group_members"] = [];

					var groupObject = {}

					for (var i = 0; i < result.length; i ++ ){

						if (result[i].dataValues.id == yourId) {
							groupObject = {
								'id': result[i].dataValues.id,
								'name': result[i].dataValues.name,
								'photo': result[i].dataValues.photo,
								'userID': yourId,
								'me': true
							};

							indexObject.group_members.push(groupObject)
						}
						
						else {
							groupObject = {
								'id': result[i].dataValues.id,
								'name': result[i].dataValues.name,
								'photo': result[i].dataValues.photo,
								'userID': yourId,
								'me': false
							};

							indexObject.group_members.push(groupObject)

						}
					}

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
						// order: {
						// 	['created_at', 'DESC']
						// }
					}).then(function(result) {

						var pranks = [];


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

							if (result[i].dataValues.pranker.id == profileId) {
								object.pranker["user"] = true
							}

							else {
								object.pranker["user"] = false
							}

							if (result[i].dataValues.target.id == profileId) {
								object.target["user"] = true
							}

							else {
								object.target["user"] = false
							}

							pranks.push(object)
						}

					indexObject["pranks"] = pranks;

					res.render("profile", indexObject)
				
					});

				});

			});
		});
	});
}




