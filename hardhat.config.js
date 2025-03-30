require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.26",
  paths: {
    artifacts: "./",
  },
  networks: {
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital/`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      opencampus: "4TK7PHA1KAZGBA87WDI5WYKSIGSJ561G9N",
    },
    customChains: [
      {
        network: "opencampus",
        chainId: 656476,
        urls: {
          apiURL: "https://opencampus-codex.blockscout.com/api",
          browserURL: "https://opencampus-codex.blockscout.com",
        },
      },
    ],
  },
};