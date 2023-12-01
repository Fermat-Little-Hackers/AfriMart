import useFetchURI from '../../../../hooks/useFetchURI'

interface listprops {
    title : string,
    amount : number,
    quantity : number,
    uri : string
}

const Soldcard  : React.FC<listprops> = ({ title, amount, quantity, uri})  => {
  const {data} = useFetchURI(uri)
  const trimmedUri = data?.image?.substring(7);
  return (
    <div className="w-[500px] mb-8 smx:w-[500%] flex justify-between smx:space-x-4 border-b border-black">
                <div className="h-[80px] p-4 smx:h-[100%] w-[20%] smx:w-[30%]">
                <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" />
                </div>
                <div>
                    <p className="smx:text-[15px]">{title}</p>
                    <p>Quantity: {quantity}</p>
                </div>
                <p className="h-[50px] mt-2 text-center text-2xl smx:text-[15px]">${amount}</p>
                <div className="h-[30px] smx:h-[20px] mt-2 w-[100px] border border-black rounded-2xl text-center smx:text-[10px] items-center">REVIEW</div>
        
        </div>
  )
}

export default Soldcard