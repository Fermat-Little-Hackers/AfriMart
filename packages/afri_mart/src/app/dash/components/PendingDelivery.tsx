import {useState,useEffect} from "react";
import Pop from "./Pop";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";

const PendingDelivery = () => {
  const [allPendingdelivery, setAllpendingDelivery] = useState<any[]>([])
  const [allProductPendingArray, setAllproductPendingArray] = useState<any[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isname, setIsname] = useState('');
  const [isorder, setIsorder] = useState(0);
  const [isquantity, setisquantity] = useState(0);
  const [isamount, setIsamount] = useState(0);

  
  const processdelivered = async (orderID : number) => {
      try {
      const connection = await connect({ modalMode: 'neverAsk', webWalletUrl: 'https://web.argent.xyz' });
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), connection?.account);
      await contract.beginProcessingDelivery(orderID);
      alert("Delivery Confirmed")
      } catch (error : any) {
        console.log(error.message)
      }
  }
  
  const getAllpendingDeliveryItem = async () => {
    const provider = new Provider({
      rpc: {
        nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
      },
    });

    try {
      const connection = await connect({ modalMode: 'neverAsk', webWalletUrl: 'https://web.argent.xyz' });
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
      const allPendingData = await contract.getPendingDelivery(
        connection?.selectedAddress?.toString()
      );
      setAllpendingDelivery([...allPendingData]);
    } catch (error : any) {
  };
}

const GetOrder = async (args : any[]) => {
  const provider = new Provider({
    rpc: {
      nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
    },
  });

  try {
    const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);  
    const promises = args.map(async (orderId) => {
      let nextId = await contract.getOrderDetails(orderId.toString());
      return Number(nextId.itemID);
    });
    const results = await Promise.all(promises);
    return results
  } catch (error: any) {}
};

const GetItem = async (args : number[] | undefined) => {
  const provider = new Provider({
    rpc: {
      nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
    },
  });

  try {
    const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);  
    //@ts-ignore
    const promises = args.map(async (productId) => {
      let productdetail = await contract.getProductDetails(productId.toString());
      return productdetail;
    });
    const results = await Promise.all(promises);
    return results
  } catch (error: any) {}
};
  

  const setPopup = (name : string, id : number, total : number, payment : number) => {
    setIsname(name);
    setIsorder(id);
    setisquantity(total);
    setIsamount(payment);
    togglepop();
  };
  const togglepop = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    getAllpendingDeliveryItem()
  }, [])
  
    useEffect(() => {
      if(allPendingdelivery.length > 0){
        GetOrder(allPendingdelivery).then((orderidsArray)=>{
          GetItem(orderidsArray).then((products)=>{
            console.log('products obtained array',products)
            //@ts-ignore
            setAllproductPendingArray(products)
          })
        }).catch((error)=>{
            console.log(error)
        })
      }
    }, [allPendingdelivery]); 
    
    function hexToReadableText(hexString : any) {
      const bytes = Buffer.from(hexString, 'hex'); 
      const text = new TextDecoder('utf-8').decode(bytes);
      return text;
    }

  return <div className="smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[100%] smx:w-[80%] lmx:w-[90%] h-[80%] p-6 mt-2"> 
      <table className="smx:hidden" style={{ width: '100%' }}>
      <tr>
      <th>SN</th>
      <th>Product Name</th>
      <th>Order ID</th>
      <th>Quantity</th>
      <th>Amount</th>
      </tr>
    
    <div className=" h-56 overflow-y-auto scrollbar">
    {allProductPendingArray?.map((item, index) => {
      let productname =  hexToReadableText(item.name.toString(16)) 
       let productprice = Number(item.price)/1e18
     return <tr key={index} className="smx:hidden ">
        <td>{index + 1}</td>
        <td>{productname}</td>
        <td>{Number(item.id)}</td>
        <td>{Number(item.totalSales)}</td>
        <td>${productprice} ETH</td>
        <td><button className="border-2 border-black p-2 rounded-md" onClick={()=>{processdelivered(Number(item.id))}}>Confirm Delivery</button></td>
        </tr>
      
    })}
    </div>
    </table>
    <div>
      {allProductPendingArray?.map((item, index) =>{ 
        let productname =  hexToReadableText(item.name.toString(16)) 
        let orderid = Number(item.id);
        let quantity = Number(item.totalSales);
       let productprice = Number(item.price)/1e18
       return  <div key={index} className="hidden smx:flex smx:justify-between">
            <p>{index + 1}</p>
            <p>{productname}</p>
            <div className="hover:cursor-pointer" onClick={() => setPopup(productname, orderid,quantity,productprice)}>Details</div>
        </div>
        })}

    </div>
    <Pop isOpen={isOpen} onClose={togglepop} name={isname} orderid={isorder} quantity={isquantity} amount={isamount} />
  </div>;
};

export default PendingDelivery;
