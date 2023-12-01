// components/HeroSection.js

import { Container } from "../Container";
import { ButtonLink } from "../atomic/Button";
import clsx from 'clsx';
import { GrainnyBackground } from "../atomic/GrainnyBackground";
import { Variant, motion, useAnimation, useInView } from 'framer-motion';
import { AnimatedText } from "../animations/animations";
import { useEffect, useRef } from "react";
import { MainAnimation } from "../animations/mainanimation";

export const HeroSection = () => {
    return (
        <Container className="flex text-center h-screen items-center">
            <div className={clsx("h-fit")}>
                <MainAnimation
                    text="Afrimart" 
                    repeatDelay={2} 
                    className="font-serif text-9xl text-[var(--sand)]"
                 />
                <AnimatedText text="Where cultural treasures tell timeless stories" className="text-[var(--sand)] mt-32"/>
            </div>
        </Container>
    )
};
