const express = require("express");
const winston = require("winston");
const { sequelize } = require("./models");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/scheduledJob")();
require("./startup/prod")(app);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, async () => {
	winston.info({
		message: `Server is Listening on port ${PORT}`,
		timestamp: Date.now(),
	});
	await sequelize.authenticate();
	winston.info({
		message: `Connected to ${config.get("dialect")}: ${config.get("database")}`,
		timestamp: Date.now(),
	});
});
module.exports = server;
