const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const addressContract = require("./contractAddress");

async function main() {
  // Retrieve the contract instance using the contract address
  const contractAddress = addressContract;
  const Insurance = await ethers.getContractFactory("Insurance");
  const insurance = await Insurance.attach(contractAddress);

  const claimNumber = 7; //Replace with UI

  // Call contract functions
  const rejectClaimTxResponse = await insurance.rejectClaim(claimNumber);
  await rejectClaimTxResponse.wait(1);
  console.log("Claim rejected!");
  console.log("-------------");

  console.log(rejectClaimTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Script command:  npx hardhat run scripts/rejectClaim.js --network wowen
 * RESULT:
Claim rejected!
-------------
{
  hash: '0x7d9435f6b5d63649d5b1aaf58f3c8518ae0145687d1be66701c48888186d19e6',
  type: 0,
  accessList: null,
  blockHash: '0x051776f7769fa4ba047fa033a2debc90de28fa98780f3632ccf4237d5c69104b',
  blockNumber: null,
  transactionIndex: 0,
  confirmations: 0,
  from: '0x545e3FCFcf6E34C73F881E92eBD1Dd30D5CfB8cA',
  gasPrice: BigNumber { value: "1500000000" },
  gasLimit: BigNumber { value: "27644" },
  to: '0xbEE10F0Bef849afa9f1992697b3eF2569AeCbC05',
  value: BigNumber { value: "0" },
  nonce: 16,
  data: '0x203411010000000000000000000000000000000000000000000000000000000000000007',
  r: '0x1b925845d7480641615c6bf894e37e9d5c86647b5e02bb81680c5359bdd37d86',
  s: '0x162e59b237b7ac3a1d9783156a0991a427ca0581594d3840cd0e71505cb401b9',
  v: 1997,
  creates: null,
  chainId: 981,
  wait: [Function (anonymous)]
}
 */
