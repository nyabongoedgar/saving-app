import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import models from "../../database/models";
import smtpTransport from "../helpers/mail";
import { token } from "morgan";


// username is in the form { username: "username" }
export function generateAccessToken(payload) {
  // expires after half and hour (3600 seconds = 60 minutes)
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "172800s", //2 days
  });
}

export function generateHashedPassword(password) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

