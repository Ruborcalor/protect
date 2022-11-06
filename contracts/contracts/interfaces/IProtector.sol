// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IProtector {
    function isTransferAllowed(
        address asset,
        address caller,
        address to
    ) external view returns (bool);
}
