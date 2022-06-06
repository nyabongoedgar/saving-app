const express = require("express");
const { Joi } = require("express-validation");
const router = express.Router();
const savingsController = require("../controllers/SavingsController");
const authMiddleware = require("../middleware/AuthMiddleware");
const { savingsValidation } = require("../middleware/SavingsMiddleware");

router.post(
  "/",
  validate(savingsValidation, {}, {}),
  authMiddleware,
  savingsController.createSaving
);

router.get("/", authMiddleware, savingsController.getSavings);

module.exports = router;