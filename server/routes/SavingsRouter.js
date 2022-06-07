const express = require("express");
const { validate } = require("express-validation");
const router = express.Router();
const savingsController = require("../controllers/SavingsController");
const authMiddleware = require("../middleware/AuthMiddleware");
const {
  savingsValidation,
  validateSavingsDates,
} = require("../middleware/SavingsMiddleware");

router.post(
  "/",
  validate(savingsValidation, {}, {}),
  authMiddleware,
  validateSavingsDates,
  savingsController.createSaving
);

router.get("/", authMiddleware, savingsController.getSavings);

module.exports = router;
