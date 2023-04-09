import { configureChains, createClient } from "wagmi";
import { bsc } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { Config } from "@/config";

const supportedChains = [bsc];

const { chains, provider, webSocketProvider } = configureChains(
  supportedChains,
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
    new CoinbaseWalletConnector({
      chains: [bsc],
      options: {
        appName: Config.APP_NAME,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
