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
        <div className="w-[500px]   mb-8 smx:w-[500%] justify-between flex smx:space-x-4 border-b border-black">
                <div className="h-[100%] p-4 smx:h-[100%] w-[20%] smx:w-[30%]" >
               <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" />
                </div>
                <div className='items-center h-[100%] my-auto'>
                    <p className="smx:text-[15px]">{title}</p>
                    <p className="md:text-sm text-xs">Qty: {quantity}</p>
                </div>
                <p className="mt-2 text-center text-[15px] smx:text-[14px] items-center h-[100%] my-auto">{amount.toFixed(5)}Eth</p>
                <div className="space-y-2 flex items-center">
                <div className="h-[30px] smx:h-[20px] mt-2 w-[100px] border border-black rounded-2xl text-center smx:text-[10px] items-center">EDIT</div>
                {/* <div className="h-[30px] smx:h-[20px] mt-2 w-[100px] border border-black rounded-2xl text-center smx:text-[10px] items-center">REVIEW</div> */}
                </div>
        </div>)
}

export default Listcard