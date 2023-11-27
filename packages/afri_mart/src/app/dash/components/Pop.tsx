interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    name : string;
    orderid : number;
    quantity : number;
    amount : number;
    state : string;
    country : string;
  }

const Pop : React.FC<PopupProps> = ({ isOpen, onClose, name, orderid, quantity, amount, state, country }) => {
    return (
        <>
          {isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-md">
                <div className="flex justify-end">
                  <button className="text-gray-600" onClick={onClose}>
                    Close
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-4">Item Details</h2>
                  <div className="">
                        <p>Product Name : {name} </p>
                        <p>Order ID : {orderid} </p> 
                        <p>Quantity : {quantity} </p>
                        <p>Amount : {amount} </p>
                        <p>State : {state} </p>
                        <p>Country : {country} </p>
                        </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
}

export default Pop