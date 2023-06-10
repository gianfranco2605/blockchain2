require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.20',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/hBSYAzcXKDTTy8oc4s4m24jFKAp2mZAK',
      accounts: ['5f84d016e31ddf2bbd3930fb785e0f5d4107b824c24ab064c33438897c3a0c6a'],
    },
  },
};