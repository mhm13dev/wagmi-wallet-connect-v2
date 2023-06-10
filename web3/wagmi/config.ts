import { configureChains, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { Config } from "@/config";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc],
  [
    infuraProvider({
      apiKey: Config.Blockchain.INFURA_API_KEY,
    }),
    publicProvider(),
  ]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: Config.APP_NAME,
        headlessMode: true,
      },
    }),
    // NOT Using WalletConnectConnector (V2) because it does not have good wallet support
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: Config.Blockchain.WALLET_CONNECT_PROJECT_ID,
    //     showQrModal: false,
    //   },
    // }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: false,
      },
    }),
  ],
});
