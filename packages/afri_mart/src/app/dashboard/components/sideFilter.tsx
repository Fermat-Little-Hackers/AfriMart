import React, { useState } from "react";
import { set } from "react-hook-form";

interface ClickProps {
  onClickAction: (massage: string) => void;
}

const SideFilter: React.FC<ClickProps> = ({ onClickAction }) => {
  const [isAllPurchases, setIsAllPurchases] = useState(true);
  const [isListedItem, setIsListedItem] = useState(true);
  const [isPendingDelivery, setIsPendingDelivery] = useState(true);
  const [isSoldItem, setIsSoldItem] = useState(true);

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
      onClickAction("All Purchases");
      setIsAllPurchases(false);
      setIsListedItem(true);
      setIsPendingDelivery(false);
      setIsSoldItem(false);
    }

    if (clickedElementId == "pendingDelivery") {
      onClickAction("All Purchases");
      setIsAllPurchases(false);
      setIsListedItem(false);
      setIsPendingDelivery(true);
      setIsSoldItem(false);
    }

    if (clickedElementId == "soldItems") {
      onClickAction("All Purchases");
      setIsAllPurchases(false);
      setIsListedItem(false);
      setIsPendingDelivery(false);
      setIsSoldItem(true);
    }
  };

  return (
    <div>
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
