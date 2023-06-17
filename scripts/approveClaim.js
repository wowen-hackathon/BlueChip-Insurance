const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const addressContract = require("./contractAddress");

async function main() {
  // Retrieve the contract instance using the contract address
  const contractAddress = addressContract;
  const Insurance = await ethers.getContractFactory("Insurance");
  const insurance = await Insurance.attach(contractAddress);

  const claimNumber = 1; //Replace with UI

  // Call contract functions
  const approveClaimTxResponse = await insurance.approveClaim(claimNumber);
  await approveClaimTxResponse.wait(1);
  console.log("Claim approved!");
  console.log("-------------");

  console.log(approveClaimTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Script command:  npx hardhat run scripts/approveClaim.js --network wowen
 * RESULT:
Claim approved!
-------------
{
  hash: '0xc75c3903b1fbe5f7a5483c99e8ce532c0995b7236345af0519430ce0245fb211',
  type: 0,
  accessList: null,
  blockHash: '0xb80ecf4119a36d46bb9d7d17587eee3d5bb96531ae2f29ab023a54933ee17b93',
  blockNumber: null,
  transactionIndex: 0,
  confirmations: 0,
  from: '0x545e3FCFcf6E34C73F881E92eBD1Dd30D5CfB8cA',
  gasPrice: BigNumber { value: "1500000000" },
  gasLimit: BigNumber { value: "42595" },
  to: '0xbEE10F0Bef849afa9f1992697b3eF2569AeCbC05',
  value: BigNumber { value: "0" },
  nonce: 15,
  data: '0x46e301350000000000000000000000000000000000000000000000000000000000000006',
  r: '0xa3fd5c242c1ea24ff5356beea4f6f31f8e1f5d4e370bafed0bbf297b165396a1',
  s: '0x4696b01cd815a3bb33acb2985ff173b30bc653091611ac1d5e98d9755fd67a6c',
  v: 1997,
  creates: null,
  chainId: 981,
  wait: [Function (anonymous)]
}
 */
