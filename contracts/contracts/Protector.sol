// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev contract manages allow list of the trade
 *
 * This should be integrated with ERC721Protectable
 */

// owner management can be intgrated with ERC721 contract
// but for the simplicity, have seprarete ownable in protector
contract Protector is Ownable {
    // this is static for the demo
    // this should accept update in the real product
    enum HolderConfigrationType {
        ArbitraryHolder,
        WorldcoinVerified,
        ChiraProtectCommunityMember
        // should support more and make it flexible
    }

    mapping(address => bool) public allowedProtocols;
    mapping(address => uint256) public limits;

    function setAlloedProtocols(
        address[] memory protocolList,
        bool[] memory isAllowedList
    ) public onlyOwner {
        for (uint256 i = 0; i < protocolList.length; i++) {
            allowedProtocols[protocolList[i]] = isAllowedList[i];
        }
    }

    function setLimits(
        address[] memory toList,
        uint256[] memory limitList
    ) public onlyOwner {
        for (uint256 i = 0; i < toList.length; i++) {
            limits[toList[i]] = limitList[i];
        }
    }

    // this function checkes
    // check the caller is allowed or not - in our scenarios, caller is market contract
    // check the to address balance is under limit or not, - in our scenarios, to is the nft holder who will get the NFT
    function isTransferAllowed(
        address asset,
        address caller,
        address to,
        uint256 currentToBalance
    ) public view returns (bool) {
        if (!allowedProtocols[caller]) {
            return false;
        }
        if (currentToBalance >= limits[to]) {
            return false;
        }
        return true;
    }
}
