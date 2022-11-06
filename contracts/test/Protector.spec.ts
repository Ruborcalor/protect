import { expect } from "chai";
import { ethers } from "hardhat";

// try to focus on positive test case for the hackathon
describe("Protector", function () {
  describe("simple test", function () {
    it("Should work when all condition is ready", async function () {
      const [initialHolder, nextHolder, mockMarket] = await ethers.getSigners()
      const Registory = await ethers.getContractFactory("MockRegistry");
      const registory = await Registory.deploy();
      const Protector = await ethers.getContractFactory("Protector");
      const protectorWithoutAllowedPrototocol = await Protector.deploy(registory.address, [], [], 0, 1, 1);
      const protectorWithAllowedPrototocol = await Protector.deploy(registory.address, [mockMarket.address], [true], 0, 1, 1);
      const SampleERC721Protectable = await ethers.getContractFactory("SampleERC721Protectable");
      const sampleERC721ProtectableWithoutAllowedProtocol = await SampleERC721Protectable.deploy([initialHolder.address])
      const sampleERC721ProtectableWithAllowedProtocol = await SampleERC721Protectable.deploy([initialHolder.address])
      await sampleERC721ProtectableWithoutAllowedProtocol.setProtectorAddress(protectorWithoutAllowedPrototocol.address)
      await sampleERC721ProtectableWithAllowedProtocol.setProtectorAddress(protectorWithAllowedPrototocol.address)
      await sampleERC721ProtectableWithoutAllowedProtocol.connect(initialHolder).setApprovalForAll(mockMarket.address, true);
      await sampleERC721ProtectableWithAllowedProtocol.connect(initialHolder).setApprovalForAll(mockMarket.address, true);
      await expect(sampleERC721ProtectableWithoutAllowedProtocol.connect(mockMarket).transferFrom(initialHolder.address, nextHolder.address, 0)).to.be.revertedWith("ERC721Protectable: token transfer not allowed by protocol");
      await expect(sampleERC721ProtectableWithAllowedProtocol.connect(mockMarket).transferFrom(initialHolder.address, nextHolder.address, 0)).to.be.revertedWith("ERC721Protectable: token transfer not allowed to the user");
      await registory.verify(nextHolder.address, 0);
      await sampleERC721ProtectableWithAllowedProtocol.connect(mockMarket).transferFrom(initialHolder.address, nextHolder.address, 0)
    });
  });
});
