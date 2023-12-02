// components/HeroSection.js

import { Container } from "../Container";
import { ButtonLink } from "../atomic/Button";
import clsx from 'clsx';
import { GrainnyBackground } from "../atomic/GrainnyBackground";
import { Variant, motion, useAnimation, useInView } from 'framer-motion';
import { AnimatedText } from "../animations/animations";
import { useEffect, useRef } from "react";
import { MainAnimation } from "../animations/mainanimation";
import img1 from "../../../public/image/anims/asambe.jpeg";
import img2 from "../../../public/image/anims/burundi.jpeg";
import img3 from "../../../public/image/anims/honey.jpg";
import img4 from "../../../public/image/anims/jameela.jpg";
import img5 from "../../../public/image/anims/1964.png";
import img6 from "../../../public/image/anims/ganda.png";
import img7 from "../../../public/image/anims/toys.jpg";
import img8 from "../../../public/image/anims/threads.png";
import img9 from "../../../public/image/anims/protea.png";
import img10 from "../../../public/image/anims/nuerta.jpg";

import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
    return (
        <Container className="flex items-center align-middle  text-center h-[80vh] pb-0 w-full my-auto mx-auto">
            <div className={clsx("flex items-center mx-auto")}>
                <div className="mx-auto bg-[var(--black--2)] z-50">
                    <MainAnimation
                        text="Afrimart"
                        repeatDelay={2}
                        className="font-serif text-6xl md:text-9xl text-[var(--sand)]"
                    />
                    <AnimatedText text="Where cultural treasures tell timeless stories" className="text-[var(--sand)] mt-2" />
                    <div className="flex justify-center gap-4 mx-auto mt-8 z-50">
                        <Link href="">
                            <button className="py-2 px-8 ring-1 ring-white rounded-3xl" >Watch Demo</button>
                        </Link>
                        <Link href="./homepage">
                        <button className="py-2 px-8 rounded-3xl bg-[var(--terracota)] text-black" >Launch App</button>
                        </Link>
                    </div>
                </div>
            </div>
            <BackgroundImageAnim />
        </Container>
    );
};

const BackgroundImageAnim = () => {
    return (
        <div className="flex absolute h-[90vh] overflow-clip opacity-40 top-0 w-full z-0">
            <motion.div
                className="flex flex-col w-64  space-y-20 top-20 absolute bg-red"
                animate={{
                    y: [400, 800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}
            >
                <Image src={img1} alt={"AsambeZ"} className="transition" />
                <Image src={img2} alt={"AsambeZ"} />
                <Image src={img3} alt={"AsambeZ"} />
                <Image src={img4} alt={"AsambeZ"} />
            </motion.div>
            <motion.div
                className="flex flex-col w-64 right-0 space-y-40 absolute top-0"
                animate={{
                    y: [400, 800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}
            >
                <Image src={img2} alt={"AsambeZ"} />
                <Image src={img5} alt={"AsambeZ"} />
                <Image src={img7} alt={"AsambeZ"} />
                <Image src={img3} alt={"AsambeZ"} />
            </motion.div>
            <motion.div
                className="w-64 right-96 bottom-0 space-y-40 absolute"
                animate={{
                    y: [400, -800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}>
                <Image src={img3} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img8} alt={"AsambeZ"} />
                <Image src={img2} alt={"AsambeZ"} />
            </motion.div>
            <motion.div className="w-80 left-20 space-y-40 absolute bottom-0"
                animate={{
                    y: [400, -800],
                    transition: {
                        duration: 50,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}>
                <Image src={img7} alt={"AsambeZ"} />
                <Image src={img8} alt={"AsambeZ"} />
                <Image src={img9} alt={"AsambeZ"} />
                <Image src={img10} alt={"AsambeZ"} />
            </motion.div>
        </div>
    );
};