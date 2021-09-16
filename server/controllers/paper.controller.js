const _ = require("lodash");
const { Paper } = require("../models/");

const PaperController = {
	read: async (req, res) => {
		const papers = await Paper.findAll();
		res.send(papers);
	},

	create: async (req, res) => {
		const { error } = Paper.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const paper = await Paper.create(
			_.pick(req.body, ["name", "homepage", "url_to_scrape"])
		);
		res.send(paper);
	},

	update: async (req, res) => {
		const { error } = Paper.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const paper = await Paper.findOne({
			where: { _id: req.params.id },
		});

		if (!paper)
			return res.status(404).send("The paper with the given ID was not found");

		await Paper.update(
			_.pick(req.body, ["name", "homepage", "url_to_scrape"]),
			{ where: { _id: req.params.id } }
		);
		return res.send(req.body);
	},

	delete: async (req, res) => {
		const paper = await Paper.findOne({
			where: { _id: req.params.id },
		});
		const deleted = await Paper.destroy({ where: { _id: req.params.id } });

		if (!deleted)
			return res.status(404).send("The paper with the given ID was not found.");

		return res.send(paper);
	},

	findById: async (req, res) => {
		const paper = await Paper.findOne({ where: { _id: req.params.id } });

		if (!paper)
			return res.status(404).send("The paper with the given ID was not found.");

		res.send(paper);
	},
};

module.exports = PaperController;
