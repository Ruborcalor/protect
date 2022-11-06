// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Protectable.sol";

/**
 * @dev ERC721 token with protect function.
 *
 * Useful for scenarios such as enforcing royalty, controll the distribution
 */
contract SampleERC721Protectable is Ownable, ERC721Protectable {
    uint256 public tokenSupply;

    constructor() ERC721("ERC721Protectable", "ERC721Protectable") {}

    function setProtectorAddress(address protectorAddress) public onlyOwner {
        _setProtectorAddress(protectorAddress);
    }

    function mint(address to) public {
        uint256 tokenId = tokenSupply;
        _mint(to, tokenId);
        tokenSupply++;
    }
}
