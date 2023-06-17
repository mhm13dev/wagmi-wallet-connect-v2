"use client";

import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { parseEther } from "viem";
import { CustomConnect } from "@/components/custom-connect-button";
import { Config } from "@/config";

export default function Home() {
  const isClient = useIsClient();
  const [amount, setAmount] = useState("");
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { config } = usePrepareSendTransaction({
    to: Config.PRODUCTION_ASSETS_WALLET,
    value: parseEther(amount as `${number}`),
    data: "0x",
  });
  const sendTrx = useSendTransaction(config);
  const trxWait = useWaitForTransaction({
    hash: sendTrx.data?.hash,
  });

  const isChainSupported = chain?.id
    ? Config.Blockchain.SUPPORTED_CHAIN_IDS.includes(chain.id)
    : false;

  useEffect(() => {
    console.log("sendTrx");
    console.dir(sendTrx);
  }, [sendTrx]);

  useEffect(() => {
    console.log("trxWait");
    console.dir(trxWait);
  }, [trxWait]);

  useEffect(() => {
    console.log("chain");
    console.dir(chain);
  }, [chain]);

  const handleSendTrx = async () => {
    if (!sendTrx.sendTransactionAsync) return;
    try {
      const result = await sendTrx.sendTransactionAsync();
      console.log("handleSendTrx---result");
      console.dir(result);
    } catch (error) {
      console.log("handleSendTrx---error");
      console.dir(error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-8">
      <h1>Home</h1>
      <CustomConnect />
      {isChainSupported && isConnected && (
        <div className="mt-4 space-y-2">
          <input
            type="number"
            className="block max-w-md w-full border text-base p-2 focus:outline-none rounded-md"
            value={amount}
            onChange={(e) => {
              try {
                setAmount(isNaN(Number(e.target.value)) ? "0" : e.target.value);
              } catch {
                setAmount("0");
              }
            }}
          />
          <button
            onClick={handleSendTrx}
            className="border px-4 py-1.5 rounded-md block"
          >
            Send {chain?.nativeCurrency.symbol}
          </button>

          {sendTrx.data?.hash && (
            <a
              className="block break-words text-green-500"
              href={
                chain?.blockExplorers?.default.url + "/tx/" + sendTrx.data.hash
              }
              target="_blank"
            >
              View on {chain?.blockExplorers?.default.name} -{" "}
              {sendTrx.data?.hash.slice(0, 6) +
                "..." +
                sendTrx.data?.hash.slice(-4)}
            </a>
          )}
        </div>
      )}

      {!isChainSupported && isConnected && (
        <div className="mt-4 space-y-2">
          <p className="text-red-500">
            This chain is not supported by this dApp.
          </p>

          <button
            onClick={() => {
              if (!switchNetworkAsync) return;
              try {
                switchNetworkAsync(Config.Blockchain.SUPPORTED_CHAIN_IDS[0]);
              } catch (e) {
                console.log("switchNetworkAsync---error");
                console.dir(e);
              }
            }}
            className="border px-4 py-1.5 rounded-md block"
          >
            Switch Network
          </button>
        </div>
      )}
    </div>
  );
}
