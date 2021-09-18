const cron = require("node-cron");
const { Paper } = require("../models");
const getBrowser = require("../helpers/browser");
const pageScraper = require("../helpers/pageScraper");

module.exports = cron.schedule("*/15 * * * *", async () => {
	const PAPERS = await Paper.findAll({
		attributes: ["url_to_scrape"],
	});
	return await scrapePapers(PAPERS);
});

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
