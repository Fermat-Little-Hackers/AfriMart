import { useEffect, useState } from 'react';
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet';
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../components/addresses';
import marketplaceAbi from '@/ABI/marketPlace';

export const useGetAllUserPurchase = () => {
  const [allPurchase, setAllPurchase] = useState<any[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const provider = new Provider({
        rpc: {
          nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
        },
      });

      try {
        const connection = await connect({ modalMode: 'neverAsk', webWalletUrl: 'https://web.argent.xyz' });
        const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
        const allPurchaseData = await contract.getProductsBoughtByUser(
          connection?.selectedAddress?.toString(),
          connection?.selectedAddress?.toString()
        );
        setAllPurchase([...allPurchaseData]);
        setLoading(false);
      } catch (error : any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { allPurchase, loading, error };
};


export const useGetOrder = async (args : any[]) =>{
    const [orderArray, setOrderArray] = useState<any[]>([])
    const [isloading, setLoading] = useState(true);
    const [iserror, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
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
            setOrderArray(results);
            // console.log(results)
            setLoading(false);
          } catch (error: any) {
            setError(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, [args]);    
    
        return { orderArray };
    
}


