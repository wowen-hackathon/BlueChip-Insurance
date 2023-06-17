const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const addressContract = require("./contractAddress");

async function main() {
  // Retrieve the contract instance using the contract address
  const contractAddress = addressContract;
  const Insurance = await ethers.getContractFactory("Insurance");
  const insurance = await Insurance.attach(contractAddress);

  const claimNumber = "0"; //Replace with UI

  // Call contract functions
  const getClaimsByIdTxResponse = await insurance.getClaimsById(claimNumber);
  console.log(getClaimsByIdTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Script command:  npx hardhat run scripts/getClaimsById.js --network wowen
 * RESULT:
 * [
  BigNumber { value: "0" },
  '0x545e3FCFcf6E34C73F881E92eBD1Dd30D5CfB8cA',
  '0x1e281c39668A16CE6FA329906439c8541e110E9f',
  'This is a tx hash',
  BigNumber { value: "200000000000000000" },
  'Some comment',
  2,
  claimNumber: BigNumber { value: "0" },
  claimant: '0x545e3FCFcf6E34C73F881E92eBD1Dd30D5CfB8cA',
  newAddress: '0x1e281c39668A16CE6FA329906439c8541e110E9f',
  transactionHash: 'This is a tx hash',
  amount: BigNumber { value: "200000000000000000" },
  comments: 'Some comment',
  status: 2
]
 */
