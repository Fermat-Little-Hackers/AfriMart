import AllPurchases from "./AllPurchases";
import ListedItems from "./ListedItems";
import PendingDelivery from "./PendingDelivery";
import SoldItems from "./SoldItems";
import { FaShoppingCart, FaUser, FaBars, FaSearch, FaPlus } from 'react-icons/fa';
import {useListProductContext} from '../../../context/listProductContext'
import ListProductForm from "./ListProductForm";

interface prop {
    title : string;
}
const Content  : React.FC<prop> = ({ title}) => {
  const { sharedState, setSharedState } = useListProductContext();

  const handleListProduct = () => {
    setSharedState(true);
  }


  return (
    <div className="mt-12 shadow-lg rounded-lg ring-1 ring-red-100 h-[80%] smx:mt-4 p-4 gap-4">
          <div className="w-[70%]  lg:w-[95%] smx:w-[93%] mx-auto text-2xl mt-2 ml-2 smx:ml-2 flex flex-row justify-between">
                <p>
                {title}
                </p> 
                {title == 'Listed Items' ? (<button
              type="button"
              className=' bg-[var(--sienna)] text-white px-2 md:px-4 py-2 rounded-lg flex items-center text-sm'
              onClick={handleListProduct}
            >
              <FaPlus className="mr-2" /> List Item
            </button>) : ''}
        </div>
       {title == "All Purchases" && <AllPurchases />}
       {title == "Listed Items" && <ListedItems />}
       {title == "Pending Delivery" && <PendingDelivery />}
       {title == "Sold Items" && <SoldItems />}

      {sharedState && (<ListProductForm />)}
    </div>
  )
}

export default Content