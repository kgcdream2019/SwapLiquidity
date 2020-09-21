const SwapLiquidityToken = artifacts.require('SwapLiquidityToken');
const SwapLiquidityBar = artifacts.require('SwapLiquidityBar');
const MasterChef = artifacts.require('MasterChef');
const WETH = artifacts.require('WETH');
const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

// Deployment uniswap contracts

module.exports = async function(deployer, network, accounts) {
    // await deployer.deploy(UniswapV2Factory, "0xafCe130B2cd93D191A6C16e784a4F200107399ee");  //feeSeter
};
