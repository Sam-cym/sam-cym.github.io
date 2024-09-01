const HealthRecords = artifacts.require("HealthRecords");

module.exports = async function (deployer) {
    await deployer.deploy(HealthRecords);
    const instance = await HealthRecords.deployed();
    console.log("HealthRecords deployed at address:", instance.address);
};
