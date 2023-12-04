import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Contract } from 'starknet'
import { connect, disconnect } from 'starknetkit'

import marketplaceAbi from "@/ABI/marketPlace";
import { MarketPlaceAddr, RattingAddr, SupplyChainFactoryAddr} from '../components/addresses';
import {  Provider} from 'starknet'
import rattingsContract from '@/ABI/rattingsContract.json';
import contractAbi from "@/ABI/supplyChainFactory.json";




const initialData = {
    contract: null as any,
    readContract: null as any,
    readReviewContract: null as any,
    factoryContractWrite: null as any,
    factoryContractRead: null as any,
    account: null as any,
    address: null as any,
    connection: null as any,
    handleConnetWalletBtnClick: null as any,
    handleDisconnectWalletBtnClick: null as any,
}

export const AppContext = createContext(initialData)

export const useAppContext = () => {
    return useContext(AppContext)
}

interface IAppProvider {
    children: ReactNode
}

const AppProvider = ({ children }: IAppProvider) => {

    const [contract, setContract] = useState<null | any>()
    const [readContract, setReadContract] = useState<null | any>()
    const [readReviewContract, setReadReviewContract] = useState<null | any>()
    const [factoryContractWrite, setfactoryContractWrite] = useState<null | any>()
    const [factoryContractRead, setfactoryContractRead] = useState<null | any>()
    const [connection, setConnection] = useState<null | any>();
    const [account, setAccount] = useState<null | any>();
    const [address, setAddress] = useState<null | any>("");
   

    async function switchNetwork(connection: any) {
        if (connection && connection.chainId !== "SN_GOERLI") {
            try {
                if (window.starknet) {
                    await window.starknet.request({
                        type: "wallet_addStarknetChain",
                        params: {
                            chainId: "SN_GOERLI"
                        }
                    })
                }

            } catch (error) {
                // alert("Please manually switch your wallet network to testnet and reload the page");
            }
        }
    }

    const connectWallet = async () => {
        const connection = await connect({
            webWalletUrl: "https://web.argent.xyz",
            dappName: "AfriMart",
        });

        if (connection && connection.isConnected) {
            setConnection(connection);
            setAccount(connection.account);
            setAddress(connection.selectedAddress);
        }

        switchNetwork(connection)
    };

    const disconnectWallet = async () => {
        await disconnect({ clearLastWallet: true });
        setConnection(null);
        setAccount(null);
        setAddress("");
    };



    const makeContractWriteConnection = () => {
        if (account) {
            const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), account)
            setContract(contract)
        }
    }

    const makeContractReadConnection = () =>{
        const provider = new Provider({
            rpc: {
              nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
            }
          })
            const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
            setReadContract(contract)
    }

    const makeContractReadReviewConnection = () => {
        const provider = new Provider({
            rpc: {
              nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
            }
          })
          const contract = new Contract(rattingsContract, RattingAddr(), provider);
          setReadReviewContract(contract)
    }

    const makeSupplyFactoryReadConnection = () =>{
        const provider = new Provider({
            rpc: {
              nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
            }
          })
          const contract = new Contract(contractAbi, SupplyChainFactoryAddr(), provider)
          setfactoryContractRead(contract)
    }

    const makeSupplyFactoryWriteConnection = () =>{
        if (account) {
            const contract = new Contract(contractAbi, SupplyChainFactoryAddr(), account)
            setfactoryContractWrite(contract)
        }
    }

    const handleConnetWalletBtnClick = () => {
        console.log("clicked connect wallet")
        if (!account) {
            connectWallet()
        }
        else {}
    }

    const handleDisconnectWalletBtnClick = () => {
        console.log("clicked connect wallet")
        if (account) {
            disconnectWallet()
        }
        else {}
    }


    const contextValue = useMemo(() => ({
        contract,
        readContract,
        readReviewContract,
        factoryContractWrite,
        factoryContractRead,
        account,
        address,
        connection,
        handleConnetWalletBtnClick,
        handleDisconnectWalletBtnClick
    }), [account, contract, address]);

    
    useEffect(() => {
        const connectToStarknet = async () => {
            const connection = await connect({
                modalMode: "neverAsk",
                webWalletUrl: "https://web.argent.xyz",
                dappName: "AfriMart",
            });

            if (connection && connection.isConnected) {
                setConnection(connection);
                setAccount(connection.account);
                setAddress(connection.selectedAddress);
            }
            switchNetwork(connection)

        };
        connectToStarknet();
    }, []);

    useEffect(() => {
        makeContractWriteConnection()
        makeContractReadConnection()
        makeContractReadReviewConnection()
        makeSupplyFactoryWriteConnection()
        makeSupplyFactoryReadConnection()
    }, [account, address])


    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
