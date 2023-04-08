"use client";

import { WagmiConfig } from "wagmi";
import { wagmiClient } from "@/web3/wagmi/client";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
    </>
  );
};

export default Providers;
