import { Flex, Heading, ListItem, OrderedList, Text } from "@chakra-ui/layout";
import { BigNumber } from "@ethersproject/bignumber";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount, useSendTransaction } from "wagmi";
import styles from "../styles/Home.module.css";

const NotConnectedInfo: NextPage = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      height="90%"
      alignItems="center"
      justifyContent="space-between"
      padding="2rem"
    >
      <Flex
        width="50%"
        height="100%"
        direction="column"
        justifyContent="space-between"
        gap="3rem"
      >
        <Heading>Welcome!</Heading>

        <Text>
          With Protect, you can protect your NFT communities from the predation
          of mercenaries. Connect your wallet to get started 🚀
        </Text>
      </Flex>
    </Flex>
  );
};

const ConnectedInfo: NextPage = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      height="90%"
      alignItems="center"
      justifyContent="space-between"
      padding="2rem"
    >
      <Flex
        width="50%"
        height="100%"
        direction="column"
        justifyContent="space-between"
        gap="3rem"
      >
        <Heading>Welcome!</Heading>

        <Text>
          With Protect, you can protect your NFT communities from the predation
          of mercenaries. It&apos;s easy to get started! There are two main
          resouces to be aware of:
        </Text>
        <OrderedList>
          <ListItem>
            Add your ERC5000 NFT collections using the sidebar. From there you
            can apply blocklists to protect your NFT community from mercenary
            wallets and contracts.
          </ListItem>
          <ListItem>
            Create and customize protect lists using the sidebar. You can use
            these protect lists to protect your NFT communities!
          </ListItem>
        </OrderedList>
      </Flex>
    </Flex>
  );
};

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } =
    useSendTransaction({
      request: {
        to: "yanniksood.eth",
        value: BigNumber.from("10000000000000000"), // .1 ETH
      },
    });

  return (
    <div className={styles.container}>
      <Head>
        <title>Chira Protect</title>
        <meta
          name="description"
          content="Platform For Protecting Your NFT Community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isConnected ? <ConnectedInfo /> : <NotConnectedInfo />}

        {/* <div className={styles.grid}>
          <Link href="https://twitter.com/yanniksood" isExternal>
            <Button
              backgroundColor="#BB86FC"
              borderRadius="25px"
              margin={2.5}
              _hover={{
                bg: "#121212",
              }}
              _active={{
                bg: "#121212",
              }}
            >
              <p>Follow me on twitter</p>
            </Button>
          </Link>

          <Button
            backgroundColor="#32CD32"
            borderRadius="25px"
            margin={2.5}
            _hover={{
              bg: "#121212",
            }}
            _active={{
              bg: "#121212",
            }}
            onClick={() => sendTransaction()}
          >
            <p>Donate some ETH</p>
          </Button>
        </div> */}
      </main>
    </div>
  );
};

export default Home;
