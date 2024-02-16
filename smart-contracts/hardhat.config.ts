import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades';

require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;


if (!privateKey || !rpcUrl) {
  throw new Error('Please set your PRIVATE_KEY and RPC_URL in a .env file');
}
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    'optimism-sepolia': {
      url: rpcUrl,
      accounts: [privateKey],
      chainId: 11155420,
    }
  },
};

export default config;
