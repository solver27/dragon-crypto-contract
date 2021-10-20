// Defining bytecode and abi from original contract on mainnet to ensure bytecode matches and it produces the same pair code hash
require('dotenv').config();
const deployedTokens = require('../args/tokens_dev.json');

module.exports = async function ({ ethers, getNamedAccounts, deployments, getChainId }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const USDC = process.env.PRODUCTION_MODE === 'development' ? deployedTokens.usdc : '0xmainnet usdc address here';
  const devWallet = process.env.PRODUCTION_MODE === 'development' ? '0x6C641CE6A7216F12d28692f9d8b2BDcdE812eD2b' : '0xmainnet address here';
  const saleTimeStamp = 0;

  await deploy('DragonNestSupporter', {
    from: deployer,
    log: true,
    args: [devWallet, USDC, saleTimeStamp],
    deterministicDeployment: false,
  })
}

module.exports.tags = ['DragonNestSupporter', 'PolyDragon'];
