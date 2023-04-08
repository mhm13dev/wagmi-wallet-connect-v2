import { configureChains, createClient } from "wagmi";
import { mainnet, goerli, bsc } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { Config } from "@/config";

const { chains, provider, webSocketProvider } = configureChains(
  [bsc, mainnet, goerli],
  [
    infuraProvider({
      apiKey: Config.Blockchain.INFURA_API_KEY,
    }),
    publicProvider(),
  ]
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: Config.Blockchain.WALLET_CONNECT_PROJECT_ID,
      },
    }),
    new CoinbaseWalletConnector({
      chains: [bsc, mainnet, goerli],
      options: {
        appName: Config.APP_NAME,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
