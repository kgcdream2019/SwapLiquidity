const SushiToken = artifacts.require('SushiToken');
const SushiBar = artifacts.require('SushiBar');
const MasterChef = artifacts.require('MasterChef');
const WETH = artifacts.require('WETH');
const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

// Deployment uniswap contracts

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(UniswapV2Router02, "0xC08C219D666b61f114cAB3763824806aC7e63C0C", "0x3207A1C4f3c6A971A2b73ccb5450625D3ED6FAC1");  // factory address, weth address
};
