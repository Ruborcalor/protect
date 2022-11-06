import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  OrderedList,
  Progress,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useGlobalContext } from "../components/common/globalState";
// import styles from "../styles/Home.module.css";

export interface ProtectionConfiguration {
  // Overview
  collectionName: string;
  collectionAddress: string;

  // Protocol Configuration
  useFriendlyExchangeAllowlist: boolean;
  useFriendlyLendingAllowlist: boolean;
  customAllowlist: string;

  // Holder configuration
  maxPerArbitraryHolder: number;
  maxPerWorldcoinHolder: number;
  maxPerChiraProtectCommunityMember: number;
}

const Home: NextPage = () => {
  // - collection name
  // - collection address
  // - friendly nft exchanges allowlist
  // - friendly nft lending platforms allowlist
  // - custom allowlist
  // - arbitrary holder
  // - worldcoin verified

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { globalState, setGlobalState } = useGlobalContext()!;

  // Overview
  const [collectionName, setCollectionName] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");

  // Protocol confiruation
  const [useFriendlyExchangeAllowlist, setUseFriendlyExchangeAllowlist] =
    useState(true);
  const [useFriendlyLendingAllowlist, setUseFriendlyLendingAllowlist] =
    useState(true);
  const [customAllowlist, setCustomAllowlist] = useState("");

  // Holder configuration
  const [maxPerArbitraryHolder, setMaxPerArbitraryHolder] = useState(0);
  const [maxPerWorldcoinHolder, setMaxPerWorldcoinHolder] = useState(5);
  const [
    maxPerChiraProtectCommunityMember,
    setMaxPerChiraProtectCommunityMember,
  ] = useState(10);

  return (
    <div>
      <Head>
        <title>Chira Protect</title>
        <meta
          name="description"
          content="Create a protection for an NFT collection"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box padding="4rem" w="80%" m="auto">
          <Heading mb="10">Create Protection for NFT Collection</Heading>
          <Flex
            direction="column"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            gap="2rem"
          >
            <Box w="100%" mt="10px">
              <Text fontSize="3xl" as="b">
                Overview
              </Text>
              {/* <Divider borderWidth="1px" mt="10px" /> */}
            </Box>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">NFT Collection Name</Text>
              </Box>
              <Box>
                <Input
                  w="350px"
                  placeholder="Bored Ape Yacht Club"
                  size="lg"
                  value={collectionName}
                  onChange={(event) => setCollectionName(event.target.value)}
                />
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">NFT Collection Address</Text>
              </Box>
              <Box>
                <Input
                  w="350px"
                  placeholder="0xabcd..."
                  size="lg"
                  value={collectionAddress}
                  onChange={(event) => setCollectionAddress(event.target.value)}
                />
              </Box>
            </Flex>

            <Box w="100%" mt="10px">
              <Text fontSize="3xl" as="b">
                Protocol Customization
              </Text>
              {/* <Divider borderWidth="1px" mt="10px" /> */}
            </Box>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">
                  Add Friendly NFT Exchanges to Allowlist
                </Text>
              </Box>
              <Box>
                <Checkbox
                  size="lg"
                  defaultChecked
                  isChecked={useFriendlyExchangeAllowlist}
                  onChange={(event) =>
                    setUseFriendlyExchangeAllowlist(event.target.checked)
                  }
                />
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">Add Friendly NFT Lending Platforms</Text>
              </Box>
              <Box>
                <Checkbox
                  size="lg"
                  defaultChecked
                  isChecked={useFriendlyLendingAllowlist}
                  onChange={(event) =>
                    setUseFriendlyLendingAllowlist(event.target.checked)
                  }
                />
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">Custom Allowlist</Text>
              </Box>
              <Box>
                <Textarea
                  w="350px"
                  h="150px"
                  placeholder="Insert comma separated addresses here. Example: 0xabcd,0xefgh,0xijkl"
                  size="lg"
                  value={customAllowlist}
                  onChange={(event) => setCustomAllowlist(event.target.value)}
                />
              </Box>
            </Flex>

            <Box w="100%" mt="10px">
              <Text fontSize="3xl" as="b">
                Holder Configuration
              </Text>
              {/* <Divider
                borderWidth="1px"
                mt="10px"
                style={{ borderBottom: "1px solid black" }}
              /> */}
            </Box>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl" as="b">
                  Rule
                </Text>
              </Box>
              <Box>
                <Text fontSize="xl" as="b">
                  Maximum Allowed NFTs
                </Text>
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">Arbitrary Holder</Text>
              </Box>
              <Box w="100px">
                <NumberInput
                  min={0}
                  max={20}
                  value={maxPerArbitraryHolder}
                  onChange={(_, valueAsNum) => {
                    setMaxPerArbitraryHolder(valueAsNum);
                    if (
                      maxPerWorldcoinHolder &&
                      maxPerWorldcoinHolder < valueAsNum
                    ) {
                      setMaxPerWorldcoinHolder(maxPerArbitraryHolder);
                    }

                    if (
                      maxPerChiraProtectCommunityMember &&
                      maxPerChiraProtectCommunityMember < valueAsNum
                    ) {
                      setMaxPerChiraProtectCommunityMember(
                        maxPerArbitraryHolder
                      );
                    }
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">Worldcoin Verified</Text>
              </Box>
              <Box w="100px">
                <NumberInput
                  min={maxPerArbitraryHolder}
                  max={20}
                  value={maxPerWorldcoinHolder}
                  onChange={(_, valueAsNum) =>
                    setMaxPerWorldcoinHolder(valueAsNum)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              gap="6"
              width="100%"
            >
              <Box>
                <Text fontSize="xl">Chira Protect Community Member</Text>
              </Box>
              <Box w="100px">
                <NumberInput
                  min={maxPerArbitraryHolder}
                  max={20}
                  value={maxPerChiraProtectCommunityMember}
                  onChange={(_, valueAsNum) =>
                    setMaxPerChiraProtectCommunityMember(valueAsNum)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Flex>

            {/* <Box w="100%">
              <Button colorScheme="blue">Add Rule</Button>
            </Box> */}

            <Box pt="40px" w="100%">
              <Button
                colorScheme="blue"
                w="200px"
                onClick={() => {
                  const protectConfig = {
                    collectionName: collectionName || "",
                    collectionAddress: collectionAddress || "",
                    useFriendlyExchangeAllowlist:
                      useFriendlyExchangeAllowlist || true,
                    useFriendlyLendingAllowlist:
                      useFriendlyLendingAllowlist || true,
                    customAllowlist: customAllowlist || "",
                    maxPerArbitraryHolder: maxPerArbitraryHolder || 0,
                    maxPerWorldcoinHolder: maxPerWorldcoinHolder || 0,
                    maxPerChiraProtectCommunityMember:
                      maxPerChiraProtectCommunityMember || 0,
                  };
                  // Update state
                  setGlobalState(globalState.concat(protectConfig));

                  onOpen();

                  // Add to ipfs
                  // TODO Revisit
                  // ipfs.add(Buffer.from(JSON.stringify(protectConfig)));

                  // Send transaction to create new blocklist

                  // Send transaction to reassign smart contract blocklist
                }}
              >
                Create
              </Button>
            </Box>
          </Flex>
        </Box>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <Progress size="xs" isIndeterminate />
            <ModalHeader>Protect a Collection</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              In order to finish protecting the collection, sign two
              transactions in order to:
              <OrderedList mt="10px" mb="30px">
                <ListItem>
                  Create the protect list smart contract which will protect your
                  NFT community from mercenaries.
                </ListItem>
                <ListItem>
                  Configure your NFT contract to use the protect list you
                  created!
                </ListItem>
              </OrderedList>
            </ModalBody>
            {/* <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
};

export default Home;
