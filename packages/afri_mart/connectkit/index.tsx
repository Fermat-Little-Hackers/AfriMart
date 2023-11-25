"use client"

// wagmi but for starknet

import { Button } from "@/components/atomic/Button"
import { useAccount } from "@starknet-react/core";

export const ConnectButton = () => {
    const { address , account , status } = useAccount();
    if (status == undefined) {
        return(
            <Button>Connect</Button>
        )
    } else {
        return (
            <Button>Hello {address}</Button>
        )
    }
}