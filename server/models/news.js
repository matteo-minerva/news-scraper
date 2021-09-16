"use strict";
const Joi = require("joi");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class News extends Model {
		static associate({ Paper }) {
			this.belongsTo(Paper, {
				foreignKey: "paper_id",
				as: "paper",
			});
		}

		static validate(news) {
			const schema = Joi.object({
				heading: Joi.string().max(255).required(),
				url: Joi.string().max(255).required(),
				date: Joi.date().required(),
				img_src: Joi.string().max(255).required(),
				paper_id: Joi.string()
					.guid({
						version: "uuidv4",
					})
					.required(),
			});

			return schema.validate(news);
		}
	}
	News.init(
		{
			_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			heading: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			img_src: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "News",
			tableName: "news",
			timestamps: false,
		}
	);

	return News;
};
