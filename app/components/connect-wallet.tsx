"use client";

import { useIsClient } from "usehooks-ts";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsName,
  useSwitchNetwork,
  useNetwork,
} from "wagmi";

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const disconnect = useDisconnect();
  const account = useAccount();
  const ens = useEnsName({
    address: account.address,
  });
  const { data: balance } = useBalance({ address: account.address });
  const { chain } = useNetwork();
  const { chains, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <div className="border max-w-3xl mx-auto rounded p-4 my-8">
      {account.isConnected ? (
        <div>
          <div>
            <span className="text-yellow-500 font-semibold">Connected to:</span>{" "}
            {ens.data ?? account.address}
          </div>
          <div>
            <span className="text-yellow-500 font-semibold">Balance:</span>{" "}
            {balance?.formatted ?? ""}
          </div>

          <div>
            <span className="text-yellow-500 font-semibold">Chain Name:</span>{" "}
            {chain && `${chain.name} - ${chain.id}`}
          </div>

          {chains.map((x) => (
            <div className="mt-4" key={x.id}>
              <button
                className="bg-slate-800 rounded px-2 py-1"
                disabled={!switchNetwork || x.id === chain?.id}
                onClick={() => switchNetwork?.(x.id)}
              >
                {x.name}
                {isLoading && pendingChainId === x.id && " (switching)"}
              </button>
            </div>
          ))}

          <div className="mt-4">
            <button
              className="bg-slate-800 rounded px-2 py-1"
              onClick={() => disconnect.disconnect()}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      ) : (
        connectors.map((connector) => {
          return (
            <div key={connector.id} className="mt-4">
              <button
                className="bg-slate-800 rounded px-2 py-1"
                onClick={() =>
                  connect({
                    connector,
                  })
                }
              >
                Connect with {connector.name}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
