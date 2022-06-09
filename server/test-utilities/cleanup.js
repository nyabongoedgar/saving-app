const savingsModel = require("../models/SavingsModel");
const UserModel = require("../models/UserModel");


const cleanSavingsModel = async () => {
  try {
    await savingsModel.deleteMany({});
  } catch (error) {
    throw error;
  }
};

const cleanUsersModel = async () => {
  try {
    await UserModel.deleteMany({});
  } catch (error) {
    throw error;
  }
};

module.exports = {
  cleanSavingsModel,
  cleanUsersModel,
};
