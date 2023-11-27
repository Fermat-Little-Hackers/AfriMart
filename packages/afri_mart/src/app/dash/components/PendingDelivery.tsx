import {useState} from "react";
import Pop from "./Pop";

const PendingDelivery = () => {
  const data = [
    {
      name : 'Agbada',
      orderid : 786543,
      quantity : 2,
      amount : 500,
      state : 'Lagos',
      country: 'Nigeria'
    },
    {
      name : 'Asoke',
      orderid : 467333,
      quantity : 9,
      amount : 1000,
      state : 'Ondo',
      country: 'Nigeria'
    }, {
      name : 'oke ofa',
      orderid : 678889,
      quantity : 3,
      amount : 6000,
      state : 'Osun',
      country: 'Nigeria'
    }, {
      name : 'Asoke',
      orderid : 467333,
      quantity : 9,
      amount : 1000,
      state : 'Ondo',
      country: 'Nigeria'
    },
  ]
  const [isOpen, setIsOpen] = useState(false);
  const [isname, setIsname] = useState('');
  const [isorder, setIsorder] = useState(0);
  const [isstate, setIsstate] = useState('');
  const [isCountry, setIsCountry] = useState('');
  const [isquantity, setisquantity] = useState(0);
  const [isamount, setIsamount] = useState(0);

  const setPopup = (name : string, id : number, total : number, payment : number, state : string, country : string) => {
    setIsname(name);
    setIsorder(id);
    setIsstate(state);
    setIsCountry(country)
    setisquantity(total);
    setIsamount(payment);
    togglepop();
  };
  const togglepop = () => {
    setIsOpen(!isOpen);
  }
  return <div className="smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[800px] smx:w-[80%] lmx:w-[90%] h-[80%] p-6 mt-2"> 
      <div className="flex justify-between smx:hidden">
      <p>SN</p>
      <p>Product Name</p>
      <p>Order ID</p>
      <p>Quantity</p>
      <p>Amount</p>
      <p>State</p>
      <p>Country</p>
      </div>
    
    {data.map((item, index) => (
      <div key={index} className="flex justify-between mt-2 smx:hidden "> 
        <div >{index + 1}</div>
        <div>{item.name}</div>
        <div>{item.orderid}</div>
        <div>{item.quantity}</div>
        <div>${item.amount}</div>
        <div>{item.state}</div>
        <div>{item.country}</div> 
      </div>
    ))}
    <div>
        {data.map((item, index) => (
        <div key={index} className="hidden smx:flex smx:justify-between">
            <p>{index + 1}</p>
            <p>{item.name}</p>
            <div className="hover:cursor-pointer" onClick={() => setPopup(item.name, item.orderid,item.quantity,item.amount,item.state,item.country)}>Details</div>
        </div>
        ))}

    </div>
    <Pop isOpen={isOpen} onClose={togglepop} name={isname} orderid={isorder} quantity={isquantity} amount={isamount} state={isstate} country={isCountry} />
  </div>;
};

export default PendingDelivery;
