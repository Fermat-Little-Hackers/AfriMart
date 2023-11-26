import React, { useState } from "react";
import { set } from "react-hook-form";

interface ClickProps {
  onClickAction: (massage: string) => void;
}

const SideFilter: React.FC<ClickProps> = ({ onClickAction }) => {
  const [isAllPurchases, setIsAllPurchases] = useState(true);
  const [isListedItem, setIsListedItem] = useState(false);
  const [isPendingDelivery, setIsPendingDelivery] = useState(false);
  const [isSoldItem, setIsSoldItem] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElementId = (event.target as HTMLDivElement).id;
    if (clickedElementId == "allPurchases") {
      onClickAction("All Purchases");
      setIsAllPurchases(true);
      setIsListedItem(false);
      setIsPendingDelivery(false);
      setIsSoldItem(false);
    }

    if (clickedElementId == "listedItems") {
      onClickAction("Listed Items");
      setIsAllPurchases(false);
      setIsListedItem(true);
      setIsPendingDelivery(false);
      setIsSoldItem(false);
    }

    if (clickedElementId == "pendingDelivery") {
      onClickAction("Pending Delivery");
      setIsAllPurchases(false);
      setIsListedItem(false);
      setIsPendingDelivery(true);
      setIsSoldItem(false);
    }

    if (clickedElementId == "soldItems") {
      onClickAction("Sold Items");
      setIsAllPurchases(false);
      setIsListedItem(false);
      setIsPendingDelivery(false);
      setIsSoldItem(true);
    }
  };

  return (
    <div className="border-2 border-black w-[300px] mt-6">
      <div>
        <div
          className="my-[41px] mx-auto w-[150px] hover:cursor-pointer"
          id="allPurchases"
          onClick={handleClick}
          style={{ color: isAllPurchases ? "grey" : "black" }}
        >
          All Purchases
        </div>

        <div
          className="my-[41px] mx-auto w-[150px] hover:cursor-pointer"
          id="listedItems"
          onClick={handleClick}
          style={{ color: isListedItem ? "grey" : "black" }}
        >
          Listed Items
        </div>

        <div
          className="my-[41px] mx-auto w-[150px] hover:cursor-pointer"
          id="pendingDelivery"
          onClick={handleClick}
          style={{ color: isPendingDelivery ? "grey" : "black" }}
        >
          Pending Delivery
        </div>

        <div
          className="my-[41px] mx-auto w-[150px] hover:cursor-pointer"
          id="soldItems"
          onClick={handleClick}
          style={{ color: isSoldItem ? "grey" : "black" }}
        >
          Sold Items
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
