interface listprops {
    title : string,
    amount : number,
    quantity : number
}

const Listcard : React.FC<listprops> = ({ title, amount, quantity}) => {
    return (
        <div className="w-[500px]   mb-8 smx:w-[500%] flex smx:space-x-4 border-b border-black">
                <div className="h-[80px] p-4 smx:h-[100%] w-[20%] smx:w-[30%] bg-gray-700"></div>
                <div>
                    <p className="smx:text-[15px]">{title}</p>
                    <p className="md:text-sm text-xs">Qty: {quantity}</p>
                </div>
                <p className="h-[50px] mt-2 text-center text-xl smx:text-[14px]">{amount.toFixed(5)}Eth</p>
                <div className="space-y-2">
                <div className="h-[30px] smx:h-[20px] mt-2 w-[50px] border border-black rounded-2xl text-center smx:text-[10px] items-center">EDIT</div>
                <div className="h-[30px] smx:h-[20px] mt-2 w-[50px] border border-black rounded-2xl text-center smx:text-[10px] items-center">REVIEW</div>
                </div>
        </div>)
}

export default Listcard