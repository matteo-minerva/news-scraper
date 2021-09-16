const express = require("express");
const news = require("../routes/news");
const papers = require("../routes/papers");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const cors = require("cors");

module.exports = (app) => {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use("/api/news", news);
	app.use("/api/papers", papers);
	app.use("/api/users", users);
	app.use("/api/auth", auth);
	app.use(error);
};
