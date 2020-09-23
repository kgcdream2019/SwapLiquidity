const SwapLiquidityToken = artifacts.require('SwapLiquidityToken');
const SwapLiquidityBar = artifacts.require('SwapLiquidityBar');
const MasterChef = artifacts.require('MasterChef');
const WBNB = artifacts.require('WBNB');
const BSCswapFactory = artifacts.require('BSCswapFactory');
const BSCswapRouter = artifacts.require('BSCswapRouter');

// Deployment uniswap contracts

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(BSCswapRouter, "0xC08C219D666b61f114cAB3763824806aC7e63C0C", "0x3207A1C4f3c6A971A2b73ccb5450625D3ED6FAC1");  // factory address, weth address
};
