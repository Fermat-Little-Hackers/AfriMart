// components/HeroSection.js

import { Container } from "../Container";
import { ButtonLink } from "../atomic/Button";
import clsx from 'clsx';
import { GrainnyBackground } from "../atomic/GrainnyBackground";

export const HeroSection = () => {
    return (
        <Container className="flex text-center h-screen items-center">
            <div className={clsx("h-fit")}>
                <h1 className="font-serif text-9xl text-[var(--sand)]">Afrimath</h1>
                <p className={clsx("text-[var(--sand)] ", "mt-32")}>Where cultural treasures tell timeless stories</p>
            </div>
        </Container>
    );
};
