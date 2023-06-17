const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const addressContract = require("./contractAddress");

async function main() {
  // Retrieve the contract instance using the contract address
  const contractAddress = addressContract;
  const Insurance = await ethers.getContractFactory("Insurance");
  const insurance = await Insurance.attach(contractAddress);

  const address = "0x1e281c39668A16CE6FA329906439c8541e110E9f"; //Replace with UI

  // Call contract functions
  const getClaimsByAccountTxResponse = await insurance.getClaimsByAccount(
    address
  );
  console.log(getClaimsByAccountTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * Script command:  npx hardhat run scripts/getClaimsByAccount.js --network wowen
 * RESULT:
 *[ BigNumber { value: "2" }, BigNumber { value: "3" } ]
 */
