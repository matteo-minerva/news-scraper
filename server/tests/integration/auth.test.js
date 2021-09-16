const request = require("supertest");
const { Paper, User } = require("../../models");

let server;

describe("auth middleware", () => {
	beforeEach(() => (server = require("../../startup")));
	afterEach(async () => {
		return await Paper.destroy({
			where: {},
			truncate: true,
		});
	});

	let token;
	let user;
	let name;
	let homepage;
	let url_to_scrape;

	const exec = async () => {
		return await request(server)
			.post("/api/papers")
			.set("x-auth-token", token)
			.send({ name, homepage, url_to_scrape });
	};

	beforeEach(() => {
		user = { _id: "a", is_admin: true };
		token = User.generateAuthToken(user);
		[name, homepage, url_to_scrape] = Array(3).fill(Array(12).join("a"));
	});

	it("should return 401 if no token is provided", async () => {
		token = "";
		const res = await exec();
		expect(res.status).toBe(401);
	});

	it("should return 403 if client is logged in but it is not an admin", async () => {
		user.is_admin = false;
		token = User.generateAuthToken(user);
		const res = await exec();

		expect(res.status).toBe(403);
	});

	it("should return 400 if token is invalid", async () => {
		token = "a";
		const res = await exec();

		expect(res.status).toBe(400);
	});

	it("should return 200 if token is valid", async () => {
		const res = await exec();

		expect(res.status).toBe(200);
	});
});
