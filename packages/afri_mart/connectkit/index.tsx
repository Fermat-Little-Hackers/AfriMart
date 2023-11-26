"use client"

// wagmi but for starknet

import { Button } from "@/components/atomic/Button"
import { useAccount } from "@starknet-react/core";

export const ConnectButton = () => {
    const { address , account , status } = useAccount();
    if (status == 'disconnected') return <DisconnectedWalletButton />
    else return  <ConnectedWalletButton />
    
}    
    
export const DisconnectedWalletButton = () => {
    return(
        <Button>Connect</Button>
    )
}
export const ConnectedWalletButton = () => {
    return(
        <Button>Connect</Button>
    )
}