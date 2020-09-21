const SwapLiquidityToken = artifacts.require('SwapLiquidityToken');
const SwapLiquidityBar = artifacts.require('SwapLiquidityBar');
const MasterChef = artifacts.require('MasterChef');
const WETH = artifacts.require('WETH');
const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

// const MockERC20 = artifacts.require('MockERC20');
// const UniswapV2Pair = artifacts.require('UniswapV2Pair');
// const UniswapV2Factory = artifacts.require('UniswapV2Factory');

// const TimeLock = artifacts.require('Timelock');
// module.exports = async function(deployer, network, accounts) {
//     console.log(network, accounts);
//     await deployer.deploy(SwapLiquidityToken);
//     const SwapLiquidityTokenContract = await SwapLiquidityToken.deployed();
//     await deployer.deploy(SwapLiquidityBar,SwapLiquidityTokenContract.address);
//     //account[1]  : dev address
//     await deployer.deploy(MasterChef,SwapLiquidityTokenContract.address, '0x6CdC340813EbaB54Ce0E0644BF9d836379b18C0E', '1000', '0', '1000'); // dev
//     const MasterChefContract = await MasterChef.deployed();
//     SwapLiquidityTokenContract.transferOwnership(MasterChefContract.address);
//
//     // await deployer.deploy(UniswapV2Factory,SwapLiquidityTokenContract.address);
//     // await deployer.deploy(TimeLock, accounts[0],"3 days");
// };
// deploy WETH *************************************************************************
module.exports = async function(deployer, network, accounts) {
    // let owner = accounts[0]
    // await deployer.deploy(WETH);
};



