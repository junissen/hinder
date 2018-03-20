module.exports = function(sequelize, DataTypes) {
	var hinder = sequelize.define("hinder", {
		hinder_complete: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		thumbs_up: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		thumbs_down: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}

	},
		{underscored: true}
	);

	hinder.associate = function(models) {
		hinder.belongsTo(models.hinder_category, {
			as: 'category'
		});

		hinder.belongsTo(models.group, {
			as: 'group'
		});

		hinder.belongsTo(models.user, {
			as: 'pranker'
		});

		hinder.belongsTo(models.user, {
			as: 'target'
		});

	};


	return hinder;

}