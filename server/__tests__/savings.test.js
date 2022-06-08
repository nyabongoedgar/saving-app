const dotenv = require("dotenv");
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const {cleanUsersModel} = require("../test-utilities/cleanup");

dotenv.config();

describe("test savings api", () => {
    beforeAll(() => {
      addUrl();
    });

  afterAll(async () => {
    await cleanUsersModel();
    mongoose.connection.close();
  });

  it("creates a saving", async () => {
      const response =  await request(app).post("/api/savings").send({
        email: "test@gmail.com",
        password: "password",
      });
  })
});
