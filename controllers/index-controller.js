// Require hinder_DB
var db = require("../models");

module.exports = function(app) {
//GET request for all hinders by group ID

	app.get('/home/:id', function(req, res) {

		var groupId = req.params.id;

		db.hinder.findAll({
			where: {
				group_id: groupId
			},
			include: [{
				model: db.hinder_category,
				as: 'category',
				required: true
			},
			{
				model: db.user,
				as: 'pranker',
				required: true
			},
			{
				model: db.user,
				as: 'target',
				required: true
			}
			]
			// order: {
			// 	['created_at', 'DESC']
			// }
		})
			.then(function(pranks) {

				console.log(pranks[0].category.dataValues);
				// res.json(pranks);
				res.render('index', {
					pranks: pranks
				});
				
			});
	});
}
