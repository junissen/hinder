module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define("user", {
		user_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		photo: {
			type: DataTypes.STRING,
			defaultValue: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ0MzIxMzUwMV5BMl5BanBnXkFtZTcwMjE1NjM1Mg@@._V1_UY317_CR4,0,214,317_AL_.jpg'
		},
		phone_number: {
			type: DataTypes.STRING,
			defaultValue: '8765309'
		},
		phone_carrier: {
			type: DataTypes.STRING,
			defaultValue: 'Sprint'
		}
	},
		{underscored: true}
	);

	user.associate = function(models) {
		user.belongsTo(models.group, {
			as: 'group'
		})
	};

	return user;

}