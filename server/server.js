const app = require("./startup");

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
