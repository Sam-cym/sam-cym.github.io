const HealthDataManagement = artifacts.require("HealthDataManagement");

module.exports = async function (deployer) {
    await deployer.deploy(HealthDataManagement);
    const instance = await HealthDataManagement.deployed();
    console.log("HealthDataManagement deployed at address:", instance.address);
};
