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

    constructor(
        address[] memory inititialMintList
    ) ERC721("ERC721Protectable", "ERC721Protectable") {
        for (uint256 i = 0; i < inititialMintList.length; i++) {
            mint(inititialMintList[i]);
        }
        _isInitialized = true;
    }

    function setProtectorAddress(address protectorAddress) public onlyOwner {
        _setProtectorAddress(protectorAddress);
    }

    function mint(address to) public {
        uint256 tokenId = tokenSupply;
        _mint(to, tokenId);
        tokenSupply++;
    }


    function tokenURI(uint256) public pure override returns (string memory) {
        return "https://raw.githubusercontent.com/Ruborcalor/protect/main/data/metadata.json";
    }
}
