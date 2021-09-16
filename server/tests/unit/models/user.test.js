const { User } = require("../../../models");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("user.generateAuthToken", () => {
	it("should return a valid JWT", () => {
		const user = { _id: 1, is_admin: true };
		const token = User.generateAuthToken(user);
		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

		expect(decoded).toMatchObject(user);
	});
});
