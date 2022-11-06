export const protectorABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_verificationResistory",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "protocolList",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "isAllowedList",
        type: "bool[]",
      },
      {
        internalType: "uint256",
        name: "_arbitraryLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_worldIdLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_polygonIdLimit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowedProtocols",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "arbitraryLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currentToBalance",
        type: "uint256",
      },
    ],
    name: "isTransferAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "polygonIdLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verificationResistory",
    outputs: [
      {
        internalType: "contract VerificationResistory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "worldIdLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
