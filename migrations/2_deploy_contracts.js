const SwapLiquidityToken = artifacts.require('SwapLiquidityToken');
const SwapLiquidityBar = artifacts.require('SwapLiquidityBar');
const MasterChef = artifacts.require('MasterChef');
const WBNB = artifacts.require('WBNB');
const BSCswapFactory = artifacts.require('BSCswapFactory');
const BSCswapRouter = artifacts.require('BSCswapRouter');

const MockERC20 = artifacts.require('MockERC20');
const BSCswapPair = artifacts.require('BSCswapPair');
const BSCswapFactory = artifacts.require('BSCswapFactory');

const TimeLock = artifacts.require('Timelock');
module.exports = async function(deployer, network, accounts) {
    console.log(network, accounts);
    await deployer.deploy(SwapLiquidityToken);
    const SwapLiquidityTokenContract = await SwapLiquidityToken.deployed();
    await deployer.deploy(SwapLiquidityBar,SwapLiquidityTokenContract.address);
    await deployer.deploy(MasterChef,SwapLiquidityTokenContract.address, accounts[0], '1000', '0', '1000'); // dev
    const MasterChefContract = await MasterChef.deployed();
    SwapLiquidityTokenContract.transferOwnership(MasterChefContract.address);
    await deployer.deploy(BSCswapFactory,SwapLiquidityTokenContract.address);
    await deployer.deploy(TimeLock, accounts[0],"3 days");
    await deployer.deploy(BSCswapFactory, accounts[0]);  //feeSeter
    const BSCswapFactoryContract = await BSCswapFactory.deployed();
    const WBNB_ASSRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; //BSC_MAINNET
    // const WBNB_ASSRESS = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"; //BSC_TESTNET
    await deployer.deploy(BSCswapRouter, BSCswapFactoryContract.address, WBNB_ASSRESS);  // factory address, weth address
};




