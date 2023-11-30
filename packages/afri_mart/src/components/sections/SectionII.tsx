// components/HeroSection.js

import { Container } from "../Container";
import clsx from 'clsx';
import { Logo } from "./Header";
import { motion } from "framer-motion";
import afri_mart_logo from "../../../public/AfriMart_Logo_small-NO-BG.png";
import Link from "next/link";
import Image from "next/image";

export const SectionII = () => {
    return (
        <Container className="flex h-3/4">
            <div className="w-full">
                <motion.div>
                    <Logo />
                </motion.div>
                <div>
                    <Link href={"/"} className="container mx-auto">
                        <Image src={afri_mart_logo} alt="Afrimart Logo" height={650} width={620} className='' />
                    </Link>
                </div>
            </div>
            <div className={clsx("w-full")}>
                <h1 className="font-serif text-4xl text-[var(--sand)]">About Us</h1>
                <p 
                className={clsx(
                    "text-white p-24 font-extralight",
                )}
                >AfriMart is an Afrocentric e-commerce store that provides a platform for talented  Africans to promote their cultural heritage. as a platform we are focused on sharing the richness of African culture to the global market , in form of NFTs, Artefacts, paintings and sculptures together with African fabrics. we are partnered with a global delivery company to ensure all purchases securely gets to customers.</p>
            </div>

        </Container>
    );
};
