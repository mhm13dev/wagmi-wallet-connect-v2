"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useIsClient } from "usehooks-ts";

export const CustomConnect = () => {
  const { isConnected, address } = useAccount();
  const { reset } = useConnect();
  const { disconnect } = useDisconnect();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <button className="border px-4 py-1.5 rounded-md">Loading...</button>
    );
  }

  return !isConnected ? (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <button onClick={show} className="border px-4 py-1.5 rounded-md">
            Connect Wallet
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  ) : (
    <button
      onClick={() => {
        disconnect();
        reset();
      }}
      className="border px-4 py-1.5 rounded-md"
    >
      {address} - Disconnect
    </button>
  );
};
