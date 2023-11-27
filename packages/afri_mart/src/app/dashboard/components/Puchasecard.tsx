
interface purchaseProps {
    title : string,
    amount : number,
    quantity : number
}

const Puchasecard : React.FC<purchaseProps> = ({ title, amount, quantity})  => {
  return (
    <div className="w-[500px] smx:w-[500%] h-[100px] mt-10 flex space-x-10 smx:space-x-2 border-b border-black">
            <div className="h-[60%] smx:h-[100%] w-[20%] smx:w-[60%] smx:w-[30%] bg-gray-700"></div>
            <div>
                <p>{title}</p>
                <div className="flex h-[30px] w-[100px] smx:w-[80px] border justify-between items-center px-[10px] smx:p-[5px] border-black rounded-2xl">
                    <p>-</p>
                    <p>{quantity}</p>
                    <p>+</p>
                </div>
            </div>
            <p className="h-[50px] mt-2 text-center text-2xl smx:text-[20px]">${amount}</p>
            <div className="h-[30px] mt-2 w-[100px] border border-black rounded-2xl text-center items-center">REVIEW</div>
    </div>
  )
}

export default Puchasecard