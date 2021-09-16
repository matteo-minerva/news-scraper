"use strict";
module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable("users", {
			_id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			signup: {
				type: DataTypes.DATE,
				defaultValue: Date.now,
				allowNull: false,
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			gender: {
				type: DataTypes.ENUM("M", "F"),
				allowNull: true,
			},
			is_admin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("users");
	},
};
