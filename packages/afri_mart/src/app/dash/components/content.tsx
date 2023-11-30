import AllPurchases from "./AllPurchases";
import ListedItems from "./ListedItems";
import PendingDelivery from "./PendingDelivery";
import SoldItems from "./SoldItems";
interface prop {
    title : string;
}
const Content  : React.FC<prop> = ({ title}) => {
  return (
    <div className="border-2 border-black h-[80%] mt-20 smx:mt-4">
          <div className="w-[80%] smx:w-[100%] mx-auto text-2xl mt-2 ml-2 smx:ml-2">
                <p>
                {title}
                </p>                    
        </div>
       {title == "All Purchases" && <AllPurchases />}
       {title == "Listed Items" && <ListedItems />}
       {title == "Pending Delivery" && <PendingDelivery />}
       {title == "Sold Items" && <SoldItems />}
    </div>
  )
}

export default Content