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
    <div className="mt-12 smx:hidden flex shadow-lg rounded-lg cursor-pointer ring-1 ring-red-100  w-[400px] smx:w-[100%] smx:mx-auto p-4 md:pr-0 gap-4 border-r-8 border-[var(--sienna)]">
      <div className="flex flex-col gap-4 w-[100%]">
        <div
          // className={clsx(commonstyle,)}
          className={''}
          id="allPurchases"
          onClick={handleClick}
          style={{ color: isAllPurchases ? "white" : "black", backgroundColor: isAllPurchases ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isAllPurchases ? '1.5rem': '' }}
        >
          All Purchases
        </div>


        <div
          // className={clsx(commonstyle)}
          className={''}
          id="listedItems"
          onClick={handleClick}
          style={{ color: isListedItem ? "white" : "black", backgroundColor: isListedItem ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isListedItem ? '1.5rem': ''}}
        >
          Listed Items
        </div>

        <div
          // className={clsx(commonstyle)}
          className={''}
          id="pendingDelivery"
          onClick={handleClick}
          style={{ color: isPendingDelivery ? "white" : "black", backgroundColor: isPendingDelivery ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isPendingDelivery ? '1.5rem': ''}}
        >
          Pending Delivery
        </div>

        <div
          // className={clsx(commonstyle)}
          className={''}
          id="soldItems"
          onClick={handleClick}
          style={{ color: isSoldItem ? "white" : "black", backgroundColor: isSoldItem ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: isSoldItem ? '1.5rem': ''}}
        >
          Sold Items
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
