import { ethers } from "ethers"

import { protectorABI } from "./abi/protector"
import { sampleERC721ProtectableABI } from "./abi/sampleERC721Protectable"
import { protectorBytecode } from "./bytecode/protector"

export const createProtector = async (signer: ethers.Signer) => {
    const factory = new ethers.ContractFactory(protectorABI, protectorBytecode, signer);
    const { address } = await factory.deploy();
    return address
}

export const setProtector = async (signer: ethers.Signer, erc721: string, protector: string) => {
    const eRC721Protectable = new ethers.Contract(sampleERC721ProtectableABI as any, erc721, signer);
    return await eRC721Protectable.setProtectorAddress(protector);
}