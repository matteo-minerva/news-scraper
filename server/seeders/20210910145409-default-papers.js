"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.bulkInsert("papers", [
			{
				_id: uuidv4(),
				name: "il post",
				homepage: "https://www.ilpost.it/",
				url_to_scrape: "https://www.ilpost.it/mondo/",
			},
			{
				_id: uuidv4(),
				name: "Valigia Blu",
				homepage: "https://www.valigiablu.it/",
				url_to_scrape: "https://www.valigiablu.it/category/fuori-da-qui/",
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("papers", null, {});
	},
};
