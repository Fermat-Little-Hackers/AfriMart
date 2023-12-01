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
import Image from "next/image";

export const HeroSection = () => {
    return (
        <Container className="flex text-center h-screen items-center">
            <div className={clsx("h-fit")}>
                <MainAnimation
                    text="Afrimart"
                    repeatDelay={2}
                    className="font-serif text-9xl text-[var(--sand)]"
                />
                <AnimatedText text="Where cultural treasures tell timeless stories" className="text-[var(--sand)] mt-32" />
            <BackgroundImageAnim />
            </div>
        </Container>
    );
};

const BackgroundImageAnim = () => {
    return (
        <div className="flex absolute h-screen overflow-hidden opacity-20 top-0 w-full z-0">
            <motion.div
                className="flex flex-col w-64  space-y-20 left-0 top-20 absolute bg-red"
                animate={{
                    y: [0, 800],
                    transition: {
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}
            >
                <Image src={img1} alt={"AsambeZ"} className="transition" />
                <Image src={img2} alt={"AsambeZ"} />
                <Image src={img3} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
            </motion.div>
            <motion.div
                className="flex flex-col w-64 right-0 space-y-40 absolute top-0"
                animate={{
                    y: [0, 800],
                    transition: {
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}
            >
                <Image src={img2} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
            </motion.div>
            <motion.div
                className="w-64 right-96 space-y-40 absolute"
                animate={{
                    y: [0, -800],
                    transition: {
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}>
                <Image src={img3} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
            </motion.div>
            <motion.div className="w-80 left-20 space-y-40 absolute"
                animate={{
                    y: [0, -800],
                    transition: {
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }
                }}>
                <Image src={img4} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
                <Image src={img1} alt={"AsambeZ"} />
            </motion.div>
        </div>
    );
};