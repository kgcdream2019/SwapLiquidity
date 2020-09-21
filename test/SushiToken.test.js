const { expectRevert } = require('@openzeppelin/test-helpers');
const SwapLiquidityToken = artifacts.require('SwapLiquidityToken');

contract('SwapLiquidityToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.swapliquidity = await SwapLiquidityToken.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.swapliquidity.name();
        const symbol = await this.swapliquidity.symbol();
        const decimals = await this.swapliquidity.decimals();
        assert.equal(name.valueOf(), 'SwapLiquidityToken');
        assert.equal(symbol.valueOf(), 'SLT');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.swapliquidity.mint(alice, '100', { from: alice });
        await this.swapliquidity.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.swapliquidity.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.swapliquidity.totalSupply();
        const aliceBal = await this.swapliquidity.balanceOf(alice);
        const bobBal = await this.swapliquidity.balanceOf(bob);
        const carolBal = await this.swapliquidity.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.swapliquidity.mint(alice, '100', { from: alice });
        await this.swapliquidity.mint(bob, '1000', { from: alice });
        await this.swapliquidity.transfer(carol, '10', { from: alice });
        await this.swapliquidity.transfer(carol, '100', { from: bob });
        const totalSupply = await this.swapliquidity.totalSupply();
        const aliceBal = await this.swapliquidity.balanceOf(alice);
        const bobBal = await this.swapliquidity.balanceOf(bob);
        const carolBal = await this.swapliquidity.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.swapliquidity.mint(alice, '100', { from: alice });
        await expectRevert(
            this.swapliquidity.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.swapliquidity.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
