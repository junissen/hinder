module.exports = function(sequelize, DataTypes) {
	var group_category = sequelize.define("group_category", {
		category_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bio: {
			type: DataTypes.STRING,
		},
	},
		{underscored: true}
	);

	return group_category;

}