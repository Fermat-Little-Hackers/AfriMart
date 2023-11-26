

const Puchasecard = () => {
  return (
    <div className="w-[500px] h-[100px] mt-10 flex space-x-10 border-b border-black mx-auto">
            <div className="h-[60px] w-[60px] bg-gray-700"></div>
            <div>
                <p>ASHOKE MATERIAL</p>
                <div className="flex h-[30px] w-[100px] border justify-between items-center px-[10px] border-black rounded-2xl">
                    <p>-</p>
                    <p>2</p>
                    <p>+</p>
                </div>
            </div>
            <p className="h-[50px] mt-2 text-center text-2xl">$150</p>
            <div className="h-[30px] mt-2 w-[100px] border border-black rounded-2xl text-center items-center">REVIEW</div>
    </div>
  )
}

export default Puchasecard