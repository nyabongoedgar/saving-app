const express = require("express");
const { validate } = require("express-validation");
const router = express.Router();

const userController = require("../controllers/UserController");
const {
  userAuthenticationValidation,
  userRegistrationValidation,
} = require("../middleware/UserMiddleware");

router.post(
  "/register",
  validate(userRegistrationValidation, {}, {}),
  userController.createUser
);
router.put(
  "/authenticate",
  validate(userAuthenticationValidation, {}, {}),
  userController.authenticateUser
);

module.exports = router;
