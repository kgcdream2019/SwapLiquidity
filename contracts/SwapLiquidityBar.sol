pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract SwapLiquidityBar is ERC20("SwapLiquidityBar", "xSLT"){
    using SafeMath for uint256;
    IERC20 public swapliquidity;

    constructor(IERC20 _swapliquidity) public {
        swapliquidity = _swapliquidity;
    }

    // Enter the bar. Pay some SLTs. Earn some shares.
    function enter(uint256 _amount) public {
        uint256 totalSwapLiquidity = swapliquidity.balanceOf(address(this));
        uint256 totalShares = totalSupply();
        if (totalShares == 0 || totalSwapLiquidity == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 what = _amount.mul(totalShares).div(totalSwapLiquidity);
            _mint(msg.sender, what);
        }
        swapliquidity.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your SLTs.
    function leave(uint256 _share) public {
        uint256 totalShares = totalSupply();
        uint256 what = _share.mul(swapliquidity.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        swapliquidity.transfer(msg.sender, what);
    }
}