const { User } = require("../../../models");
const auth = require("../../../middleware/auth");

describe("auth middleware", () => {
	it("should populare req.user with payload of a valid JWT", () => {
		const user = { _id: "a", is_admin: true };
		const token = User.generateAuthToken(user);
		const req = {
			header: jest.fn().mockReturnValue(token),
		};
		const res = {};
		const next = jest.fn();

		auth(req, res, next);

		expect(req.user).toMatchObject(user);
	});
});
