import { configureChains, createConfig } from "wagmi";
import { bsc, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { Config } from "@/config";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, mainnet],
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
    new WalletConnectConnector({
      chains,
      options: {
        projectId: Config.Blockchain.WALLET_CONNECT_PROJECT_ID,
        showQrModal: false,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: Config.APP_NAME,
        headlessMode: true,
      },
    }),
  ],
});
