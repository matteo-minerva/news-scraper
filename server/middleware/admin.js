module.exports = function (req, res, next) {
	if (!config.get("requiresAuth")) return next();

	if (!req.user.is_admin) return res.status(403).send("Access denied");

	next();
};
