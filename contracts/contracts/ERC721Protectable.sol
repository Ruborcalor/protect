// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./Protector.sol";

/**
 * @dev ERC721 token with protect function.
 *
 * Useful for scenarios such as enforcing royalty, controll the distribution
 */
abstract contract ERC721Protectable is ERC721 {
    address private _protectorAddress;

    bool internal _isInitialized;

    function _setProtectorAddress(address protectorAddress) internal {
        _protectorAddress = protectorAddress;
    }

    /**
     * @dev See {ERC721-_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        // this is to pass the initial mint for better demo
        if (_isInitialized) {
            // this cotract requires to set the protected address
            // we can have better model for this, but this is simplest for the allow list pattern demo
            require(
                _protectorAddress != address(0x0),
                "ERC721Protectable: should set the protector address"
            );

            uint256 currentToBalance = balanceOf(to);
            // this msg.sender is transfer from caller, so in our scenario it is market place contract
            require(
                Protector(_protectorAddress).isTransferAllowed(
                    address(this),
                    msg.sender,
                    to,
                    currentToBalance
                ),
                "ERC721Protectable: token transfer not allowed"
            );
        }
    }
}
