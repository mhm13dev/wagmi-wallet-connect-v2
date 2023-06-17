import { configureChains, createConfig } from "wagmi";
import { bsc, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { Config } from "@/config";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, sepolia],
  [publicProvider()]
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
    new WalletConnectConnector({
      chains,
      options: {
        projectId: Config.Blockchain.WALLET_CONNECT_PROJECT_ID,
        showQrModal: false,
      },
    }),
    // new WalletConnectLegacyConnector({
    //   chains,
    //   options: {
    //     qrcode: false,
    //   },
    // }),
  ],
});
