// Require hinder_DB
var db = require("../models");

module.exports = function(app) {
//GET request for all hinders by group ID

	app.get('/home/:id', function(req, res) {

		var userId = req.params.id

		var indexObject = {};

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

			var user = {
				'id': result[0].dataValues.id, 
				'name': result[0].dataValues.name, 
				'photo': result[0].dataValues.photo, 
				'group_id': result[0].dataValues.group_id}

			indexObject["userInfo"] = user

			var group = result[0].dataValues.group.dataValues

			indexObject["groupInfo"] = group

			db.user.findAll({
				attributes: ['id', ['user_name', 'name'], 'photo'],
				where: {
					group_id: indexObject.userInfo.group_id,
					id: {
						[db.Sequelize.Op.ne]: userId
					}
				}	
			}).then(function(result) {

				indexObject["group_members"] = []

				for (var i = 0; i < result.length; i ++ ){

					indexObject.group_members.push(result[i].dataValues)
				}

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
					// order: {
					// 	['created_at', 'DESC']
					// }
				}).then(function(result) {

					var pranks = [];

					for (var i = 0; i < result.length; i ++ ) {
						var object = {
							'id': result[i].dataValues.id,
							'complete': result[i].dataValues.hinder_complete,
							'thumbs_up': result[i].dataValues.thumbs_up,
							'thumbs_down': result[i].dataValues.thumbs_down,
							'hinder_info': {
								'id': result[i].dataValues.category.id,
								'hinder_type': result[i].dataValues.category.hinder_type,
								'asset': result[i].dataValues.category.asset,
								'created_at': result[i].dataValues.category.created_at
							}
						}

						pranks.push(object)
					}

					indexObject["pranks"] = pranks;

					res.render('index', indexObject)
				})

			});

		});

	});

}