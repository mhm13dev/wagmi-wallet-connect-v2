"use client";

import { useEffect, useMemo, useState } from "react";
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
import QRCode from "qrcode";

export default function ConnectWallet() {
  const { connectAsync, connectors, status, pendingConnector, reset } =
    useConnect();
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

  const walletConnectConnector = useMemo(() => {
    return connectors.find(
      (x) => x.id === "walletConnect" || x.id === "walletConnectLegacy"
    );
  }, [connectors]);
  const [uri, setUri] = useState<string>();
  const [qrCodeSvg, setQrCodeSvg] = useState<string>();

  useEffect(() => {
    if (uri) {
      QRCode.toString(uri, { type: "svg" })
        .then((svg) => {
          setQrCodeSvg(svg);
        })
        .catch((err) => {
          console.log("error generating qr code");
          console.log(err);
        });
    } else {
      setQrCodeSvg(undefined);
    }
  }, [uri]);

  useEffect(() => {
    if (!walletConnectConnector) return;
    const handleMessage = async ({ type, data }: any) => {
      console.log("WC Message Event");
      console.log({ type, data });

      if (walletConnectConnector.id === "walletConnectLegacy") {
        console.log("isWalletConnectLegacy");
        if (type === "connecting") {
          const p = await walletConnectConnector.getProvider();
          console.log(p.connector.uri);
          setUri(p.connector.uri);

          // User rejected, regenerate QR code
          p.connector.on("disconnect", () => {
            console.log("Disconnected");
            // connectWalletConnect(connector);
            setQrCodeSvg(undefined);
            setUri(undefined);
          });
        }
      } else if (type === "display_uri") {
        console.log(data);
        setUri(data);
      }
    };
    const handleChange = (e: any) => {
      console.log("WC Change Event");
      console.log(e);
    };
    const handleConnect = (e: any) => {
      console.log("WC Connect Event");
      console.log(e);
    };
    const handleDisconnect = () => {
      console.log("WC Disconnect Event");
    };
    const handleError = (e: any) => {
      console.log("WC Error Event");
      console.log(e);
    };

    walletConnectConnector.on("message", handleMessage);
    walletConnectConnector.on("change", handleChange);
    walletConnectConnector.on("connect", handleConnect);
    walletConnectConnector.on("disconnect", handleDisconnect);
    walletConnectConnector.on("error", handleError);

    return () => {
      walletConnectConnector.off("message", handleMessage);
      walletConnectConnector.off("change", handleChange);
      walletConnectConnector.off("connect", handleConnect);
      walletConnectConnector.off("disconnect", handleDisconnect);
      walletConnectConnector.off("error", handleError);
    };
  }, [walletConnectConnector]);

  console.log("status: ", status);

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
        <div className="space-y-4">
          {connectors.map((connector) => {
            return (
              <div key={connector.id}>
                <button
                  className="bg-slate-800 rounded px-2 py-1"
                  disabled={status === "loading"}
                  onClick={() => {
                    connectAsync({
                      connector,
                      chainId: 56,
                    })
                      .then((res) => {
                        console.log("res: Connected");
                        console.log(res);
                      })
                      .catch((err) => {
                        console.log("err");
                        console.dir(err);
                        reset();
                      });
                  }}
                >
                  Connect
                  {status === "loading" && pendingConnector?.id === connector.id
                    ? "ing"
                    : ""}{" "}
                  with {connector.name}
                </button>
              </div>
            );
          })}

          {(pendingConnector?.id === "walletConnect" ||
            pendingConnector?.id === "walletConnectLegacy") &&
            qrCodeSvg && (
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: qrCodeSvg.replace("<svg", `<svg class="w-64 h-64"`),
                  }}
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
