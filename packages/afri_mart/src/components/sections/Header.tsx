// components/Header.js

import Link from "next/link";
import WalletBar from "../WalletBar";
import Image from "next/image";
import afri_mart_logo from "../../../public/AfriMart_Logo_small-NO-BG.png";

export const Header = () => {
    return (
        <header className="bg-gray-800 text-white m-0 p-4 flex flex-row">
            <div className="container mx-auto">
                <Image src={afri_mart_logo} alt="Afrimart Logo" height={250} width={220}/>
                <p className="text-sm">Your Gateway to Afrocentric Excellence</p>
            </div>
            <ul className="flex flex-row m-0 p-4 gap-9">
                <li><Link href={"/homepage"}>Home</Link></li>
                <li><Link href={"/aboutus"}>About Us</Link></li>
                <li><Link href={"/app"}>App</Link></li>
                <li><Link href={"/product"}>Product</Link></li>
                <li><Link href={"/supplyChain"}>Supply Chain</Link></li>
                <li><Link href={"/dash"}>Dash</Link></li>
                <li><Link href={"/deliveryportal"}>Delivery Portal</Link></li>
                <li><Link href={"/cart"}>Cart</Link></li>
            </ul>
            <WalletBar />
        </header>
    );
};