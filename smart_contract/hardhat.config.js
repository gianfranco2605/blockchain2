require("@nomicfoundation/hardhat-toolbox");

const SEPOLIA_PRIVATE_KEY = "5f84d016e31ddf2bbd3930fb785e0f5d4107b824c24ab064c33438897c3a0c6a";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: "TXM8HFDMCFY33BJK6GSHBZ2ATVYP8IMW62",
  },
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/bbFfNdjpav_j1rgMeE10_pyoaAuHAnGv',
      accounts: [ SEPOLIA_PRIVATE_KEY ]
    }
  }
};
