const imgLoading = require("../helpers/lazyloading");
const moment = require("moment");
moment.locale("it");
// @ts-ignore
const { News, Paper } = require("../models/");

module.exports = async (browser, url) => {
	const page = await browser.newPage();
	await page.goto(url);
	console.log(`Navigating to ${url}...`);
	await imgLoading(page);
	await page.waitForSelector("body");

	const posts = await page.evaluate(() => {
		let posts = document.body.querySelectorAll("article.type-post");
		let postItems = [];
		/* ========================== getting data from the DOM ========================== */
		posts.forEach(async (item) => {
			try {
				const heading = item.querySelector("h2").textContent;
				if (heading != "") {
					const url = item.querySelector("a").href;
					const img_src = item.querySelector("img").src;
					const date = item.querySelector("span").textContent.toLowerCase();

					const newPost = {
						heading,
						date,
						url,
						img_src,
					};

					postItems.push(newPost);
				}
			} catch (e) {
				console.error(e);
			}
		});
		return postItems;
	});
	await page.close();

	/* =================== remap date to the right format ================== */
	const PAPERS = await Paper.findAll({ attributes: ["_id", "homepage"] });
	const mappedPosts = posts.map((post) => {
		const { date, url } = post;
		const formattedDate = moment(date, "LL").format("YYYY-MM-DD");

		const paperId = (() => {
			for (let PAPER of PAPERS)
				if (url.includes(PAPER.get("homepage"))) return PAPER.get("_id");
		})();

		return {
			...post,
			date: formattedDate,
			paper_id: paperId,
		};
	});
	const returnPosts = await optimizeInserting(mappedPosts);
	if (returnPosts) return mappedPosts;
	else return false;
};

async function optimizeInserting(news) {
	let needToStop = false;
	for (let singleNews of news) {
		if (needToStop === false) {
			await News.create(singleNews)
				.then(() => console.log("Data inserted"))
				.catch((err) => {
					console.log("Duplicated data: it won't be inserted into DB");
					return (needToStop = true);
				});
		}
	}
	return needToStop;
}
