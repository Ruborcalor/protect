// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MockRegistry {
    enum ProofType {
        WorldId,
        PolygonId
    }

    event Verified(address sub, ProofType proofType);
    mapping(address => mapping(ProofType => bool)) internal _isVerified;

    function isVerified(
        address sub,
        ProofType proofType
    ) public view returns (bool) {
        return _isVerified[sub][proofType];
    }

    function verify(address sub, ProofType proofType) public {
        _isVerified[sub][proofType] = true;
    }
}
