const app = require("../app");
const request = require("supertest");

const registerUser = async () => {
  try {
    await request(app).post("/api/users/register").send({
      email: "test@gmail.com",
      password: "test",
      username: "test",
    });
  } catch (error) {
    throw error;
  }
};

const login = async (auth) => {
  try {
    const response = await request(app).post("/api/users/authenticate").send({
      email: "test@gmail.com",
      password: "test",
    });
    auth["token"] = response.body.token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  login,
};
