require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");
require("solhint")

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY  || "key";
const COINMARKETCAP=process.env.COINMARKETCAP || "key";
module.exports = {
  //solidity: "0.8.18",
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [],
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations:6,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile:"gas-report.txt",
    noColors:true,
    currency:"USD",
    coinmarketcap:COINMARKETCAP,
    token:"MATIC"
  }
};
