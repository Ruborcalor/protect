import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

import { useEffect, useState } from "react";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { GlobalProvider } from "../components/common/globalState";
import { Page } from "../components/Page";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  //This is currently using the public alchemy ID. Please add your own to avoid being rate limited
  //Docs can be found here: https://wagmi.sh/docs/providers/alchemy
  const { chains, provider } = configureChains(
    [chain.polygonMumbai, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [alchemyProvider(), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Eth Next.js Boilerplate",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const [globalState, setGlobalState] = useState([]);

  useEffect(() => {
    const localGlobal = localStorage.getItem("global-state");
    if (localGlobal && JSON.parse(localGlobal)) {
      setGlobalState(JSON.parse(localGlobal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("global-state", JSON.stringify(globalState));
  }, [globalState]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <GlobalProvider value={{ globalState, setGlobalState }}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </GlobalProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
