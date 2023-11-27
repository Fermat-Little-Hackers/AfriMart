// components/Header.js

import Link from "next/link";
import WalletBar from "../WalletBar";
import Image from "next/image";
import afri_mart_logo from "../../../public/AfriMart_Logo_small-NO-BG.png";

export const Header = () => {
    return (
        <header className="bg-gray-800 text-white m-0 p-4 flex flex-row items-center gap-8">
            <Link href={"/"} className="container mx-auto">
                <Image src={afri_mart_logo} alt="Afrimart Logo" height={250} width={220} />
            </Link>
            <Link href={"/deliveryportal"}>Delivery Portal</Link>
            <WalletBar />
        </header>
    );
};