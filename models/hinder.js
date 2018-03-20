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
		})
	};

	hinder.associate = function(models) {
		hinder.belongsTo(models.group, {
			as: 'group'
		})
	};

	hinder.associate = function(models) {
		hinder.belongsTo(models.user, {
			as: 'pranker'
		})
	};

	hinder.associate = function(models) {
		hinder.belongsTo(models.user, {
			as: 'target'
		})
	};


	return hinder;

}