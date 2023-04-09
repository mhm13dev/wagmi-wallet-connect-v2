"use client";

import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { wagmiClient } from "@/web3/wagmi/client";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </>
  );
};

export default Providers;
