import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades';

require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const apiKey = process.env.API_KEY;


const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    optimism: {
      url: 'https://kovan.optimism.io',
      accounts: [],
      gasPrice: 15000000,
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/' + apiKey,
      accounts: [],
    }
  },
};

export default config;
