const SwapLiquidityToken = artifacts.require('SwapLiquidityToken');
const SwapLiquidityBar = artifacts.require('SwapLiquidityBar');
const MasterChef = artifacts.require('MasterChef');
// const WHT = artifacts.require('WHT');
const JulSwapHFactory = artifacts.require('JulSwapHFactory');
const JulSwapHRouter = artifacts.require('JulSwapHRouter');

const MockERC20 = artifacts.require('MockERC20');
const JulSwapHPair = artifacts.require('JulSwapHPair');
// const JulSwapHFactory = artifacts.require('JulSwapHFactory');

const TimeLock = artifacts.require('Timelock');
module.exports = async function(deployer, network, accounts) {
    console.log(network, accounts);
    // await deployer.deploy(SwapLiquidityToken);
    // const SwapLiquidityTokenContract = await SwapLiquidityToken.deployed();
    // await deployer.deploy(SwapLiquidityBar,SwapLiquidityTokenContract.address);
    // await deployer.deploy(MasterChef,SwapLiquidityTokenContract.address, accounts[0], '1000', '0', '1000'); // dev
    // const MasterChefContract = await MasterChef.deployed();
    // SwapLiquidityTokenContract.transferOwnership(MasterChefContract.address);
    // await deployer.deploy(JulSwapHFactory,SwapLiquidityTokenContract.address);
    // await deployer.deploy(TimeLock, accounts[0],"3 days");
    await deployer.deploy(JulSwapHFactory, accounts[0]);  //feeSeter
    const JulSwapHFactoryContract = await JulSwapHFactory.deployed();
    const WHT_ASSRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'; //BSC_MAINNET  
    console.log('factory address = ', JulSwapHFactoryContract.address, 'WHT address = ', WHT_ASSRESS);
    await deployer.deploy(JulSwapHRouter, JulSwapHFactoryContract.address, WHT_ASSRESS);  // factory address, wht address
};




