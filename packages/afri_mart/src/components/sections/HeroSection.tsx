// components/HeroSection.js

import { Container } from "../Container";
import { ButtonLink } from "../atomic/Button";
import clsx from 'clsx';
import { GrainnyBackground } from "../atomic/GrainnyBackground";
import { Variant, motion, useAnimation, useInView } from 'framer-motion';
import { AnimatedText } from "../animations/animations";
import { useEffect, useRef } from "react";
import { MainAnimation } from "../animations/mainanimation";


import Image from "next/image";
import Link from "next/link";
import { BackgroundImageAnim } from "../animations/background-image-anim";

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
                        <Link href="https://youtu.be/NRvc2ig8MGU">
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
