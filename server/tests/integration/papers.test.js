const request = require("supertest");
const { Paper, User } = require("../../models");

let server;

describe("/api/papers", () => {
	beforeEach(() => (server = require("../../startup")));
	afterEach(async () => {
		return await Paper.destroy({
			where: {},
			truncate: true,
		});
	});

	describe("GET /", () => {
		it("should return all papers", async () => {
			await Paper.bulkCreate([
				{
					name: "a",
					homepage: "a",
					url_to_scrape: "a",
				},
				{
					name: "b",
					homepage: "b",
					url_to_scrape: "b",
				},
			]);
			const res = await request(server).get("/api/papers");
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some((p) => p.name === "a"));
			expect(res.body.some((p) => p.name === "b"));
		});
	});

	describe("GET /:id", () => {
		it("should return a paper if valid id is passed", async () => {
			const paper = await Paper.create({
				name: "a",
				homepage: "a",
				url_to_scrape: "a",
			});
			const res = await request(server).get("/api/papers/" + paper._id);
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty("name", paper.name);
		});

		it("should return 404 if invalid id is passed", async () => {
			const res = await request(server).get("/api/papers/1");

			expect(res.status).toBe(404);
		});
	});

	describe("POST /", () => {
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

		it("should return a 400 if paper name is less than 5", async () => {
			name = "1234";
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper name is more than 255", async () => {
			name = new Array(300).join("a");
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper homepage is less than 10", async () => {
			homepage = "123";
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper homepage is more than 255", async () => {
			homepage = new Array(300).join("a");
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper url_to_scrape is less than 10", async () => {
			url_to_scrape = "123";
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper url_to_scrape is more than 255", async () => {
			url_to_scrape = new Array(300).join("a");
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should save the paper if it is valid", async () => {
			await exec();

			const paper = await Paper.findOne({
				where: {
					name: new Array(12).join("a"),
				},
			});
			expect(paper).not.toBeNull();
		});

		it("should return the paper if it is valid", async () => {
			const res = await exec();

			expect(res.body).toHaveProperty("_id");
			expect(res.body).toHaveProperty("name", new Array(12).join("a"));
			expect(res.body).toHaveProperty("homepage", new Array(12).join("a"));
			expect(res.body).toHaveProperty("url_to_scrape", new Array(12).join("a"));
		});
	});

	describe("PUT /:id", () => {
		let token, newName, newHomepage, newUrlToScrape, createdPaper, _id;

		const exec = async () => {
			return await request(server)
				.put("/api/papers/" + id)
				.set("x-auth-token", token)
				.send({
					name: newName,
					homepage: newHomepage,
					url_to_scrape: newUrlToScrape,
				});
		};

		beforeEach(async () => {
			[newName, newHomepage, newUrlToScrape] = Array(3).fill(
				Array(20).join("a")
			);
			createdPaper = await Paper.create({
				name: newName,
				homepage: newHomepage,
				url_to_scrape: newUrlToScrape,
			});

			user = { _id: "a", is_admin: true };
			token = User.generateAuthToken(user);
			id = createdPaper._id;
		});

		it("should return 404 if id is invalid", async () => {
			id = 1;

			const res = await exec();

			expect(res.status).toBe(404);
		});

		it("should return 404 if paper with the given id was not found", async () => {
			id = "bdsfhj";

			const res = await exec();

			expect(res.status).toBe(404);
		});

		it("should return a 400 if paper name is less than 5", async () => {
			newName = "1234";
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper name is more than 255", async () => {
			newName = new Array(300).join("a");
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper homepage is less than 10", async () => {
			newHomepage = "123";
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper homepage is more than 255", async () => {
			newHomepage = new Array(300).join("a");
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper url_to_scrape is less than 10", async () => {
			newUrlToScrape = "123";
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it("should return a 400 if paper url_to_scrape is more than 255", async () => {
			newUrlToScrape = new Array(300).join("a");
			const res = await exec();

			expect(res.status).toBe(400);
		});
	});
});
