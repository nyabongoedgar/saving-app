const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const {
  generateHashedPassword,
  generateAccessToken,
} = require("../utils/auth");

const createUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User with this email is already registered!",
      });
    }
    // hash password
    const hashedPassword = generateHashedPassword(password);
    const result = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ user: result, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "valid user id is required!",
      });
    }
    // compare password
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = generateAccessToken({ ...user });
      return res.status(200).json({ token });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  authenticateUser,
};
