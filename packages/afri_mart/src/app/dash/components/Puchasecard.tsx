import Link from 'next/link'
import useFetchURI from '../../../../hooks/useFetchURI'

interface purchaseProps {
  title: string,
  amount: number,
  quantity: number
  uri: string,
  item_id: number
}

const Puchasecard: React.FC<purchaseProps> = ({ title, amount, uri, item_id }) => {
  const { data } = useFetchURI(uri)
  const trimmedUri = data?.image?.substring(7);
  return (
    <div className="w-[500px] mb-8 smx:w-[500%] flex justify-between smx:space-x-2 ring-1 ring-[var(--terracota)] p-2 rounded-lg">
      <Link href={{ pathname: '/deliveryportal', query: `${item_id}` }} as={'/deliveryportal#track-portal'} className='flex flex-row justify-between pr-8 my-auto'>
        <div className="h-[100%] smx:h-[100%] w-[20%] smx:w-[30%] ">
          <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" className='w-full h-full object-cover' />
        </div>
        <div className='items-center h-[100%] my-auto'>
          <p className="smx:text-[15px]">{title}</p>
        </div>
        <div className='my-auto items-center h-[100%]'>
          <p className="smx:text-[15px]">{amount} ETH</p>
        </div>
      </Link>
      <button className=' bg-[var(--sienna)] my-auto text-white px-2 md:px-4 py-2 rounded-lg flex items-center text-sm text-center'>REVIEW</button>
    </div>
  )
}

export default Puchasecard