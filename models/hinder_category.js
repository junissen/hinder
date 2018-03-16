module.exports = function(sequelize, DataTypes) {
	var hinder_category = sequelize.define("hinder_category", {
		hinder_type: {
			type: DataTypes.STRING
		},
		asset: {
			type: DataTypes.STRING
		}
		
	},
		{underscored: true}
	);

	return hinder_category;

}