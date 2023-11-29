import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useYourContext } from "../../context/YourContext";
import marketplaceAbi from '../../ABI/marketPlace'
import { Account, Contract, Provider, constants, AccountInterface, ProviderInterface } from 'starknet'
import { MarketPlaceAddr } from '../../components/addresses';
import {type ConnectedStarknetWindowObject, connect, disconnect, } from '@argent/get-starknet'
import {EthAddr} from '../../components/addresses';
import { erc20abi } from '../../ABI/erc20.json'


interface IContributeBtn {
    cid: any,
    cycle_id: number,
    callBackFn: any
}

const ContributeBtn = (props: IContributeBtn) => {
    const { cid, callBackFn } = props
    const [loading, setLoading] = useState(false)
    // const { raw_collective, collective } = useCollectiveContext()
    // const { contract, account } = useAppContext()
  const [account, setAccount] = useState<ProviderInterface | AccountInterface | undefined>();


    // async function makeContribution() {
    //     if (contract) {
    //         setLoading(true)

    //         const collective_inputs = [cid, BigNumber(raw_collective.cycle_amount).toNumber()]
    //         const myCall = contract.populate('contribute', collective_inputs)
    //         contract.contribute(myCall.calldata).then((_res: any) => {
    // showNotification({
    //     title: "Success",
    //     message: "Contribution successful",
    //     color: "green",
    //     icon: <IconInfoCircle stroke={1.5} />
    // })
    // callBackFn && callBackFn()
    //         }).catch((_error: any) => {
    //             console.log("Error: ", _error)
    //             showNotification({
    //                 title: "Failed!!",
    //                 message: "Making contribution failed!",
    //                 color: "red",
    //                 icon: <IconAlertTriangle stroke={1.5} />
    //             })
    //         }).finally(() => {
    //             setLoading(false)
    //         })
    //     }
    // }

    // async function makeERC20Contribution() {
    //     if (account) {
    //         const ERC_ADDRESS = "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7"
    //         const ERC20contract = new Contract(ERC20_ABI, ERC_ADDRESS, account)
    //         const myCall = ERC20contract.populate('approve', [CONTRACT_ADDRESS, BigNumber(raw_collective.cycle_amount).multipliedBy(2).toNumber()])
    //         const res = await ERC20contract.approve(myCall.calldata)
    //         // makeContribution()

    //     }
    // }

    const interactWithBothERC20_and_CONTRACT = async () => {
        

    }
}

export default ContributeBtn