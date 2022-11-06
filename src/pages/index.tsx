import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import CallToActionWithIllustrationLoggedIn from "../components/HeroLoggedIn";
import CallToActionWithIllustrationLoggedOut from "../components/HeroLoggedOut";
// import styles from "../styles/Home.module.css";

// const NotConnectedInfo: NextPage = () => {
//   return (
//     <Flex
//       direction="row"
//       width="100%"
//       height="90%"
//       alignItems="center"
//       justifyContent="space-between"
//       padding="2rem"
//     >
//       <Flex
//         width="50%"
//         height="100%"
//         direction="column"
//         justifyContent="space-between"
//         gap="3rem"
//       >
//         <Heading>Welcome!</Heading>

//         <Text fontSize="2xl">
//           With Protect, you can protect your NFT communities from the predation
//           of mercenaries. Connect your wallet to get started 🚀
//         </Text>
//       </Flex>
//     </Flex>
//   );
// };

// const ConnectedInfo: NextPage = () => {
//   return (
//     <Flex
//       direction="row"
//       width="100%"
//       height="90%"
//       alignItems="center"
//       justifyContent="space-between"
//       padding="2rem"
//     >
//       <Flex
//         width="50%"
//         height="100%"
//         direction="column"
//         justifyContent="space-between"
//         gap="3rem"
//       >
//         <Heading>Welcome!</Heading>

//         <Text fontSize="2xl">
//           With Protect, you can protect your NFT communities from the predation
//           of mercenaries. It&apos;s easy to get started! Just click the {"'"}
//           Protect a Collection{"'"} button.
//         </Text>
//         {/* <OrderedList fontSize="2xl">
//           <ListItem mb="30px">
//             <Text>
//               Add your ERC5000 NFT collections using the sidebar. From there you
//               can apply blocklists to protect your NFT community from mercenary
//               wallets and contracts.
//             </Text>
//           </ListItem>
//           <ListItem>
//             <Text>
//               Create and customize protect lists using the sidebar. You can use
//               these protect lists to protect your NFT communities!
//             </Text>
//           </ListItem>
//         </OrderedList> */}
//       </Flex>
//     </Flex>
//   );
// };

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  const Body = () => {
    if (isConnected) {
      return <CallToActionWithIllustrationLoggedIn />;
    } else {
      return <CallToActionWithIllustrationLoggedOut />;
    }
  };

  return (
    <div>
      <Head>
        <title>Chira Protect</title>
        <meta
          name="description"
          content="Platform For Protecting Your NFT Community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Body />
      </main>
    </div>
  );
};

export default Home;

{
  /* <div className={styles.grid}>
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
        </div> */
}
