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

// This is for DCAU_WAVAx LP on fuji, pool id is 3
module.exports = async function ({ ethers, getNamedAccounts, deployments, getChainId }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const mockDCAU = await deployments.get("MockDCAU");
  const vaultChef = await deployments.get("VaultChef");
  const masterChef = await deployments.get("MasterChef");

  const dcau =
    process.env.PRODUCTION_MODE === "development"
      ? mockDCAU.address
      : "0xmainnet dcau address here";
  const withdrawFeeAddress = "0x6C641CE6A7216F12d28692f9d8b2BDcdE812eD2b";
  const feeAddress = "0x6C641CE6A7216F12d28692f9d8b2BDcdE812eD2b";

  /** @todo should be changed*/
  const uniRouterAddress = '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921'; // Pangolin router on Fuji
  const pid = 0;
  const wantAddress = '0xAeEf1f65082Ec3727BEc8cf933971C2a20d1aed3'; // lp address
  const earnedAddress = dcau;
  const _earnedToWmaticPath = [dcau, '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'];
  const _earnedToDcauPath = [dcau, dcau];
  const _earnedToToken0Path = [dcau, dcau];
  const _earnedToToken1Path = [dcau, '0xA8A2bFE97c51bB83e21bF0405e98CF9D8eFB2674'];
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

module.exports.tags = ['StrategyMasterChef', 'DragonCrypto'];
module.exports.dependencies = ["MockDCAU", "VaultChef", "MasterChef"];
