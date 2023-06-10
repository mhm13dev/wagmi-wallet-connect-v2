"use client";

import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { wagmiConfig } from "@/web3/wagmi/config";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </>
  );
};

export default Providers;
