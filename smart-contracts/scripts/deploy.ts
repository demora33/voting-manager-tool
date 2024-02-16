import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";

async function main() {
  const VotingManager = await ethers.getContractFactory("VotingManager");
  let [owner, addr1, addr2, addr3 ] = await ethers.getSigners();

  console.log("Deploying VotingManager...");
  console.log(`Deployer address: ${owner.address}`);

  let votingManager: Contract = await upgrades.deployProxy(VotingManager, [], {
    initializer: "initialize",
    kind: "transparent",
  });

  const votingManagerAddress = await votingManager.getAddress();
  console.log("VotingManager deployed to:", votingManagerAddress);

  const votingManagerImplementation: string =
    await upgrades.erc1967.getImplementationAddress(votingManagerAddress);
  console.log(`VotingManager implementation: ${votingManagerImplementation}`);

  const contractOwner = await votingManager.owner();

  console.log(`Owner of the contract: ${contractOwner}`);
  console.log(`Deployer of the contract: ${owner.address}`);

  if (contractOwner === owner.address) {
    console.log("The owner of the contract is the same as the deployer.");
  } else {
    console.log("The owner of the contract is not the same as the deployer.");
  }

  console.log(`---------------------------------------------------`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
