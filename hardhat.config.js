require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const WOWEN_RPC_URL = process.env.WOWEN_RPC_URL;
const WOWEN_PRIV_KEY = process.env.WOWEN_PRIV_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    wowen: {
      url: WOWEN_RPC_URL,
      accounts: [WOWEN_PRIV_KEY],
      chainId: 981,
      blockGasLimit: 60000000,
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2 ** 32 - 1,
      },
    },
  },
};
