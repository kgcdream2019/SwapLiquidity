const SushiToken = artifacts.require('SushiToken');
const SushiBar = artifacts.require('SushiBar');
const MasterChef = artifacts.require('MasterChef');
const WETH = artifacts.require('WETH');
const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

// Deployment uniswap contracts

module.exports = async function(deployer, network, accounts) {
    // await deployer.deploy(WETH);
    await deployer.deploy(UniswapV2Factory, "0x6bB569d2CC1458331FD61f3C3a2d906B5f0BBf91");  //feeSeter
    const UniswapV2FactoryContract = await UniswapV2Factory.deployed();
    // const WETHContract = await WETH.deployed();
    // await deployer.deploy(UniswapV2Router02, UniswapV2FactoryContract.address, WETHContract.address);  //
    // await deployer.deploy(UniswapV2Router02, UniswapV2FactoryContract.address, "0x8463bEaB143066a45aB8B4AE82c11BF9f5fbe52f");  //
};
