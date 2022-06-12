const savingsModel = require('../models/SavingsModel');
const UserModel = require('../models/UserModel');

const cleanSavingsModel = async () => {
  await savingsModel.deleteMany({});
};

const cleanUsersModel = async () => {
  await UserModel.deleteMany({});
};

module.exports = {
  cleanSavingsModel,
  cleanUsersModel,
};
