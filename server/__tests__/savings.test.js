const dotenv = require("dotenv");
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const {
  cleanUsersModel,
  cleanSavingsModel,
} = require("../test-utilities/cleanup");
const { registerUser, login } = require("../test-utilities/auth");

dotenv.config();

describe("test savings api", () => {
  var auth = {};
  beforeAll(async () => {
    await registerUser();
    await login(auth);
  });

  afterAll(async () => {
    await cleanUsersModel();
    await cleanSavingsModel();
    mongoose.connection.close();
  });

  it("creates a saving", async () => {
    const response = await request(app)
      .post("/api/savings")
      .set("Authorization", `Bearer ${auth?.token}`)
      .send({
        amount: 1000,
        date: new Date(),
        description: "today's saving",
      });

      console.log(response, 'response')
    //   expect(response.statusCode).toBe(201);
    //   expect(response.body.saving).toHaveProperty("amount")
  });
});
