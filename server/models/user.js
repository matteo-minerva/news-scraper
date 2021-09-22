"use strict";
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
		}

		static validate(user) {
			const schema = Joi.object({
				email: Joi.string().min(5).max(255).email().required(),
				password: Joi.string().min(8).max(255).strip().required(),
				age: Joi.number().min(14).max(150),
				gender: Joi.string().valid("M", "F"),
			});
			return schema.validate(user);
		}

		static generateAuthToken(modelInstance) {
			return jwt.sign(
				{ _id: modelInstance._id, is_admin: modelInstance.is_admin },
				config.get("jwtPrivateKey")
			);
		}
	}
	User.init(
		{
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
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
			timestamps: false,
		}
	);
	return User;
};
