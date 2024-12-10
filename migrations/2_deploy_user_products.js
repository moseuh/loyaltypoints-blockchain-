const UserProducts = artifacts.require("UserProducts");

module.exports = function (deployer) {
  deployer.deploy(UserProducts);
};
