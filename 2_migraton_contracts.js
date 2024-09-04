const HealthDataManagement = artifacts.require("HealthDataManagement");

module.exports = function (deployer) {
  deployer.deploy(HealthDataManagement);
};
