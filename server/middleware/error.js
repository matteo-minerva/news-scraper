const winston = require("winston");

module.exports = function (err, req, res, next) {
	winston.error({
		message: err.message,
		timestamp: Date.now(),
	});
	res.status(500).send("Something failed");
};
