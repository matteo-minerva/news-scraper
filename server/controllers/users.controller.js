// const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../models/");

const UserController = {
	create: async (req, res) => {
		const { error } = User.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const userExists = await User.findOne({
			where: {
				email: {
					[Op.eq]: req.body.email,
				},
			},
		});
		if (userExists) return res.status(400).send("User already registered.");

		let user = _.pick(req.body, ["_id", "email", "password", "age", "gender"]);
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		const createdUser = await User.create(user);

		const token = User.generateAuthToken(createdUser);
		res
			.header("x-auth-token", token)
			.header("access-control-expose-headers", "x-auth-token")
			.send(_.pick(createdUser, ["_id", "email", "signup", "age", "gender"]));
	},

	getCurrentUser: async (req, res) => {
		const user = await User.findOne({
			where: {
				_id: {
					[Op.eq]: req.user._id,
				},
			},
			attributes: { exclude: ["password"] },
			raw: true,
		});
		res.send(user);
	},
};

module.exports = UserController;
