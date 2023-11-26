// components/HeroSection.js

import { Container } from "../Container";
import clsx from 'clsx';
// import { Logo } from "./Header";
import { motion } from "framer-motion";

export const SectionII = () => {
    return (
        <Container className="flex h-3/4">
            <div className="w-full">
                Hello
                <motion.div>
                    {/* <Logo /> */}
                </motion.div>
            </div>
            <div className={clsx("w-full")}>
                <h1 className="font-serif text-4xl text-[var(--sand)]">About Us</h1>
                <p 
                className={clsx(
                    "text-white mt-12 font-extralight",
                )}
                >AfriMart is an Afrocentric e-commerce store that provides a platform for talented  Africans to promote their cultural heritage. as a platform we are focused on sharing the richness of African culture to the global market , in form of NFTs, Artefacts, paintings and sculptures together with African fabrics. we are partnered with a global delivery company to ensure all purchases securely gets to customers.</p>
            </div>

        </Container>
    );
};
