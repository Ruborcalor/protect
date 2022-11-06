// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./VerificationResistory.sol";

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
    enum ProofType {
        WorldId,
        PolygonId
    }

    mapping(address => bool) public allowedProtocols;
    uint256 public arbitraryLimit;
    uint256 public worldIdLimit;
    uint256 public polygonIdLimit;

    VerificationResistory public verificationResistory;

    constructor(address _verificationResistory) {
        verificationResistory = VerificationResistory(_verificationResistory);
    }

    // should be more flexible
    function set(
        address[] memory protocolList,
        bool[] memory isAllowedList,
        // this is static for the demo
        // this should accept update in the real product
        uint256 _arbitraryLimit,
        uint256 _worldIdLimit,
        uint256 _polygonIdLimit
    ) public onlyOwner {
        for (uint256 i = 0; i < protocolList.length; i++) {
            allowedProtocols[protocolList[i]] = isAllowedList[i];
        }
        arbitraryLimit = _arbitraryLimit;
        worldIdLimit = _worldIdLimit;
        polygonIdLimit = _polygonIdLimit;
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
        // get which one is the maximum
        // this logic is not effective but it works
        uint256[] memory limits = new uint256[](3);
        limits[0] = (arbitraryLimit);
        if (true) {
            limits[1] = worldIdLimit;
        } else {
            // just minimum value
            limits[1] = 0;
        }
        if (true) {
            limits[2] = polygonIdLimit;
        } else {
            // just minimum value
            limits[2] = 0;
        }
        uint256 limit = _getMax(limits);
        if (currentToBalance >= limit) {
            return false;
        }
        return true;
    }

    function _getMax(uint256[] memory numbers) internal pure returns (uint256) {
        require(numbers.length > 0); // throw an exception if the condition is not met
        uint256 maxNumber; // default 0, the lowest value of `uint256`
        for (uint256 i = 0; i < numbers.length; i++) {
            if (numbers[i] > maxNumber) {
                maxNumber = numbers[i];
            }
        }
        return maxNumber;
    }
}
