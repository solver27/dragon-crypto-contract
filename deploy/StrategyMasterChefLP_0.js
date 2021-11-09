// Defining bytecode and abi from original contract on mainnet to ensure bytecode matches and it produces the same pair code hash
// this script is for getting Metadata.json
// address[] memory _initialWalletPath, dcauAddress = _initialWalletPath[0]; withdrawFeeAddress = _initialWalletPath[1]; feeAddress = _initialWalletPath[2];
// address _vaultChefAddress,
// address _masterchefAddress,
// address _uniRouterAddress,
// uint256 _pid,
// address _wantAddress, // the token which we want to put in pool
// address _earnedAddress,
// address[] memory _earnedToWmaticPath,
// address[] memory _earnedToDcauPath,
// address[] memory _earnedToToken0Path,
// address[] memory _earnedToToken1Path


require('dotenv').config();

// This is for DCAU_WAVAx LP on Avalanche,MC pool id is 0
module.exports = async function ({ ethers, getNamedAccounts, deployments, getChainId }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // const mockDCAU = await deployments.get("MockDCAU");
  // const vaultChef = await deployments.get("VaultChef");
  // const masterChef = await deployments.get("MasterChef");

  const vaultChef = { address: '0xc35F12114e20897A2a6B7AE1e1f2Aea389Ec909d' };
  const masterChef = { address: '0x0be0d3d0c3a122b7f57b6119766880a83f95ae9f' };

  const dcau = "0x100Cc3a819Dd3e8573fD2E46D1E66ee866068f30";
  
  /** @todo */
  const withdrawFeeAddress = "0x306e5F7FAe63a86b3E2D88F94cCa8D7614684D91";
  const feeAddress = "0x306e5F7FAe63a86b3E2D88F94cCa8D7614684D91";

  /** @todo should be changed*/
  const uniRouterAddress = '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'; // TradeJoe router on Avalanche
  const pid = 2;
  const wantAddress = '0xbD941531c1234ed2f9dbbC79aEe019bA85c16640'; // lp address
  const earnedAddress = dcau;
  const _earnedToWmaticPath = [dcau, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'];
  const _earnedToDcauPath = [dcau, dcau];
  const _earnedToToken0Path = [dcau, dcau];
  const _earnedToToken1Path = [dcau, '0x130966628846BFd36ff31a822705796e8cb8C18D'];
  /**************************/

  await deploy('StrategyMasterChefLP', {
    from: deployer,
    log: true,
    args: [
      [
        dcau, withdrawFeeAddress, feeAddress
      ],
      vaultChef.address,
      masterChef.address,
      uniRouterAddress,
      pid,
      wantAddress,
      earnedAddress, // dcau
      _earnedToWmaticPath,
      _earnedToDcauPath,
      _earnedToToken0Path,
      _earnedToToken1Path
    ],
    deterministicDeployment: false,
  })
}

module.exports.tags = ['StrategyMasterChefLP', 'DragonCryptoAurum'];
// module.exports.dependencies = ["MockDCAU", "VaultChef", "MasterChef"];
