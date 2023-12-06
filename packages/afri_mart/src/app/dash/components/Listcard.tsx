import useFetchURI from '../../../../hooks/useFetchURI'

interface listprops {
    title : string,
    amount : number,
    quantity : number,
    uri : string
}

const Listcard : React.FC<listprops> = ({ title, amount, quantity, uri}) => {
    const {data} = useFetchURI(uri)
    const trimmedUri = data?.image?.substring(7);
    
    return (
        <div className="w-[500px]   mb-8 smx:w-[500%] justify-between flex smx:space-x-4  ring-1 ring-[var(--terracota)] p-2 rounded-lg">
                <div className="h-[100%] smx:h-[100%] w-[20%] smx:w-[30%]" >
               <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='items-center h-[100%] my-auto'>
                    <p className="smx:text-[15px]">{data?.name}</p>
                    <p className="md:text-sm text-xs">Qty: {quantity}</p>
                </div>
                <p className="text-base smx:text-[14px] items-center h-[100%] my-auto">{amount.toFixed(5)}Eth</p>
                <div className="space-y-2">
                    <div className='items-center my-[50%]'>
                <button className=' bg-[var(--sienna)] my-auto text-white px-2 md:px-4 py-2 rounded-lg flex items-center text-sm text-center'>EDIT</button>
                    </div>
                </div>
        </div>)
}

export default Listcard