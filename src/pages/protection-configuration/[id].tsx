import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { create } from "ipfs-http-client";

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../components/common/globalState";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { globalState, setGlobalState } = useGlobalContext()!;

  const protectionConfig = globalState.find(
    (config) => config.collectionAddress == id
  );

  console.log(protectionConfig);

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

  const ipfs = create();

  useEffect(() => {
    if (protectionConfig) {
      setCollectionName(protectionConfig!.collectionName);
      setCollectionAddress(protectionConfig!.collectionAddress);

      setUseFriendlyExchangeAllowlist(
        protectionConfig!.useFriendlyExchangeAllowlist
      );
      setUseFriendlyLendingAllowlist(
        protectionConfig!.useFriendlyLendingAllowlist
      );
      setCustomAllowlist(protectionConfig!.customAllowlist);

      setMaxPerArbitraryHolder(protectionConfig!.maxPerArbitraryHolder);
      setMaxPerWorldcoinHolder(protectionConfig!.maxPerWorldcoinHolder);
    }
  }, [protectionConfig]);

  return (
    <div className={styles.container}>
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
              <Divider borderWidth="2px" mt="10px" />
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
              <Divider borderWidth="2px" mt="10px" />
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
              <Divider borderWidth="2px" mt="10px" />
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

                    if (maxPerChiraProtectCommunityMember < valueAsNum) {
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

                  // Add to ipfs
                  // TODO Revisit
                  // ipfs.add(Buffer.from(JSON.stringify(protectConfig)));
                }}
              >
                Create
              </Button>
            </Box>
          </Flex>
        </Box>
      </main>
    </div>
  );
};

export default Home;
