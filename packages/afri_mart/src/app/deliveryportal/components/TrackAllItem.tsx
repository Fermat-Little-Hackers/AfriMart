import React, { useState, useEffect } from "react";
import {
  connect,
  type ConnectedStarknetWindowObject,
} from "@argent/get-starknet";
import contractAbi from "../../../ABI/supplyChainFactory.json";

import { FaShoppingCart, FaUser, FaBars, FaSearch } from "react-icons/fa";
import { CairoCustomEnum, CairoEnum, Contract, Provider } from "starknet";
import { SupplyChainFactoryAddr } from "@/components/addresses";

interface Item {
  id: number;
  name: string;
}

interface ItemStatus {
  OrderID: number;
  status: CairoCustomEnum;
}

const TrackAllItem = () => {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");
  const [allItems, setAllItems] = useState<any[]>();
  const [orderId, setOrderId] = useState();
  const [status, setStatus] = useState("");

  function hexToReadableText(hexString: any): string {
    const bytes = Buffer.from(hexString, "hex");
    const text = new TextDecoder("utf-8").decode(bytes);
    return text;
  }

  interface ItemStatus {
    OrderID: number;
    status: CairoCustomEnum;
  }

  const itemStats = async () => {
    const provider = new Provider({
      rpc: {
        nodeUrl:
          "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx",
      },
    });
    try {
      const contract = new Contract(
        contractAbi,
        SupplyChainFactoryAddr(),
        provider
      );
      let itemsStatus = await contract.trackAllItems();
      setAllItems(itemsStatus);
      console.log(itemsStatus[0].OrderID);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    itemStats();
  }, []);

  useEffect(() => {
    const connectToStarknet = async () => {
      const connection = await connect({
        modalMode: "neverAsk",
        webWalletUrl: "https://web.argent.xyz",
      });

      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }

      // if (connection?.chainId !== "SN_GOERLI") {
      //   alert("you need to switch to GOERLI to proceed!");
      //   try {
      //     await window?.starknet?.request({
      //       type: "wallet_switchStarknetChain",
      //       params: {
      //         chainId: "SN_GOERLI",
      //       },
      //     });
      //   } catch (error: any) {
      //     alert(error.message);
      //   }
      // }
    };
    connectToStarknet();
  }, []);

  return (
    <div className="">
      <h3 className="mb-7 text-xl md:text-2xl"> Pending Deliveries</h3>
      <table>
        <thead>
          <th>Order Id</th>
          <th>Status</th>
        </thead>
      {/* <div className="flex flex-col items-center border-2 border-black"> */}
        {/* <div>{orderId}</div>
        <div>{status}</div> */}
        {allItems?.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.OrderID.toString()}</td>
              <td>{item.status.activeVariant()}</td>
            </tr>
          );
        })}
      {/* </div> */}
      </table>
    </div>
  );
};

export default TrackAllItem;
