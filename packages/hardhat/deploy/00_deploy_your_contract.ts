import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { ethers } from "hardhat";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("YourContract", {
    from: deployer,
    // Contract constructor arguments
    // args: [deployer],
    log: true,
    value: String(ethers.parseEther("0.01")),
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);

  await yourContract.addQuestion("Who is Satoshi Nakamato?", "Founder of Ethereum", "Founder of Bitcoin");

  await yourContract.addQuestion("When trading, which platform do you prefer?", "Binance", "Gate.io");

  await yourContract.addQuestion("What is your expectation for the cryptocurrency market?", "Bullish", "Bearish");

  await yourContract.addQuestion(
    "When selling crypto, which method do you prefer?",
    "Centralized Exchange (CEX)",
    "Decentralized Exchange (DEX)",
  );

  await yourContract.addQuestion(
    "Considering Binance recently froze some Palestinian users’ accounts at the request of the Israeli government, do you worry that they might do the same to your account in the future?",
    "Yes, I do. It’s a concern for me that something similar could happen to my account in the future",
    "No, I don’t. I trust that my account won’t be affected in a similar way.",
  );

  await yourContract.addQuestion(
    "Would Trump’s election as president be beneficial for cryptocurrencies?",
    "Yes",
    "No",
  );
  await yourContract.transferOwnership("0x357bc010520575Ea5720aC3F7cb48fcedfc711Ed");
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
