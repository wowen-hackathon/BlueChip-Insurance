const { ethers, run, network } = require("hardhat");

async function main() {
  const InsuranceFactory = await ethers.getContractFactory("Insurance");
  console.log("---Deploying contract---");
  const insurance = await InsuranceFactory.deploy();
  await insurance.deployed();
  console.log(`Contract address: ${insurance.address}`);

  //Interaction with the functions
  const owner = await insurance.i_owner();
  console.log(`Owner is: ${owner}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Script command:  npx hardhat run scripts/deploy.js --network wowen
