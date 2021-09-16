"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Paper extends Model {
		static associate({ News }) {
			this.hasMany(News, { foreignKey: "_id" });
		}

		static validate(paper) {
			const schema = Joi.object({
				name: Joi.string().min(5).max(255).required(),
				homepage: Joi.string().min(10).max(255).required(),
				url_to_scrape: Joi.string().min(10).max(255).required(),
			});

			return schema.validate(paper);
		}
	}
	Paper.init(
		{
			_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
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
		},
		{
			sequelize,
			modelName: "Paper",
			tableName: "papers",
			timestamps: false,
		}
	);
	return Paper;
};
