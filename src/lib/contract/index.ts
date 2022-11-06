import { ethers } from "ethers";

import { protectorABI } from "./abi/protector";
import { sampleERC721ProtectableABI } from "./abi/sampleERC721Protectable";
import { protectorBytecode } from "./bytecode/protector";

import deployments from "../../../contracts/deployments.json";

export const createProtector = async (
  signer: ethers.Signer,
  protocolList: string[],
  isAllowedList: boolean[],
  arbitraryLimit: string,
  worldIdLimit: string,
  polygonIdLimit: string
) => {
  const factory = new ethers.ContractFactory(
    protectorABI,
    protectorBytecode,
    signer
  );
  const { address } = await factory.deploy(
    deployments.verificationResistory,
    protocolList,
    isAllowedList,
    arbitraryLimit,
    worldIdLimit,
    polygonIdLimit
  );
  return address;
};

export const setProtector = async (
  signer: ethers.Signer,
  erc721: string,
  protector: string
) => {
  const eRC721Protectable = new ethers.Contract(
    erc721,
    sampleERC721ProtectableABI,
    signer
  );
  return await eRC721Protectable.setProtectorAddress(protector);
};
