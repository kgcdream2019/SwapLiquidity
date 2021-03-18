// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.5.0;

interface IJulSwapHCallee {
    function JulSwapCall(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
