require("@nomicfoundation/hardhat-toolbox");

const SEPOLIA_PRIVATE_KEY = "9b039a39fb104df2c98d3c1a309057c01a33117676aca1e8f8196232c23e7ff2";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: "1H3BJ8GP2U59IH7Y1WC3NB2E1ATV12WS5S",
  },
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/Np-YgTYyIu0PpYN5bNrXpc0TJaQ3gFpX',
      accounts: [ SEPOLIA_PRIVATE_KEY ]
    }
  }
};
