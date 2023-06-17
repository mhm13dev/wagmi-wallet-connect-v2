import { configureChains, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { Config } from "@/config";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc],
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
  ],
});
