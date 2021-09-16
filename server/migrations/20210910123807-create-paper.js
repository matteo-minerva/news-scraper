"use strict";
module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable("papers", {
			_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			homepage: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url_to_scrape: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("papers");
	},
};
