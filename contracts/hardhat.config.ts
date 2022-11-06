import "@nomicfoundation/hardhat-toolbox";
import "hardhat-dependency-compiler";

import fs from "fs";
import { HardhatUserConfig } from "hardhat/config";

import rpc from "./config/rpc.json";

const mnemonicFileName = "../mnemonic.txt";
let mnemonic = "test ".repeat(11) + "junk";
if (fs.existsSync(mnemonicFileName)) {
  mnemonic = fs.readFileSync(mnemonicFileName, "ascii").trim();
}

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      // polygon id testing requires fork environment
      forking: {
        url: rpc.polygonMumbai,
      },
    },
    polygonMumbai: {
      url: rpc.polygonMumbai,
      accounts: {
        mnemonic,
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.ETHERSCAN_API_KEY,
    }
  },
  dependencyCompiler: {
    paths: ["@appliedzkp/semaphore-contracts/base/Verifier.sol", "@worldcoin/world-id-contracts/src/Semaphore.sol"],
  },
};

export default config;
