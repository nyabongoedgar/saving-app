const savingsModel = require("../models/SavingsModel");
const UserModel = require("../models/UserModel");

const cleanSavingsModel = async () => {
  try {
    await savingsModel.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

const cleanUsersModel = async () => {
  try {
    await UserModel.deleteMany({});
  } catch (error) {
    console.lo(error);
  }
};

module.exports = {
  cleanSavingsModel,
  cleanUsersModel,
};
