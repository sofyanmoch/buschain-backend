const hre = require("hardhat");

async function main() {
  const BusBooking = await hre.ethers.getContractFactory("BusBooking");
  const contract = await BusBooking.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("BusBooking deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});