const winston = require("winston");
require("express-async-errors");

module.exports = () => {
	process.on("uncaughtException", (ex) => {
		winston.error({
			message: ex.message,
			timestamp: Date.now(),
		});
		process.exit(1);
	});

	process.on("unhandledRejection", (ex) => {
		winston.error({
			message: ex.message,
			timestamp: Date.now(),
		});
		process.exit(1);
	});

	winston.add(
		new winston.transports.File({
			filename: "logfile.log",
			format: winston.format.combine(
				winston.format.timestamp({
					format: "YYYY-MM-DD HH:mm:ss",
				}),
				winston.format.printf(
					(info) => `[${info.timestamp}] ${info.level}: ${info.message}`
				)
			),
		})
	);
};
