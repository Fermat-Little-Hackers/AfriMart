"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo, useState } from "react";
import { Button } from "./ui/Button";
import WalletsToConnect from "./WalletConnectPopUp";
import { useYourContext } from "@/context/YourContext";

function WalletConnected() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div>
      <span>{shortenedAddress}</span>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}

function ConnectWallet() {
  const {wantToConnect, setWantToConnect} = useYourContext();

  return (
    <div>
      <div>
        <Button onClick={() => setWantToConnect(!wantToConnect)}>Connect Wallet</Button>
        {wantToConnect && (<WalletsToConnect />)}
      </div>
    </div>
  );
}


export default function WalletBar() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
