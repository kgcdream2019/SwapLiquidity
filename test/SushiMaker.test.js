const SwapLiquidityToken = artifacts.require('SwapLiquidityToken');
const SwapLiquidityMaker = artifacts.require('SwapLiquidityMaker');
const MockERC20 = artifacts.require('MockERC20');
const JulSwapHPair = artifacts.require('JulSwapHPair');
const JulSwapHFactory = artifacts.require('JulSwapHFactory');

contract('SwapLiquidityMaker', ([alice, bar, minter]) => {
    beforeEach(async () => {
        this.factory = await JulSwapHFactory.new(alice, { from: alice });
        this.swapliquidity = await SwapLiquidityToken.new({ from: alice });
        await this.swapliquidity.mint(minter, '100000000', { from: alice });
        this.weth = await MockERC20.new('WBNB', 'WBNB', '100000000', { from: minter });
        this.token1 = await MockERC20.new('TOKEN1', 'TOKEN', '100000000', { from: minter });
        this.token2 = await MockERC20.new('TOKEN2', 'TOKEN2', '100000000', { from: minter });
        this.maker = await SwapLiquidityMaker.new(this.factory.address, bar, this.swapliquidity.address, this.weth.address);
        this.swapliquidityWBNB = await JulSwapHPair.at((await this.factory.createPair(this.weth.address, this.swapliquidity.address)).logs[0].args.pair);
        this.wethToken1 = await JulSwapHPair.at((await this.factory.createPair(this.weth.address, this.token1.address)).logs[0].args.pair);
        this.wethToken2 = await JulSwapHPair.at((await this.factory.createPair(this.weth.address, this.token2.address)).logs[0].args.pair);
        this.token1Token2 = await JulSwapHPair.at((await this.factory.createPair(this.token1.address, this.token2.address)).logs[0].args.pair);
    });

    it('should make SLTs successfully', async () => {
        await this.factory.setFeeTo(this.maker.address, { from: alice });
        await this.weth.transfer(this.swapliquidityWBNB.address, '10000000', { from: minter });
        await this.swapliquidity.transfer(this.swapliquidityWBNB.address, '10000000', { from: minter });
        await this.swapliquidityWBNB.mint(minter);
        await this.weth.transfer(this.wethToken1.address, '10000000', { from: minter });
        await this.token1.transfer(this.wethToken1.address, '10000000', { from: minter });
        await this.wethToken1.mint(minter);
        await this.weth.transfer(this.wethToken2.address, '10000000', { from: minter });
        await this.token2.transfer(this.wethToken2.address, '10000000', { from: minter });
        await this.wethToken2.mint(minter);
        await this.token1.transfer(this.token1Token2.address, '10000000', { from: minter });
        await this.token2.transfer(this.token1Token2.address, '10000000', { from: minter });
        await this.token1Token2.mint(minter);
        // Fake some revenue
        await this.token1.transfer(this.token1Token2.address, '100000', { from: minter });
        await this.token2.transfer(this.token1Token2.address, '100000', { from: minter });
        await this.token1Token2.sync();
        await this.token1.transfer(this.token1Token2.address, '10000000', { from: minter });
        await this.token2.transfer(this.token1Token2.address, '10000000', { from: minter });
        await this.token1Token2.mint(minter);
        // Maker should have the LP now
        assert.equal((await this.token1Token2.balanceOf(this.maker.address)).valueOf(), '16528');
        // After calling convert, bar should have SLT value at ~1/6 of revenue
        await this.maker.convert(this.token1.address, this.token2.address);
        assert.equal((await this.swapliquidity.balanceOf(bar)).valueOf(), '32965');
        assert.equal((await this.token1Token2.balanceOf(this.maker.address)).valueOf(), '0');
        // Should also work for SLT-BNB pair
        await this.swapliquidity.transfer(this.swapliquidityWBNB.address, '100000', { from: minter });
        await this.weth.transfer(this.swapliquidityWBNB.address, '100000', { from: minter });
        await this.swapliquidityWBNB.sync();
        await this.swapliquidity.transfer(this.swapliquidityWBNB.address, '10000000', { from: minter });
        await this.weth.transfer(this.swapliquidityWBNB.address, '10000000', { from: minter });
        await this.swapliquidityWBNB.mint(minter);
        assert.equal((await this.swapliquidityWBNB.balanceOf(this.maker.address)).valueOf(), '16537');
        await this.maker.convert(this.swapliquidity.address, this.weth.address);
        assert.equal((await this.swapliquidity.balanceOf(bar)).valueOf(), '66249');
        assert.equal((await this.swapliquidityWBNB.balanceOf(this.maker.address)).valueOf(), '0');
    });
});