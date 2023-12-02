import React, { useState, useEffect } from "react";
import {
  connect,
  type ConnectedStarknetWindowObject,
} from "@argent/get-starknet";
import contractAbi from "../../../ABI/supplyChainFactory.json";

import { FaShoppingCart, FaUser, FaBars, FaSearch } from "react-icons/fa";
import { CairoCustomEnum, CairoEnum, Contract, Provider } from "starknet";
import { SupplyChainFactoryAddr } from "@/components/addresses";
import { useAccountContext } from "@/context/connectionContext";

interface Item {
  id: number;
  name: string;
}

interface ItemStatus {
  OrderID: number;
  status: CairoCustomEnum;
}

const TrackAllItem = () => {
  const [allItems, setAllItems] = useState<any[]>();
  const [orderId, setOrderId] = useState();
  const [status, setStatus] = useState("");
  const { ShareAccount: account } = useAccountContext();

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

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl mx-20 my-10">
        {" "}
        Pending Deliveries
      </h3>
      <div className="space-y-4 p-5 md:p-20">
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
    </div>
  );
};

export default TrackAllItem;
