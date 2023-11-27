"use client"

// wagmi but for starknet

import { useAccount } from "@starknet-react/core";
import { type ConnectOptions, type DisconnectOptions, connect, disconnect , } from "get-starknet"
import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { AccountInterface, ProviderInterface } from "starknet";


function handleConnect(options?: ConnectOptions) {
    return async () => {
        const res = await connect(options);

    };
}

export interface ConnectConfig {
    provider: ProviderInterface,
    account?: AccountInterface,
    setAccount?: Dispatch<SetStateAction<AccountInterface>>,
    address?: string,
    isConnected?: boolean,
    setIsConnected?: Dispatch<SetStateAction<boolean>>
}

const ConnectkitContext = createContext<ConnectConfig | undefined>(undefined);
export const ConnectkitProvider = ({children, config }: {children: ReactNode, config: ConnectConfig}) => {
    return(
        <ConnectkitContext.Provider value={config}>
            {children}
        </ConnectkitContext.Provider>
    )
}

export const ConnectButton = () => {
    const [provider, setProvider] = useState();
    const [account, setAccount] = useState();
    const [connection, setConnection] = useState();
    const [isConnected, setIsConnected] = useState<boolean>();
    const [address, setAddress] = useState();
    


    function handleDisconnect(options?: DisconnectOptions) {
        return async () => {
            await disconnect();
            setConnection(undefined);
            setAccount(undefined);
            setAddress(undefined);
            setIsConnected(false);
        };
    }
    if (isConnected) {
        return <ConnectedWalletButton />
    }  else return  <DisconnectedWalletButton />
    
}    
    
const DisconnectedWalletButton = () => {
    return(
        <button 
        className={clsx(
            "rounded-md bg-white text-slate-900 py-2 px-4 h-max"
        )}
            onClick={handleConnect({ modalMode: "alwaysAsk" })}
        >Connect Button -&gt;</button>
    )
}

const ConnectedWalletButton = () => {
        return(
            <button 
            onClick={handleDisconnect()}
            className={clsx(
                "rounded-md bg-white text-slate-900 py-2 px-4 h-max"
            )}></button>
    )
}
