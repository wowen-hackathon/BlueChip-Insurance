const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const addressContract = require("./contractAddress");

async function main() {
  // Retrieve the contract instance using the contract address
  const contractAddress = addressContract;
  const Insurance = await ethers.getContractFactory("Insurance");
  const insurance = await Insurance.attach(contractAddress);

  const address = "0x144d2c38fe97E819f831744790AAF34f0f06fc87"; // Replace from UI

  // Call contract functions
  const getPremiumByAddressTxResponse = await insurance.addressToPremium(
    address
  );
  console.log(getPremiumByAddressTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Script command:  npx hardhat run scripts/getPremiumByAddress.js --network wowen
 * RESULT:
 * BigNumber { value: "1320000000000000000" }
 */
