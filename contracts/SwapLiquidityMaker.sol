pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./huobi/interfaces/IJulSwapHRC20.sol";
import "./huobi/interfaces/IJulSwapHPair.sol";
import "./huobi/interfaces/IJulSwapHFactory.sol";


contract SwapLiquidityMaker {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IJulSwapHFactory public factory;
    address public bar;
    address public swapliquidity;
    address public wht;

    constructor(IJulSwapHFactory _factory, address _bar, address _swapliquidity, address _wht) public {
        factory = _factory;
        swapliquidity = _swapliquidity;
        bar = _bar;
        wht = _wht;
    }

    function convert(address token0, address token1) public {
        // At least we try to make front-running harder to do.
        require(msg.sender == tx.origin, "do not convert from contract");
        IJulSwapHPair pair = IJulSwapHPair(factory.getPair(token0, token1));
        pair.transfer(address(pair), pair.balanceOf(address(this)));
        pair.burn(address(this));
        uint256 whtAmount = _toWHT(token0) + _toWHT(token1);
        _toSLT(whtAmount);
    }

    function _toWHT(address token) internal returns (uint256) {
        if (token == swapliquidity) {
            uint amount = IERC20(token).balanceOf(address(this));
            _safeTransfer(token, bar, amount);
            return 0;
        }
        if (token == wht) {
            uint amount = IERC20(token).balanceOf(address(this));
            _safeTransfer(token, factory.getPair(wht, swapliquidity), amount);
            return amount;
        }
        IJulSwapHPair pair = IJulSwapHPair(factory.getPair(token, wht));
        if (address(pair) == address(0)) {
            return 0;
        }
        (uint reserve0, uint reserve1,) = pair.getReserves();
        address token0 = pair.token0();
        (uint reserveIn, uint reserveOut) = token0 == token ? (reserve0, reserve1) : (reserve1, reserve0);
        uint amountIn = IERC20(token).balanceOf(address(this));
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        uint amountOut = numerator / denominator;
        (uint amount0Out, uint amount1Out) = token0 == token ? (uint(0), amountOut) : (amountOut, uint(0));
        _safeTransfer(token, address(pair), amountIn);
        pair.swap(amount0Out, amount1Out, factory.getPair(wht, swapliquidity), new bytes(0));
        return amountOut;
    }

    function _toSLT(uint256 amountIn) internal {
        IJulSwapHPair pair = IJulSwapHPair(factory.getPair(wht, swapliquidity));
        (uint reserve0, uint reserve1,) = pair.getReserves();
        address token0 = pair.token0();
        (uint reserveIn, uint reserveOut) = token0 == wht ? (reserve0, reserve1) : (reserve1, reserve0);
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        uint amountOut = numerator / denominator;
        (uint amount0Out, uint amount1Out) = token0 == wht ? (uint(0), amountOut) : (amountOut, uint(0));
        pair.swap(amount0Out, amount1Out, bar, new bytes(0));
    }

    function _safeTransfer(address token, address to, uint256 amount) internal {
        IERC20(token).safeTransfer(to, amount);
    }
}
