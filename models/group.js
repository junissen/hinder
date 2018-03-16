module.exports = function(sequelize, DataTypes) {
	var group = sequelize.define("group", {
		group_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bio: {
			type: DataTypes.STRING,
		},
		photo: {
			type: DataTypes.STRING,
			defaultValue: 'https://i.pinimg.com/originals/6e/99/37/6e9937e4d0c62d38b27d208995dbbf57.jpg'
		}
	},
		{underscored: true}
	);

	group.associate = function(models) {
		group.belongsTo(models.group_category, {
			as: 'category'
		})
	};

	return group;

}