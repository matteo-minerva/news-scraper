const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/");
const { Op } = require("sequelize");

const AuthController = {
	login: async (req, res) => {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = JSON.parse(
			JSON.stringify(
				await User.findOne({
					where: {
						email: {
							[Op.eq]: req.body.email,
						},
					},
					raw: true,
				})
			)
		);
		if (!user) return res.status(400).send("Invalid email or password.");

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(400).send("Invalid email or password.");

		const token = User.generateAuthToken(user);
		res.send(token);
	},
};

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(255).required(),
	});

	return schema.validate(req);
}

module.exports = AuthController;
