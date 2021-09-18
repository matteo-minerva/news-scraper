"use strict";
module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable("news", {
			_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			heading: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			img_src: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			paper_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("news");
	},
};
