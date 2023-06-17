const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const addressContract = require("./contractAddress");

async function main() {
  // Retrieve the contract instance using the contract address
  const contractAddress = addressContract;
  const Insurance = await ethers.getContractFactory("Insurance");
  const insurance = await Insurance.attach(contractAddress);

  const newAddress = "0x1e281c39668a16ce6fa329906439c8541e110e9f"; // Replace with input from UI
  const transactionHash = "This is a tx hash"; // Replace with input from UI
  const amount = ethers.BigNumber.from(ethers.utils.parseEther("0.15")); // Replace with input from UI
  const comments = "Some comment"; // Replace with input from UI

  // Call contract functions
  const fileClaimTxResponse = await insurance.fileClaim(
    newAddress,
    transactionHash,
    amount,
    comments
  );
  await fileClaimTxResponse.wait(1);
  console.log("Claim filed!");
  console.log("-------------");

  console.log(fileClaimTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Script command:  npx hardhat run scripts/fileClaim.js --network wowen
 * RESULT:
Claim filed!
-------------
{
  hash: '0x5bdba6432e2745dedea1390b41951c3f4c6223913800367041353739adea4ac7',
  type: 0,
  accessList: null,
  blockHash: '0x405cff61dad2356b8d91532972818226d06f0874035de3f4ff764a2902f2653b',
  blockNumber: null,
  transactionIndex: 0,
  confirmations: 0,
  from: '0x545e3FCFcf6E34C73F881E92eBD1Dd30D5CfB8cA',
  gasPrice: BigNumber { value: "1500000000" },
  gasLimit: BigNumber { value: "70233" },
  to: '0xbEE10F0Bef849afa9f1992697b3eF2569AeCbC05',
  value: BigNumber { value: "0" },
  nonce: 14,
  data: '0x09e321fb0000000000000000000000001e281c39668a16ce6fa329906439c8541e110e9f000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000002c68af0bb14000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000115468697320697320612074782068617368000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c536f6d6520636f6d6d656e740000000000000000000000000000000000000000',
  r: '0x31499eb9593ce02642dbd8941339513939a3a23beedc329f2eb9fc7629b52227',
  s: '0x03ca11ec1ee87792987c9ebdeec69ca585fc7aa8ddb29d0bde0f1e424af3ed25',
  v: 1998,
  creates: null,
  chainId: 981,
  wait: [Function (anonymous)]
}
 */
