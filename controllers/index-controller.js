// Require hinder_DB
var db = require("../models");

module.exports = function(app) {
//GET request for all hinders by group ID

	app.get('/home/:id', function(req, res) {

		var userId = req.params.id

		var indexObject = {};

		db.user.findAll({
			where: {
				id: userId
			},
			include: [{
				model: db.group,
				as: 'group',
				required: true
			}]
		}).then(function(result) {

			console.log(result)

			indexObject["userInfo"] = result;

			var groupID = result[0].dataValues.group_id;

			
			db.hinder.findAll({
				where: {
					group_id: groupID
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

				indexObject["pranks"] = result;

				res.json(indexObject)
				// res.render('index', indexObject)
			})
		});

	});

// 	db.hinder.findAll({
// 		where: {
// 			group_id: groupId
// 		},
// 		include: [{
// 			model: db.hinder_category,
// 			as: 'category',
// 			required: true
// 		},
// 		{
// 			model: db.user,
// 			as: 'pranker',
// 			required: true
// 		},
// 		{
// 			model: db.user,
// 			as: 'target',
// 			required: true
// 		}
// 		]
// 		// order: {
// 		// 	['created_at', 'DESC']
// 		// }
// 	})
// 		.then(function(pranks) {

// 			// Send pranks object to handlebars
// 			res.render('index', {
// 				pranks: pranks
// 			});
			
// 		});
// });

}
