const _ = require("lodash");
const moment = require("moment");
moment.locale("it");
const getBrowser = require("../helpers/browser");
const pageScraper = require("../helpers/pageScraper");
const { News, Paper, Sequelize } = require("../models/");

const NewsController = {
	read: async (req, res) => {
		const news = await News.findAll({
			attributes: ["_id", "url", "heading", "img_src", "date"],
			include: [
				{
					model: Paper,
					as: "paper",
					required: true,
					attributes: ["_id", "name", "homepage"],
				},
			],
			order: [["date", "DESC"]],
		});
		res.send(news);
	},

	findById: async (req, res) => {
		const news = await News.findOne({
			where: { _id: req.params.id },
			include: [
				{
					model: Paper,
					as: "paper",
					required: true,
					attributes: ["_id", "name", "homepage"],
				},
			],
		});

		if (!news)
			return res.status(404).send("The news with the given ID was not found.");

		res.send(news);
	},

	create: async (req, res) => {
		let PAPERS = await Paper.findAll({
			attributes: ["url_to_scrape"],
		});

		return await scrapePapers(PAPERS);
	},
};

async function scrapePapers(PAPERS) {
	let news = [];
	for (let url of PAPERS) {
		const browser = await getBrowser();
		const posts = await pageScraper(browser, url.get("url_to_scrape"));
		if (posts) news = [...news, ...posts];
		else continue;
	}
	return news;
}

module.exports = NewsController;
