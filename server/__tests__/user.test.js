// const dotenv = require("dotenv");
// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");
// const {cleanUsersModel} = require("../test-utilities/cleanup");

// dotenv.config();

// describe("test api", () => {

//   afterAll(async () => {
//     await cleanUsersModel();
//     mongoose.connection.close();
//   });

//   it("creates a new user", async () => {
//     const response = await request(app).post("/api/users/register").send({
//       email: "test@gmail.com",
//       password: "password",
//       username: "test",
//     });
//     expect(response.statusCode).toBe(201);
//     expect(response.body.message).toBe("User created successfully");
//   });

//   it("logins in a new user", async () => {
//     const response = await request(app).post("/api/users/authenticate").send({
//       email: "test@gmail.com",
//       password: "password",
//     });
//     expect(response.statusCode).toBe(200);
//     expect(response.body.token).toBeTruthy();
//   });
// });
