import { configureChains, createClient } from "wagmi";
import { mainnet } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { Config } from "@/config";

const supportedChains = [mainnet];

const { chains, provider } = configureChains(supportedChains, [
  publicProvider(),
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: Config.Blockchain.WALLET_CONNECT_PROJECT_ID,
        showQrModal: false,
      },
    }),
  ],
  provider,
});
