import useFetchURI from '../../../../hooks/useFetchURI'

interface purchaseProps {
    title : string,
    amount : number,
    quantity : number
    uri : string
}

const Puchasecard : React.FC<purchaseProps> = ({ title, amount, quantity, uri})  => {
  const {data} = useFetchURI(uri)
  const trimmedUri = data?.image?.substring(7);
  return (
    <div className="w-[500px] mb-8 smx:w-[500%] shadow-lg md:pr-5 flex justify-between smx:space-x-2 border-b border-black">
            <div className="h-[80px] p-4 smx:h-[100%] w-[20%] smx:w-[30%] ">
            <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" className='w-full h-full object-cover'/>
            </div>
            <div>
                <p className="smx:text-[15px]">{title}</p>
                <div className=" smx:text-[12px] flex h-[30px] smx:h-[20px] smx:mb-2 w-[100px] smx:w-[80px] border justify-between items-center px-[10px] smx:p-[5px] border-black rounded-2xl">
                    <p>-</p>
                    <p>{quantity}</p>
                    <p>+</p>
                </div>
            </div>
            <p className="h-[50px] mt-2 text-center text-base smx:text-[15px]">{amount} ETH</p>
            <div className="h-[30px] smx:h-[20px] mt-2 w-[100px] border border-black rounded-2xl text-center smx:text-[10px] items-center md:text-base">REVIEW</div>
    </div>
  )
}

export default Puchasecard