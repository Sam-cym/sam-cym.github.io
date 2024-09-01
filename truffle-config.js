const Web3 = require('web3');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    sepolia: {
      provider: () => new Web3.providers.HttpProvider('https://sepolia.getblock.io/eaeaec2a4cd54934a7d9f4e1d0aad4c7'),
      network_id: 11155111, // Sepolia network ID
      gas: 4465030,
      gasPrice: 10000000000, // 10 gwei
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    }
  }
};
