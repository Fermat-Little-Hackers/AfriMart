import React, { useState } from "react";
import { set } from "react-hook-form";
import clsx from 'clsx';

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

  const commonstyle = "w-[200px] cursor-pointer h-full p-2 bg-[var(--sand)] rounded-lg smx:hidden lmx:hidden ";

  return (
    <div className="mt-12">
    <div>
        <div
          className={clsx(commonstyle,)}
          id="allPurchases"
          onClick={handleClick}
          style={{ color: isAllPurchases ? "grey" : "black" }}
        >
          All Purchases
        </div>

        
    <div 
          className={clsx(commonstyle)}
          id="listedItems"
          onClick={handleClick}
          style={{ color: isListedItem ? "grey" : "black" }}
        >
          Listed Items
        </div>

        <div
          className={clsx(commonstyle)}
          id="pendingDelivery"
          onClick={handleClick}
          style={{ color: isPendingDelivery ? "grey" : "black" }}
        >
          Pending Delivery
        </div>

        <div
          className={clsx(commonstyle)}
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
