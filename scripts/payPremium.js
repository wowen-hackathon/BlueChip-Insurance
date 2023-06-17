const { ethers } = require("hardhat");
const addressContract = require("./contractAddress");

async function main() {
  // Retrieve the contract instance using the contract address
  const contractAddress = addressContract;
  const Insurance = await ethers.getContractFactory("Insurance");
  const insurance = await Insurance.attach(contractAddress);

  // Call contract functions
  const payPremiumTxResponse = await insurance.payPremium({
    value: ethers.utils.parseEther("0.11"),
  });
  await payPremiumTxResponse.wait(1);
  console.log("Premium paid!");
  console.log("-------------");

  console.log(payPremiumTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Script command:  npx hardhat run scripts/payPremium.js --network wowen
 * RESULT:
 * Premium paid!
-------------
{
  hash: '0x28a59e0b9705f460e577e6a9c1cf42daf98cdb9e89d9bb18d4bd95309bcde7eb',
  type: 0,
  accessList: null,
  blockHash: '0x585f666b33bf732e620c85c03c4e52bd1cb15f837600fc588d7d238157a591a7',
  blockNumber: null,
  transactionIndex: 0,
  confirmations: 0,
  from: '0x545e3FCFcf6E34C73F881E92eBD1Dd30D5CfB8cA',
  gasPrice: BigNumber { value: "1500000000" },
  gasLimit: BigNumber { value: "30726" },
  to: '0xbEE10F0Bef849afa9f1992697b3eF2569AeCbC05',
  value: BigNumber { value: "110000000000000000" },
  nonce: 13,
  data: '0x29c08ba2',
  r: '0xe8957f8a227a94eda27752b2791aee51fcae8794631c80e208c10443126a5420',
  s: '0x3aaba7cf78729ab6a701ee5c4a4a6cc6facf64f6661dd1af4f7f63f30e287b7b',
  v: 1998,
  creates: null,
  chainId: 981,
  wait: [Function (anonymous)]
}
 */
